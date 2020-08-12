//external imports
import React, { PureComponent } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { connect } from "react-redux";

//this component initial state
const initialState = {
    index: 0,
};

class Selected extends PureComponent {

	//set the instance initial state as initialState clone
	state = {...initialState}

    //Renders the template component
	render() {

		//get the component properties and state using destructuring
		const { index } = this.state;

		//return JSX transpiled component
		return (
			<View style={styles.root}>
				<Text>Selected</Text>
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
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Selected);