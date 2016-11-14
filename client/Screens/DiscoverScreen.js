import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
  Image
} from 'react-native';
import { Components } from 'exponent';
import ellipse from  '/Users/jchri/Desktop/greenfield/'


//homepage with active groups and find/create button
export default class DiscoverScreen extends React.Component { 
  constructor() {
    super();
    //generate rows that contain all current jam groups
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource:  this.ds.cloneWithRows([{
          user: 'name',
          name: 'jam name',
          score: '0'
        }])
    };
  } // end constructor

  componentWillMount() {
    fetch('https://todaysjam.herokuapp.com/api/jams', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      var newArr = [];
      JSON.parse(res._bodyText).forEach(function(jam) {
        if (jam.user[0] !== global._globalUserId) {
          newArr.push(jam);
        }
      });
      this.setState({dataSource: this.ds.cloneWithRows(newArr)});
    });
  } // end componentWillMount

  addJamPressHandler () {
    if(this.user[0] !== global._globalUserId) {
      fetch('https://todaysjam.herokuapp.com/api/jams/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          description: this.description,
          public: true,
          score: 0,
          lastCheckin: undefined,
          userId: global._globalUserId
        })
      })
      .then((res) =>  {
        if(res.status === 200) {
          console.log('You just added a Jam successfully.');
        }
      })
    } else {
      console.log('this jam has already been added.');
    }
  } // end addJamPressHandler

  render() {
    return (
      //a view is essentially a div element
        <Components.LinearGradient 
          colors={['#9e34a7', '#ad53b5']} 
          style={styles.viewContainer} >

        {/* View Header Image */}
        <View>
          <Image 
            source={require('../.././assets/todaysjambrand2.png')}
            style={styles.brand} 
            />
        </View>

        {/* View Header Text */}
        <Text style={styles.headerText}>Global Jamz</Text>

        {/* ScrollView */}
        <ScrollView style={styles.viewContainer}>
         <ListView
          dataSource={this.state.dataSource}
          //creates all the group activities dynamically 
          //with input from database
          renderRow={(rowData, i) => (
          /* Need to figure out how to map touchable elements */
            <View key={i} style={styles.jamView} className="jamView">
              <View style={styles.jamDescription}>
                <Text style={styles.descriptionText} >Jam Name: {rowData.name}</Text>
                <Text style={styles.descriptionText} >Description: {rowData.description}</Text>
              </View>

              {/* Touchable */}
              <TouchableOpacity style={rowData.user[0] === global._globalUserId ? styles.addedButton : styles.addJamButton}>
                <Text 
                  style={styles.addJamText} 
                  onPress={this.addJamPressHandler.bind(rowData)}>
                    {rowData.user[0] === global._globalUserId ? 'Added to Your Jamz' : 'Add Me to Your Jamz!'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
        </ScrollView>

      </Components.LinearGradient>
    );
  } // end render
} // end exports default

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 7,
  },
  jamDescription: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  headerText: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  descriptionText: {
    fontSize: 16,
    borderRadius: 7,
    marginLeft: 1,
    backgroundColor: 'transparent'
  },
  addJamText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',
    color: 'white',
    marginTop: 5,
    borderRadius: 7
  },
  jamView: {
    borderWidth: 1,
    flex: 1, 
    flexDirection: 'row',
    borderRadius: 7,
    height: 100,
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 7,
    borderColor: 'gray',
    backgroundColor: '#fff',
    padding: 5
  },  
  addedButton: {
    borderWidth: 2,
    borderRadius: 7,
    width: 80,
    height: 50,
    borderColor: 'gray',
    backgroundColor: 'red',
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10
  },
  addJamButton: {
    borderWidth: 2,
    borderRadius: 7,
    width: 80,
    height: 50,
    borderColor: 'gray',
    backgroundColor: '#00b33c',
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10
  },
  brand: {
    width: 100, 
    height: 40, 
    marginLeft: global._globalHeaderOffset, 
    marginTop: 30, 
    marginBottom: 10
  }
}); // end styles