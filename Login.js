'use strict';

import React, { Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

var buffer = require('buffer');
import AuthService from './AuthService';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProgress: false
    }
  }

  onLoginPress() {
    console.log(this.state);
    this.setState({showProgress: true});
    AuthService.login({
      username: this.state.username,
      password: this.state.password,
    }, (results) => {
      this.setState(Object.assign({
        showProgress: false,
      }, results));

      if(results.success && this.props.onLogin) {
        this.props.onLogin();
      }
    });
  }

  render() {
    var errorCtrl = <View />;

    if (!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
        Bad credentials
      </Text>
    }

    if (!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>
        Unknown Error
      </Text>
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./img/Octocat.png')} />
        <Text style={styles.heading}>
          Github Browser
        </Text>
        <TextInput style={styles.input}
          placeholder= "username"
          onChangeText={(text) => this.setState({username: text})}
        />
        <TextInput style={styles.input}
          placeholder= "password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableHighlight style={styles.button} onPress={this.onLoginPress.bind(this)}>
          <Text style={styles.buttonText}>
            Log in
          </Text>
        </TouchableHighlight>
        { errorCtrl }
        <ActivityIndicator
          animating={this.state.showProgress}
          size="large"
          style={styles.loader}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 66,
    height: 55,
  },
  heading: {
    fontSize: 30,
    marginTop: 10,
  },
  input: {
    height: 50,
    width: 355,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec',
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    paddingTop: 10,
    color: 'red',
  }
});
