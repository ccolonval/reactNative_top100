import React, { PureComponent } from "react";
    
import {
    StyleSheet,
    View
} from 'react-native';

import { connect } from "react-redux";
import Appbar from './shared/appbar';
import { BottomNavigation, Text} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const initialState = {
    index: 0,
    routes: [
        { key: 'info', title: 'info', icon: 'account-box' },
        { key: 'charts', title: 'charts', icon: 'format-list-numbered' },
        { key: 'library', title: 'library', icon: 'library-music' },
    ],
};

const InfoRoute = () => <Text>InfoRoute</Text>;
const LibraryRoute = () => <Text>MusicRoute</Text>;
const ChartsRoute = () => <Text>ChartsRoute</Text>;

class Selected extends PureComponent {

	state = {...initialState}

    handleIndexChange = index => this.setState({ index });

	renderScene = BottomNavigation.SceneMap({
		info: InfoRoute,
        library: LibraryRoute,
        charts: ChartsRoute
	});

	renderIcon = ({route, focused = false, color }) => {
        return <Icon color="#4A64AA" name={route.icon} size={28}/>;
	};

	renderLabel = ({route, focused = false, color }) => {
		return <Text style={{color:"#4A64AA", alignSelf:"center"}}  >{route.title}</Text>
	};
    
	render() {

        let { index } = this.state;
        
		return (
			<View style={styles.root}>
				<Appbar 
					navigation={this.props.navigation} 
					title="Selected Album"
                    hasBackAction={true}
                    hasMenu={true}
				/>
				<BottomNavigation
                    index={index}
					navigationState={this.state}
					onIndexChange={this.handleIndexChange}
					renderScene={this.renderScene}
					renderIcon={this.renderIcon}
					renderLabel={this.renderLabel}
					barStyle={{ paddingTop: 5,  paddingBottom: 20, backgroundColor:"#FFFFFF",}}
				/>
		   </View>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		propMessage: ownProps.ownMessage,
		navigation: ownProps.navigation
	};
};

const mapDispatchToProps = {
    //...
};

const styles = StyleSheet.create({
   root : { 
        flex: 1, 
        flexDirection: 'column',
    },
    container: {
		backgroundColor: 'red',
		flex: 1,
		height: '600px'
	},
    top: {
		left: 0,
		right: 0,
		top: 0,
    },
    bottom: {
        alignSelf: 'center', 
		position:"absolute",
        bottom: 0,
		left: 0,
		right: 0,
    },
    charts: {
		position:"absolute",
        alignSelf: 'center', 
        backgroundColor: '#ffffff', 
		borderColor: '#4A64AA', 
        width: 70, 
		height: 73, 
		borderWidth: 2,
        borderRadius: 35, 
        bottom: 25,
        zIndex: 10 
    },
	container: {
		backgroundColor: 'white'
	},
	rowText: {
		color: '#4A64AA',
		marginLeft: 25,
		padding: 20,
		fontSize: 18,
		fontWeight: "100"
	},
	bottomNavigation: {
        paddingBottom: 40,
        width: '100%'
	},
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: Colors.white,
        maxHeight: 500,
    },
    info: {
    },
    library: {
    },
    chart:{
    },
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Selected);