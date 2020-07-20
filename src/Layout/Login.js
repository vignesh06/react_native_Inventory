import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
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
  const [isActiveUserPresent, setisActiveUserPresent] = useState(false);

  useEffect(() => {
    activate()
  }, []);

  const activate = () => {
    console.log("httpservice")
    db.transaction(function (txn) {
      txn.executeSql(
        'SELECT * FROM table_user',
        [],
        function (txn, res) {
          console.log('user length `:', res.rows.length);
          if (res.rows.length === 0) {
            setisActiveUserPresent(true)
            console.log('login page item:', res.rows.length);
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(id INTEGER PRIMARY KEY AUTOINCREMENT, userid VARCHAR(255),emailid VARCHAR(255), account_name  VARCHAR(255), password  VARCHAR(255),is_active INTEGER,address VARCHAR(255),longitude INTEGER,latitude INTEGER,code VARCHAR(255))',
              []
            );
          } else {
            console.log('user length `:', res.rows.length);
            for (let i = 0; i < res.rows.length; ++i) {
              if(res.rows.item(i).is_active===1){
                setisActiveUserPresent(true)
                console.log("res.rows.item(i).is_active",res.rows.item(i).is_active)
              console.log("setisActivePresent",isActiveUserPresent)
              }
            }
            if(isActiveUserPresent){
             props.navigation.navigate("InventoryList");
            }else{
              console.log("setisActivePresent",isActiveUserPresent)
              setisActiveUserPresent(true)
            }
          }
        }
      );
    });
  }
  //function to Login 
  const login = async () => {
    var isUserDataPresent=false;
    var userID;
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          if(results.rows.item(i).account_name===accountname&&results.rows.item(i).password===password&&results.rows.item(i).emailid===username){
            isUserDataPresent=true;
            userID=results.rows.item(i).id
          }
        }
        if(isUserDataPresent){
          tx.executeSql(
            'UPDATE table_user set is_active=? where id=?',
            [1,userID],
            (tx, results) => {
                console.log('Results updated', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    console.log('Results updated successful');
                    props.navigation.navigate("InventoryList");
                } else {
                    alert('Updation Failed');
                }
            }
        );
        }else{
          createNewUser()
        }
      });
    });
  }

  const createNewUser = async () => {
    let url = "http://" + accountname + ".ts1advokit.in/users/sign_in"
    let data = { "user": { "email": username, "password": password, "name": "", "app_version": 1.4 } }
    let responsedata = await HTTPService(url, 'post', data)
    console.log("httpservicelogin account_id accountname password")
    console.log(responsedata)
    if(responsedata){
    db.transaction(function (tx) {
      console.log("db open")
      tx.executeSql(
        'INSERT INTO table_user (userid,emailid, account_name, password,is_active,address,longitude,latitude,code) VALUES (?,?,?,?,?,?,?,?,?)',
        [responsedata.account_id, username, accountname, password,1,'',0,0,''],
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
  }


  return (
    <View>
      { isActiveUserPresent?
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
      </View> : 
      <ActivityIndicator size="large" color="#339af0"  style={{ marginTop:200}} />}
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
