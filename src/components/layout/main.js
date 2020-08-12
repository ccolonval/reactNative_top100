import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	FlatList
  } from 'react-native';

import { ListItem } from 'react-native-elements';
  
import { Colors } from 'react-native/Libraries/NewAppScreen';

import PropTypes from 'prop-types';

import { 
	mainDateAction, 
	mainOtherAction } from "../../actions/main";

import { 
	Searchbar, 
	Appbar,
	List} from 'react-native-paper';

const initialState = {
	stateMessage: "hello world",
	counter: 0,
	query: "",
	toggle: "web",
	index: 0,
	routes: [],
};

class Main extends PureComponent {

	state = {...initialState}
	
	handleStateClick = () => {
		let counter = this.state.counter + 1;
		let stateMessage = `Next counter is ${counter}`;
		this.setState({
			counter,
			stateMessage
		});
	};
	
	handleReduxClick = () => {
		this.props.mainDateAction(new Date());
	};
	
	handleReduxClick2 = () => {
		this.props.mainOtherAction();
	};

	handleReduxClickProp = () => {
		this.props.propMessage  = "This prop value has been changed within the component";
	};

	onChangeSearch = query => this.setState({ query });
	onChangeToggle = toggle => this.setState({ toggle });
	onBottonIndexChange = index => this.setState({ index });

	keyExtractor = (item, index) => index.toString()

	renderItem = ({ item }) => (
		<ListItem
			leftAvatar={{ source: { uri: item.image } }}
			title={item.album}
			subtitle={item.artist+ ' ' + item.release}
			bottomDivider
		/>
	  )
	
	render() {
		const  { query, toggle, stateMessage } = this.state;
		const  { myOther, myDate, propMessage } = this.props;

		const list = [
			{
			  album: 'albumName 1',
			  albumImage: 'https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/4e/5f/66/4e5f66a5-ba02-313f-f50a-d3e35aeec864/20UMGIM52447.rgb.jpg/55x55bb.png',
			  artist: 'artistName',
			  release: '####'
			},
			{
			  album: 'albumName 2',
			  image: 'https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/4e/5f/66/4e5f66a5-ba02-313f-f50a-d3e35aeec864/20UMGIM52447.rgb.jpg/55x55bb.png',
			  artist: 'artistName',
			  release: '####',
			  cost: '$##.##'
			},
			{
			  album: 'albumName 3',
			  image: 'https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/4e/5f/66/4e5f66a5-ba02-313f-f50a-d3e35aeec864/20UMGIM52447.rgb.jpg/55x55bb.png',
			  artist: 'artistName',
			  release: '####',
			  cost: '$##.##'
			},
			{
			  album: 'albumName 4',
			  image: 'https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/4e/5f/66/4e5f66a5-ba02-313f-f50a-d3e35aeec864/20UMGIM52447.rgb.jpg/55x55bb.png',
			  artist: 'artistName',
			  release: '####',
			  cost: '$##.##'
			},
			{
			  album: 'albumName 5',
			  image: 'https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/4e/5f/66/4e5f66a5-ba02-313f-f50a-d3e35aeec864/20UMGIM52447.rgb.jpg/55x55bb.png',
			  artist: 'artistName',
			  release: '####',
			  cost: '$##.##'
			},
		  ]

		return (
			<View>   
				<StatusBar barStyle="dark-content" />
				<Appbar.Header>
					{/*<Appbar.BackAction onPress={() => console.log('Pressed go back')} />*/}
					<Appbar.Content title="Top 100 Albums" subtitle="iTunes" />
					{/*<Appbar.Action icon="magnify" onPress={() => console.log('Pressed search')} />*/}
					<Appbar.Action
					style={styles.web}
					icon="web"
					onPress={() => console.log('Pressed web')}
					/>
					{/*<Appbar.Action
					style={styles.heart}
					icon="heart"
					onPress={() => console.log('Pressed heart')}
					/>*/}
				</Appbar.Header>
				<Text>{query}</Text>
				<Searchbar
				placeholder="Search"
				onChangeText={this.onChangeSearch}
				value={query}/>
				<SafeAreaView>
					<ScrollView
					contentInsetAdjustmentBehavior="automatic"
					style={styles.scrollView}>
					<View style={styles.body}>
					{
						list.map((item, i) => (
						<ListItem
							key={i}
							leftAvatar={{ source: { uri: item.image } }}
							onPress={() => this.props.navigation.navigate("Selected")}
							title={item.album}
							subtitle={item.artist + ' ' + item.release}
							bottomDivider
							chevron
						/>
						))
					}
					</View>
					</ScrollView>
				</SafeAreaView>
			</View>
		);
	}
}

Main.propTypes = {
	myDate: PropTypes.instanceOf(Date),
	myOther: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
	return {
		//appstate.reducer.stateProperty
		myDate: state.main.myDate,
		myOther: state.main.myOther,
		propMessage: ownProps.propMessage,
		navigation: ownProps.navigation
	};
};

const mapDispatchToProps = {
	mainDateAction,
	mainOtherAction
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