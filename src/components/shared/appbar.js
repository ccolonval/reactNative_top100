import React, { PureComponent } from "react";
import { StyleSheet } from 'react-native';
import { Appbar, Menu, Divider } from 'react-native-paper'
import { connect } from "react-redux";

const initialState = {
    visible: false
};

class AppBar extends PureComponent {

    state = {...initialState}

    openMenu = () => this.setState({ visible: true });
    closeMenu = () => this.setState({ visible: false });

    render(){

        let title, backAction, menu;

        let { visible } = this.state;

        if(this.props.hasBackAction)
            backAction = <Appbar.BackAction onPress={() => this.props.navigation.goBack()} color="white" icon="less-than"/>;
        
        if(this.props.title)
            title = <Appbar.Content title={this.props.title} titleStyle={styles.appBarContentTitleStyle} style={styles.appBarContentStyle}/>;
        
        if(this.props.hasMenu){
            menu = <Menu 
                        visible={visible}
                        onDismiss={this.closeMenu}
                        //relocate styles 
                        anchor={ <Appbar.Action icon="dots-vertical" color="#fff" onPress={this.openMenu} /> }>
                        <Menu.Item onPress={() => {}} title="Option 1" />
                        <Menu.Item onPress={() => {}} title="Option 2" />
                        <Divider />
                        <Menu.Item onPress={() => {}} title="Option 3" />
                    </Menu>;
        }

        return (
            <Appbar style={styles.root}>
                {backAction}
                {title}
            </Appbar>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        navigation: ownProps.navigation,
        hasBackAction: ownProps.hasBackAction
    };
};

const mapDispatchToProps = {
    
};

const styles = StyleSheet.create({
	root: {
        paddingTop: 60,
        paddingBottom: 30,
        backgroundColor : "purple",
	},
	appBarContentStyle: {
	},
	appBarContentTitleStyle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        fontStyle: "normal",
	},
    backAction: {
        backgroundColor: "white",
    },
  });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppBar)