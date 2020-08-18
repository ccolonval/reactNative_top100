import React, { PureComponent } from "react";
import { connect } from "react-redux";

import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	Image,
	Animated,
	Easing,
	TouchableOpacity,
	TouchableHighlight
} from 'react-native';

import { 
	ListItem,
	Left, 
	Body, 
	Right, 
	Text, 
	Thumbnail, 
	Badge,
	Drawer
} from "native-base";

import PropTypes from 'prop-types';
import Appbar from './shared/appbar';
import { getSongs, getHits } from '../actions/selected';
import { View } from 'react-native-animatable';
import { BottomNavigation, Colors } from 'react-native-paper';//remove, simplify with 1 UI library if possible
import { Icon } from 'react-native-elements';//use native-base

import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import Video from 'react-native-video';

const initialState = {
    index: 0,
    routes: [
        { key: 'info', title: 'info', icon: 'account-box' },
        { key: 'songs', title: 'songs', icon: 'format-list-numbered' },
        { key: 'hits', title: 'hits', icon: 'library-music' },
	],
	songs : [],
	hits: [],
	paused: true ,
	animateItem : new Animated.Value(0),
	player: {},
	disabled: false,
	playerIcon: "play-arrow"
};

class Selected extends PureComponent {

	state = {...initialState}

	componentDidMount = async()=>{
		//start loading
		this.props.getSongs(this.props.selected['id']['attributes']['im:id']);
		this.props.getHits(this.props.selected['im:artist']['attributes']['href'].split('/').slice(-1)[0].split('?')[0]);
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

	playPause = (entry) => {
		let { paused, player, playerIcon } = this.state;
		console.log(JSON.stringify(player))
		if(paused){
			//toggele animation, auto destroy object when trackSample finishes playing or navigation is engaged
			player = new Player(entry.previewUrl,{
				autoDestroy: true
			}).play();
			paused = false;
			playerIcon = "play-arrow";
		}
		else{
			player.destroy();
			player = {};
			paused = true;
			playerIcon = "stop";
		}
		this.setState({paused, player, playerIcon});
	}
	  
	InfoRoute = () => {
		return(
			<View style={styles.InfoRoute}>
				<Image style={{ alignSelf:"center", width: 200, height: 200, marginTop: 85, marginBottom: 50 }} source={{uri: this.props.selected['im:image'][2]['label']}} />
				<Text style={{ fontSize: 18, textAlign:"center", letterSpacing: 2.5 }}>
					{'Name: ' + this.props.selected['im:name']['label']}
					{'\nArtist: ' + this.props.selected['im:artist']['label']}
					{'\nRelease Date: ' + this.props.selected['im:releaseDate']['attributes']['label']}
					{'\nPrice: ' + this.props.selected['im:price']['label']}
					{'\nCategory: ' + this.props.selected['category']['attributes']['label']}
				</Text>
			</View>
		);
	};

	SongsRoute = () => {
		let { paused, playerIcon } = this.state;
		console.log("paused "+ paused);
		const albumMedia = this.props.songs.map((entry, i) => {
			if(i > 0){
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
						onPress={() => this.playPause(entry)}>
							<Left>
								<Thumbnail square source={{uri: entry['artworkUrl100']}} />
							</Left>
							<Body style={{borderBottomWidth:0}}>
								<Text style={{ fontSize: 14}}>{entry['trackName']}</Text>
								<Text style={{ fontSize: 14}}>{entry['previewURL']}</Text>
							</Body>
							<Right style={{borderBottomWidth:0, height: 70, width: 20}}>
								{!paused ?
									<View style={styles.playerButton}>
										<Icon name="stop"/>
									</View>:
									<View style={styles.playerButton}>
										<Icon name="play-arrow"/>
									</View>
								}
							</Right>
						</ListItem>
					</Animated.View>
				);
			}
		});
		return(
			<SafeAreaView>
				<ScrollView
				style={styles.scrollView}>
					{albumMedia}
				</ScrollView>
			</SafeAreaView>
		);
	};
	
	HitsRoute = () => {
		let { paused, playerIcon } = this.state;
		console.log("paused "+ paused);
		const artistMedia = this.props.hits.map((hit, i) => {
			if(i > 0){
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
						onPress={() => this.playPause(hit)}>
							<Left>
								<Thumbnail square source={{uri: hit['artworkUrl100']}} />
							</Left>
							<Body style={{borderBottomWidth:0}}>
								<Text style={{ fontSize: 14}}>{hit['trackName']}</Text>
								<Text style={{ fontSize: 14}}>{hit['previewURL']}</Text>
							</Body>
							<Right style={{borderBottomWidth:0, height: 70, width: 20}}>
								{!paused ?
									<View style={styles.playerButton}>
										<Icon name="stop"/>
									</View>:
									<View style={styles.playerButton}>
										<Icon name="play-arrow"/>
									</View>
								}
							</Right>
						</ListItem>
					</Animated.View>
				);
			}
		});
		return(
			<SafeAreaView>
				<ScrollView
				style={styles.scrollView}>
					{artistMedia}
				</ScrollView>
			</SafeAreaView>
		);
	};

    handleIndexChange = index => this.setState({ index });

	renderScene = BottomNavigation.SceneMap({
		info: this.InfoRoute,
		songs: this.SongsRoute,
		hits: this.HitsRoute,
	});

	renderIcon = ({route, focused= false, color }) => {
		return <Icon color="#4A64AA" name={route.icon} size={28} />
	};

	renderLabel = ({route, focused= false, color }) => {
		return <Text style={styles.renderLabel}  >{route.title}</Text>
	};
    
	render() {
		return (
			<View style={styles.root}>
				<Appbar 
					navigation={this.props.navigation} 
					title={this.props.selected['im:name']['label']}
                    hasBackAction={true}
                    hasMenu={true}
				/>
				<BottomNavigation
					navigationState={this.state}
					onIndexChange={this.handleIndexChange}
					renderScene={this.renderScene}
					renderIcon={this.renderIcon}
					renderLabel={this.renderLabel}
					barStyle={styles.BottomNavigationBarStyle}
				/>
		   </View>
		);
	}
}

Selected.propTypes = {
	selected: PropTypes.object,
	songs: PropTypes.array,
	hits: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
	return {
		//improve
		selected: ownProps.route["params"]["selected"],
		navigation: ownProps.navigation,
		songs: state.selected.songs,
		hits: state.selected.hits
	};
};

const mapDispatchToProps = {
	getSongs,
	getHits
};

const styles = StyleSheet.create({
   root : { 
        flex: 1, 
        flexDirection: 'column',
	},
	BottomNavigationBarStyle:{
		paddingTop: 5,
		paddingBottom: 25,
		backgroundColor:"#FFFFFF",
	},
	renderLabel:{
		color:"#4A64AA",
		alignSelf:"center"
	},
    InfoRoute: {
		flex:1,
		alignContent: "center"
    },
    LibraryRoute: {
		flex:1,
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
	},
    ChartRouteWrapper:{
	},
	playerButton: {
		height: 72,
		width: 72,
		borderWidth: 1,
		borderColor: 'white',
		backgroundColor: Colors.purple300,
		borderRadius: 72 / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Selected);