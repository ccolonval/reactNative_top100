import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	StatusBar,
	Animated,
	Easing
  } from 'react-native';

import { ListItem, Left, Body, Right, Icon, Text, Thumbnail, Badge } from "native-base";
import { View } from 'react-native-animatable';
import PropTypes from 'prop-types';
import Appbar from '../shared/appbar';
import { getDataFeed } from "../../actions/main";
import { Searchbar, Button, Colors, Avatar } from 'react-native-paper';

const initialState = {
	query: "",
	filteredDataFeed: null,
	animateItem : new Animated.Value(0)
};

class Main extends PureComponent {

	state = {...initialState}

	componentDidMount = async()=>{
		this.props.getDataFeed();
		Animated.timing(this.state.animateItem, {
			toValue: 1,
			duration: 1000,
			delay: 200,
			easing: Easing.bounce,
			useNativeDriver: true
		}).start()
	}

	transformY() {
		return {
		  translateY: this.state.animateItem.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [700, 300, 0]
		  })
		}
	  }

	onChangeSearch = query => {
		let filteredDataFeed = [];
		filteredDataFeed = this.props.dataFeed.filter(entry => {    
			//improve  
			const itemData = `${entry['im:name']['label'].toUpperCase()} ${entry['im:artist']['label'].toUpperCase()}`;
			const queryData = query.toUpperCase();
			return itemData.indexOf(queryData) > -1;    
		});
		this.setState({ filteredDataFeed, query }); 
	}

	render() {

		//apply loading
		let { loading, filteredDataFeed, query } = this.state;
		let { dataFeed } = this.props;
		let dataSource = filteredDataFeed == null ? dataFeed : filteredDataFeed;

		const listItems = dataSource.map((entry, i) => {
			var start = Date.now();
			return (
				<Animated.View
					key={i}
					style={{
					width: '100%',
					transform: [this.transformY()]
					}}>
					<ListItem
					key={i}
					icon
					style={{ height: 70 }}
					onPress={() => this.props.navigation.navigate("Selected", { selected: entry })}>
						<Left>
							<Thumbnail square source={{uri: entry['im:image'][2]['label']}} />
						</Left>
						<Body style={{borderBottomWidth:0}}>
							<Text style={{ fontSize: 14}}>{entry['im:name']['label']}</Text>
							<Text style={{ fontSize: 10}}>{entry['im:artist']['label']+ " Time: " + start}</Text>
						</Body>
						<Right style={{borderBottomWidth:0, height: 70}}>
							<Badge style={{ backgroundColor: 'yellow' }}>
								<Text style={{ color: 'purple', fontSize: 17 }}>{'#'+(dataFeed.indexOf(entry)+1)}</Text>
							</Badge>
						</Right>
					</ListItem>
				</Animated.View>
			);
		});

		return (
			<View>   
				<StatusBar barStyle="dark-content" />
				<Appbar 
					navigation={this.props.navigation}
					title="Top 100"
				/>
				<Button
					icon="refresh"
					//try to unload list items prior to getting again
					onPress={() => this.props.getDataFeed()}/>
				<Searchbar
				placeholder="Search"
				onChangeText={text => this.onChangeSearch(text)}
				value={query}/>
				<SafeAreaView>
					<ScrollView
					style={styles.scrollView}>
						{listItems}
					</ScrollView>
				</SafeAreaView>
			</View>
		);
	}
}

Main.propTypes = {
	dataFeed: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
	let filtered = Array.from(state.main.dataFeed);
	return {
		loading: state.main.loading,
		dataFeed: state.main.dataFeed,
		filteredDataFeed : filtered,
		query: "",
		navigation: ownProps.navigation
	};
};

const mapDispatchToProps = {
	getDataFeed
};

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: Colors.lighter,
	},
	body: {
		backgroundColor: Colors.white,
	},
  });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);