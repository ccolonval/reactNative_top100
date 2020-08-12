import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
  } from 'react-native';
  
import {
	Header,
	LearnMoreLinks,
	Colors,
	DebugInstructions,
	ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
import PropTypes from 'prop-types';
import { mainDateAction, mainOtherAction } from "../../actions/main";
import { Button } from 'react-native-paper';

const initialState = {
	stateMessage: "hello world",
	counter: 0
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
	
	render() {
		const  { stateMessage } = this.state;
		const  { myOther, myDate, propMessage } = this.props;
		return (
			<View>   
				<StatusBar barStyle="dark-content" />
				<SafeAreaView>
					<ScrollView
					contentInsetAdjustmentBehavior="automatic"
					style={styles.scrollView}>
					<Header />
					{global.HermesInternal == null ? null : (
						<View style={styles.engine}>
						<Text style={styles.footer}>Engine: Hermes</Text>
						</View>
					)}
					<View style={styles.body}>
						<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Step One</Text>
						<Text style={styles.sectionDescription}>
							Edit <Text style={styles.highlight}>App.js</Text> to change this
							screen and then come back to see your edits.
						</Text>
						</View>
						<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>See Your Changes</Text>
						<Text style={styles.sectionDescription}>
							<ReloadInstructions />
						</Text>
						</View>
						<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Debug</Text>
						<Text style={styles.sectionDescription}>
							<DebugInstructions />
						</Text>
						</View>
						<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Learn More</Text>
						<Text style={styles.sectionDescription}>
							Read the docs to discover what to do next:
						</Text>
						</View>
						<LearnMoreLinks />
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
		propMessage: ownProps.propMessage
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
	engine: {
	  position: 'absolute',
	  right: 0,
	},
	body: {
	  backgroundColor: Colors.white,
	},
	sectionContainer: {
	  marginTop: 32,
	  paddingHorizontal: 24,
	},
	sectionTitle: {
	  fontSize: 24,
	  fontWeight: '600',
	  color: Colors.black,
	},
	sectionDescription: {
	  marginTop: 8,
	  fontSize: 18,
	  fontWeight: '400',
	  color: Colors.dark,
	},
	highlight: {
	  fontWeight: '700',
	},
	footer: {
	  color: Colors.dark,
	  fontSize: 12,
	  fontWeight: '600',
	  padding: 4,
	  paddingRight: 12,
	  textAlign: 'right',
	},
  });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);