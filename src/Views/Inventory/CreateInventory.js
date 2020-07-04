import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import InputElement from '../../Components/FormElements/inputElement'
import InventoryForm from './InventoryForm'
import Selector from 'react-native-easy-select';
import { dropDownConstants } from '../../Constants/Constants';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("InventoryDatabase.db");
function Inventory(props) {
  const [materialName, setmaterialName] = useState('');
  const [category, setcategory] = useState('');
  const [unit, setunit] = useState("");
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState("");
  const [make, setmake] = useState("");
  const [note, setnote] = useState("");
  const [code, setcode] = useState("");
  const [status, setstatus] = useState("Active");
  const [accountname, setaccountName] = useState('');
  var temp = [];
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          if(results.rows.item(i).is_active===1){
            temp.push(results.rows.item(i));
          }
        }
        console.log('item:', results.rows.length);
        console.log('item:', temp[0].account_name);
        setaccountName(temp[0].account_name)
      });
    });
    var date = new Date().getDate();
    console.log(date)
  }, []);

  //function to create Inventory 
  const createInventory = async () => {
    console.log('invemtory');
    var current_date = new Date();
    var dd = current_date.getDate();
    var mm = current_date.getMonth() + 1; //January is 0!
    var yyyy = current_date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    current_date = yyyy + '/' + mm + '/' + dd;
    db.transaction(function (txn) {
      console.log("db open")
      txn.executeSql(
        'INSERT INTO table_inventorylist (name,category, unit, description,quantity,make,note,created_date,created_by,updated_by,updated_date,status,code) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [materialName, category, unit, description, quantity, make, note, current_date, accountname, ' ', current_date, status, code],
        (txn, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('invemtory successful');
            props.navigation.navigate("InventoryList");
          } else {
            console.log('Registration Failed');
          }
        }
      );
    });
  }

  return (
    <ScrollView>
      <InventoryForm
        materialInputvalue={materialName}
        materialInputChangeHandler={setmaterialName}
        quantityInputvalue={quantity}
        quantityInputChangeHandler={setquantity}
        descriptionInputvalue={description}
        descriptionInputChangeHandler={setdescription}
        noteInputvalue={note}
        noteInputChangeHandler={setnote}
        codeInputvalue={code}
        codeInputChangeHandler={setcode}
        unitInputvalue={unit}
        unitInputChangeHandler={setunit}
        statusInputvalue={status}
        statusInputChangeHandler={setstatus}
        makeInputvalue={make}
        makeInputChangeHandler={setmake}
        categoryInputvalue={category}
        categoryInputChangeHandler={setcategory}
      >
      </InventoryForm>
      <Button style={styles.buttonStyle} title={'Create'} disabled={!(unit && materialName && category && quantity && description && make)} onPress={() => createInventory()} />
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 40,
    alignSelf: 'center',
    width: "60%",
  }
});

export default Inventory;