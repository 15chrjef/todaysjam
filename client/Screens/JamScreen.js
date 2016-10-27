import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Form, Image, TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';

export default class DiscoverScreen extends Component {
  constructor() {
    super();
    this.state = {
      jamName: '',
      jamDescription: ''
    };
  }

  createPressHandler() {
    console.log(this.state.jamName);
    console.log(this.state.jamDescription);
    fetch('https://todaysjam.herokuapp.com/api/jams/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.jamName,
        description: this.state.jamDescription,
        public: true,
        userId: global._globalUserId
      })
    })
    .then((res) => {
      console.log(res);
      if(res.status === 200) {
        console.log('savedJam', res);
      }
        //add a message
      //if(res.status === xxx)
        //if something wrong happen in the database
        //post a error message
    })
    .catch((err) => {
      console.log('error message: ', err);
    });
  }

  /* information needed to 
  name: String,
  description: String,
  public: {type: Boolean, default: true},
  score: Number,
  lastCheckin: Date,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
  */

  render() {
    return (
      <View>
        <Image 
          source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
          style={styles.image} 
        />
        <View style={styles.formContainer}>
          <View style={styles.formy}>
            <Text style={styles.textB}>Create your Jam!</Text>
            <TextInput
              style={styles.textInputName}
              placeholder='Jam Name'
              onChangeText={(jamName) => this.setState({jamName: jamName})}
              value={this.state.jamName}
            />
            <TextInput
              style={styles.textInputDescription}
              placeholder='Jam Description'
              onChangeText={(jamDescription) => this.setState({jamDescription: jamDescription})}
              value={this.state.jamDescription}
            />
          </View>
          <TouchableOpacity
            onPress={this.createPressHandler.bind(this)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: '#9e34a7',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    width: 100,
    height: 40,
    marginLeft: 110,
    marginTop: 30
  },
  textInputDescription: {
    height: 240, 
    marginHorizontal: 15,
    borderColor: 'gray', 
    borderWidth: 1
  },
  textInputName: {
    height: 40, 
    marginHorizontal: 15,
    borderColor: 'gray', 
    borderWidth: 1
  },
  textB: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 3,
    textAlign: 'center'
  },
  button: {
    borderWidth: 2,
    borderRadius: 5,
    // width: 90,
    height: 36,
    margin: 3,
    marginHorizontal: 120,
    backgroundColor: '#00b33c'
  },
  formy: {
    marginTop: 45
  }
});