import React, { PureComponent } from "react";

import { connect } from "react-redux";

import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	StatusBar,
  } from 'react-native';

import { ListItem } from 'react-native-elements';
  
import { Colors } from 'react-native/Libraries/NewAppScreen';

import PropTypes from 'prop-types';

import Appbar from '../shared/appbar';

import { getDataFeed } from "../../actions/main";

import { Searchbar } from 'react-native-paper';

const initialState = {
	query: "",
	filteredDataFeed: null
};

class Main extends PureComponent {

	state = {...initialState}
	
	componentDidMount = async()=>{
		this.props.getDataFeed();
	}

	onChangeSearch = query => {
		 const filteredDataFeed = this.props.dataFeed.filter(entry => {    
			//improve  
			const itemData = `${entry['im:name']['label'].toUpperCase()} ${entry['im:artist']['label'].toUpperCase()}`;
			const queryData = query.toUpperCase();
			return itemData.indexOf(queryData) > -1;    
		});
		this.setState({ filteredDataFeed, query }); 
	}

	render() {

		let { filteredDataFeed, query } = this.state;
		let { dataFeed } = this.props;
		let dataSource = filteredDataFeed == null ? dataFeed : filteredDataFeed;

		const listItems = dataSource.map((entry, i) => {
			return <ListItem
				key={i}
				leftAvatar={{ source: { uri: entry['im:image'][2]['label'] } }}
				onPress={() => this.props.navigation.navigate("Selected")}
				title={entry['im:name']['label']}
				subtitle={entry['im:artist']['label']}
				bottomDivider
				chevron
				badge={{ value: '#'+(i+1), status:'warning', textStyle: { color: 'black', fontSize: 17, lineHeight: 20 } }}
			/>
		});

		return (
			<View>   
				<StatusBar barStyle="dark-content" />
				<Appbar 
					navigation={this.props.navigation}
					title="Top 100"
				/>
				<Searchbar
				placeholder="Search"
				onChangeText={text => this.onChangeSearch(text)}
				value={query}/>
				<SafeAreaView>
					<ScrollView
					contentInsetAdjustmentBehavior="automatic"
					style={styles.scrollView}>
					<View style={styles.body}>
						{ listItems }
					</View>
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
	  height: '100%',
      display: 'flex',
	},
  });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);