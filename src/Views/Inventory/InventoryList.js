import React, { useState, useEffect } from 'react';
import { Button, Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView,Dimensions} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { NavigationEvents } from 'react-navigation';
import {dropDownConstants} from '../../Constants/Constants';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("InventoryDatabase.db");
var recipeObject;
var Data = {
  tableHead: ['name', 'category', 'unit', 'quantity', 'code', 'Action'],
}

function InventoryList(props) {
  const [inventoryData, setinventoryData] = useState([]);

  useEffect(() => {
    activate()
  }, []);


  const activate = () => {
    recipeObject={
      "recipeName":"",
      "recipeType":"",
      "origin":"",
      "recipeCategory":"",
      "difficultylLevel":"",
      "numofServings":"",
      "instructions":"",
      "note":"",
      "hours":"",
      "IngredientList":[]
    }
    console.log("inventory httpservice")
    db.transaction(tx => {
      console.log("inventory db httpservice")
      tx.executeSql("SELECT * FROM table_inventorylist", [], (tx, results) => {
        console.log('table_inventory_list:', results.rows.length);
        if (results.rows.length == 0) {
          tx.executeSql('DROP TABLE IF EXISTS table_inventorylist', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS table_inventorylist(id INTEGER PRIMARY KEY AUTOINCREMENT, name  VARCHAR(255),category VARCHAR(255), unit  VARCHAR(255), description  VARCHAR(255),quantity  VARCHAR(255),make VARCHAR(255),note VARCHAR(255),created_date  VARCHAR(255),created_by VARCHAR(255),updated_by VARCHAR(255),updated_date  VARCHAR(255),status VARCHAR(255),code  VARCHAR(255))',
            []
          );
          tx.executeSql('DROP TABLE IF EXISTS table_recipelist', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS table_recipelist(id INTEGER PRIMARY KEY AUTOINCREMENT, recipename  VARCHAR(255), origin  VARCHAR(255), recipetype  VARCHAR(255), category  VARCHAR(255), difficultylevel  VARCHAR(255),servings INTEGER,intruction TEXT,note TEXT,hours INTEGER)',
            []
          );
          tx.executeSql('DROP TABLE IF EXISTS table_ingredientlist', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS table_ingredientlist(id INTEGER PRIMARY KEY AUTOINCREMENT, name  VARCHAR(255),isSeasonal INTEGER,unit VARCHAR(255))',
            []
          );
          tx.executeSql('DROP TABLE IF EXISTS table_ingredientrecipe', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS table_ingredientrecipe(id INTEGER PRIMARY KEY AUTOINCREMENT,recipe_id INTEGER,ingredient_id INTEGER,quantity  VARCHAR(255), FOREIGN KEY (recipe_id) REFERENCES table_recipelist(id), FOREIGN KEY (ingredient_id) REFERENCES table_ingredientlist(id))',
            []
          );
          tx.executeSql('DROP TABLE IF EXISTS table_cart', []);
          tx.executeSql(
              'CREATE TABLE IF NOT EXISTS table_cart(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255),count INTEGER)',
              []
          );
          let queryString = ''
          let querydata = [];
          let list = dropDownConstants.ingredient
          for (let i = 0; i < list.length; i++) {
            if (i == 0) {
              queryString = 'INSERT INTO table_ingredientlist (name,isSeasonal,unit) VALUES (?,?,?)'
              querydata.push(list[i].text)
              querydata.push(list[i].isSeasonal)
              querydata.push(list[i].unit)
            } else {
              queryString = queryString + ',(?,?,?)'
              querydata.push(list[i].text)
              querydata.push(list[i].isSeasonal)
              querydata.push(list[i].unit)
            }
          }
          tx.executeSql(
            queryString,
            querydata,
            (tx, results) => {
              console.log('second Results', results.rowsAffected);
              console.log('Results', results);
              if (results.rowsAffected > 0) {
                console.log('Insert success');
              } else {
                console.log('Insert failed');
              }
            }
          );
        } else {
      
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setinventoryData(temp)
        }
      });
    });
  }

  const logout = () => {
    console.log("logout")
    var userID;
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
              if(results.rows.item(i).is_active===1){
                userID=results.rows.item(i).id
                }
          }
          tx.executeSql(
            'UPDATE table_user set is_active=? where id=?',
            [0,userID],
            (tx, results) => {
                console.log('logout', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    console.log('logout successful');
                    props.navigation.navigate("Login");
                } else {
                    alert('logout Failed');
                }
            }
        );
      });
  });
  }

  const viewInventoryDetails = (inventoryData, index) => {
    console.log(`This is row ${index + 1}`);
    console.log('This is row', inventoryData);
    props.navigation.navigate('UpdateInventory', { inventoryData: inventoryData });
  }
  const state = Data;
  const element = (data, index) => (
    <TouchableOpacity onPress={() => viewInventoryDetails(data, index)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>View</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={styles.container}>
      <NavigationEvents
        onDidFocus={() => activate()}
      />

      <ScrollView >
      {/* <Text> {Dimensions.get('window').height}</Text> */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Button
          icon={
            <Icon
              name="plus-square"
              size={20}
              color="white"
            />
          }
          style={{ alignSelf: 'flex-start', marginLeft: 12 }} title={' Create Inventory'} onPress={() => props.navigation.navigate("CreateInventory")} />
          <Button
          style={{marginLeft:20}} title={' Profile'} onPress={() =>props.navigation.navigate("UserProfile")} />
          <Button
          style={{ alignSelf: 'flex-end', marginLeft:90}} title={' Logout'} onPress={() =>logout()} />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
        <Button
          icon={
            <Icon
              name="plus-square"
              size={20}
              color="white"
            />
          }
          style={{ alignSelf: 'flex-start', marginLeft: 12 }} title={' Create Recipe'} onPress={() => props.navigation.navigate("CreateRecipe",{recipeObject: recipeObject,isNaviagtedFromRecipePage:false})} />
          <Button
          style={{marginLeft:20}} title={' Recipe List'} onPress={() =>props.navigation.navigate("RecipeList")} />
          </View>
          <View style={{ flex: 1,marginTop: 10, flexDirection: 'row' }}>
          <Button
          style={{marginLeft:20}} title={' Material Purchase'} onPress={() =>props.navigation.navigate("MaterialPurchase")} />
          </View>
      </ScrollView>
      {/* <Table borderStyle={{ borderColor: 'transparent' }} borderStyle={{ borderWidth: 1 }}>
        <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
        {
          inventoryData.map((rowData, index) => (
            <TableWrapper key={'row' + index} style={styles.row}>
              <Cell data={rowData.name} textStyle={styles.text} />
              <Cell data={rowData.category} textStyle={styles.text} />
              <Cell data={rowData.unit} textStyle={styles.text} />
              <Cell data={rowData.quantity} textStyle={styles.text} />
              <Cell data={rowData.code} textStyle={styles.text} />
              <Cell data={element(rowData, index)} textStyle={styles.text} />
            </TableWrapper>
          ))
        }
      </Table> */}
      <ScrollView >
        {
          inventoryData.map((rowData, index) => (
            <Card key={'row' + index}
              title={rowData.name} onPress={() => viewInventoryDetails(rowData, index)}
            >
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text >{'Quantity : '}</Text><Text style={{ fontWeight: "bold" }}>{rowData.quantity}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                <Text >{'Unit : '}</Text><Text style={{ fontWeight: "bold" }}>{rowData.unit}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                <Text >{'Category : '}</Text><Text style={{ fontWeight: "bold" }}>{rowData.category}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                <Text >{'Code : '}</Text><Text style={{ fontWeight: "bold" }}>{rowData.code}</Text>
              </View>
              <View>
                <Button style={{ alignSelf: 'flex-end', marginTop: 10 }} onPress={() => viewInventoryDetails(rowData, index)} title={''}
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
  head: { height: 40, backgroundColor: '#2892e6' },
  text: { margin: 6 },
  row: { flexDirection: 'row' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    width: "45%",
    right: 0
  }
});

export default InventoryList;