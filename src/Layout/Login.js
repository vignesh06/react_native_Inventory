import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HTTPService from '../Services/HTTPService';
import { UrlConstant } from '../Constants/Constants';
import labels from '../Constants/labels';
import InputElement from '../Components/FormElements/inputElement'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("InventoryDatabase.db");

function Login(props) {
  const [username, setuserName] = useState('');
  const [accountname, setaccountName] = useState('');
  const [password, setpassword] = useState('');

  useEffect(() => {
    console.log("httpservice")
    db.transaction(function (txn) {
      txn.executeSql(
        'SELECT * FROM table_user',
        [],
        function (txn, res) {
          if (res.rows.length === 0) {
            console.log('login page item:', res.rows.length);
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(id INTEGER PRIMARY KEY AUTOINCREMENT, userid VARCHAR(255),emailid VARCHAR(255), account_name  VARCHAR(255), password  VARCHAR(255))',
              []
            );
          } else {
            props.navigation.navigate("InventoryList");
          }
        }
      );
    });
  }, []);

  //function to Login 
  const login = async () => {
    let url = "http://" + accountname + ".ts1advokit.in/users/sign_in"
    let data = { "user": { "email": username, "password": password, "name": "", "app_version": 1.4 } }
    let responsedata = await HTTPService(url, 'post', data)
    console.log("httpservicelogin account_id accountname password")
    console.log(responsedata)
    db.transaction(function (tx) {
      console.log("db open")
      tx.executeSql(
        'INSERT INTO table_user (userid,emailid, account_name, password) VALUES (?,?,?,?)',
        [responsedata.account_id, username, accountname, password],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Registration successful');
            props.navigation.navigate("InventoryList");
          } else {
            console.log('Registration Failed');
          }
        }
      );
    });
  }

  return (
    <View>
      <View >
        <Image
          source={require('../Images/inventory.png')}
          style={{ width: 100, height: 100, marginTop: 20, marginLeft: "29%" }}
        />
      </View>
      <View style={styles.backgroundStyle}>
        <InputElement isPassword={false} inputChangeHandler={setaccountName} inputValue={accountname} inputPlaceHolder={'Account Name'}></InputElement>
        <InputElement isPassword={false} inputChangeHandler={setuserName} inputValue={username} inputPlaceHolder={'Eamil Id'}></InputElement>
        <InputElement isPassword={true} inputChangeHandler={setpassword} inputValue={password} inputPlaceHolder={'Password'}></InputElement>
        <Button
          icon={
            <Icon
              name="user-o"
              size={15}
              color="white"
            />
          }
          style={styles.buttonStyle} title={'  ' + labels.login.lbl_Login_button} disabled={!(username && password && accountname)} onPress={() => login()} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 50,
  },
  buttonStyle: {
    marginTop: 40,
    alignSelf: 'center',
    width: "60%",
  }
});
export default Login;
