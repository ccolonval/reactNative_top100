import React, { PureComponent } from "react";
import {
    StyleSheet,
	View,
	Text,
} from 'react-native';
import { connect } from "react-redux";
import Appbar from './shared/appbar';
import { BottomNavigation} from 'react-native-paper';//remove, simplify with 1 UI library if possible
import { Icon } from 'react-native-elements';//use native-base

const initialState = {
    index: 0,
    routes: [
        { key: 'info', title: 'info', icon: 'account-box' },
        { key: 'charts', title: 'charts', icon: 'format-list-numbered' },
        { key: 'library', title: 'library', icon: 'library-music' },
	],
};

class Selected extends PureComponent {

	state = {...initialState}

	//continue template
	InfoRoute = () => {
		const { selected } = this.props;
		return <Text>InfoRoute for {selected['im:name']['label']}</Text>;
		//details regarding the album artist
	};
	
	//continue template
	LibraryRoute = () => {
		const { selected } = this.props;
		return <Text>LibraryRoute for {selected['im:name']['label']}</Text>;
		//details regarding the selected album
	};

	//continue template, comparing chart scores from 3 API feeds (GooglePlay, iTunes and Spotufy)
	ChartsRoute = () => {
		const { selected } = this.props;
		return <Text>ChartsRoute for {selected['im:name']['label']}</Text>;
	};

    handleIndexChange = index => this.setState({ index });

	renderScene = BottomNavigation.SceneMap({
		info: this.InfoRoute,
		library: this.LibraryRoute,
		charts: this.ChartsRoute,
	});

	renderIcon = ({route, focused= false, color }) => {
		const { selected } = this.props;
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
					title="Selected Album"
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

const mapStateToProps = (state, ownProps) => {
	return {
		selected: ownProps.route["params"]["selected"],
		navigation: ownProps.navigation
	};
};

const mapDispatchToProps = {
    //...load more metadata
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