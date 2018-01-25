import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common'
import firebase from 'firebase';
import LoginForm from './components/LoginForm';



class App extends Component {
  state = { loggedIn: null }

  componentWillMount () {
    firebase.initializeApp ({
      apiKey: 'AIzaSyBiBHaYOb7t7aTs-LB3Z_NV0Arh7-50UX8',
      authDomain: 'authentication-93f68.firebaseapp.com',
      databaseURL: 'https://authentication-93f68.firebaseio.com',
      projectId: 'authentication-93f68',
      storageBucket: 'authentication-93f68.appspot.com',
      messagingSenderId: '410261703125'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    });
  }

  renderContent() {
    switch(this.state.loggedIn){
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />;
    }
  }


  render () {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    )
  }
}


export default App;
