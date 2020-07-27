import React, { useState, useEffect } from 'react';
import { Button, Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView,Dimensions} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { NavigationEvents } from 'react-navigation';
import {dropDownConstants} from '../../Constants/Constants';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("InventoryDatabase.db");

function RecipeList(props) {
  const [recipeList, setrecipeList] = useState([]);

  useEffect(() => {
    activate()
  }, []);


  const activate = () => {
    console.log("inventory httpservice")
    db.transaction(tx => {
      console.log("inventory db httpservice")
      tx.executeSql("SELECT * FROM table_recipelist", [], (tx, results) => {
        console.log('table_recipelist:', results.rows.length);
        if (results.rows.length>0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setrecipeList(temp)
        } 
      });
    });
  }


  const viewReciepDetails = (recipe, index) => {
    console.log(`This is row ${index + 1}`);
    console.log('This is row', recipe);
    // props.navigation.navigate('UpdateInventory', { inventoryData: inventoryData });
  }

  return (
    <ScrollView style={styles.container}>
      <NavigationEvents
        onDidFocus={() => activate()}
      />
      <ScrollView >
        {
          recipeList.map((rowData, index) => (
            <Card key={'row' + index}
              title={rowData.recipename} onPress={() => viewReciepDetails(rowData, index)}
            >
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text >{'Origin : '}</Text><Text style={{ fontWeight: "bold" }}>{rowData.origin}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                <Text >{'Recipe Type : '}</Text><Text style={{ fontWeight: "bold" }}>{rowData.recipetype}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                <Text >{'Category : '}</Text><Text style={{ fontWeight: "bold" }}>{rowData.category}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                <Text >{'Difficulty Level : '}</Text><Text style={{ fontWeight: "bold" }}>{rowData.difficultylevel}</Text>
              </View>
              <View>
                <Button style={{ alignSelf: 'flex-end', marginTop: 10 }} onPress={() => viewReciepDetails(rowData, index)} title={''}
                  icon={
                    <Icon
                      name="arrow-circle-o-right"
                      size={20}
                      color="white"
                    />
                  }
                ></Button>
              </View>
            </Card>
          ))
        }
      </ScrollView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
});

export default RecipeList;