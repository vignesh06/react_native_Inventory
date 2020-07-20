import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import InputElement from '../../Components/FormElements/inputElement'
import MapModal from '../../Components/Modal/MapModal'
import ScannerModal from '../../Components/Modal/ScannerModal'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("InventoryDatabase.db");

function UserProfile(props) {
  const [username, setuserName] = useState('');
  const [accountname, setaccountName] = useState('');
  const [address, setaddress] = useState('');
  const [code, setcode] = useState('');
  const [userID, setuserID] = useState();
  const [longitude, setlongitude] = useState();
  const [latitude, setlatitude] = useState();
  const [isShowMapModal, setisShowMapModal] = useState(false);
  const [isShowScannerModal, setisShowScannerModal] = useState(false);
  

  useEffect(() => {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
            var temp=[];
            for (let i = 0; i < results.rows.length; ++i) {
                if(results.rows.item(i).is_active===1){
                    temp.push(results.rows.item(i));
                  }
            }
            console.log('item:', temp[0].longitude);
            setaccountName(temp[0].account_name)
            setuserName(temp[0].emailid)
            setuserID(temp[0].id)
            setlongitude(temp[0].longitude)
            setlatitude(temp[0].latitude)
            setcode(temp[0].code)

        });
    });
  }, []);



  //function to Login 
  const login = async () => {

  }

  const updateUserProfile = async () => {
    db.transaction(tx => {
        tx.executeSql(
            'UPDATE table_user set emailid=? ,account_name=?,address=?,code=?,longitude=?,latitude=? where id=?',
            [username,accountname,address,code,longitude,latitude,userID],
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
      });
  }
  const getCoordinates=(coordinates)=>{
    console.log(coordinates);
    setlongitude(coordinates.longitude)
    setlatitude(coordinates.latitude)
  }

  const closeModalAndUpdateProfile=()=>{
    setisShowMapModal(false)
    db.transaction(tx => {
      tx.executeSql(
          'UPDATE table_user set emailid=? ,account_name=?,address=?,code=?,longitude=?,latitude=? where id=?',
          [username,accountname,address,code,longitude,latitude,userID],
          (tx, results) => {
              console.log('Results updated', results.rowsAffected);
              if (results.rowsAffected > 0) {
                  console.log('Results updated successful');
              } else {
                  alert('Updation Failed');
              }
          }
      );
    });
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setisShowScannerModal(false)
    setcode(data)
  };
  
  return (
    <View>
      <View>
        <InputElement isPassword={false} inputChangeHandler={setaccountName} inputValue={accountname} inputPlaceHolder={'Account Name'}></InputElement>
        <InputElement isPassword={false} inputChangeHandler={setuserName} inputValue={username} inputPlaceHolder={'Email Id'}></InputElement>
        <InputElement isPassword={false} inputChangeHandler={setaddress} inputValue={address} inputPlaceHolder={'Address'}></InputElement>
      <Button  
      icon={
            <Icon
              name="map-marker"
              size={20}
              color="white"
            />
          }
      style={{ width: "40%" }} title={'  Open Map'} disabled={!(accountname && username)} onPress={() =>setisShowMapModal(true)} />
        <InputElement isPassword={false} inputChangeHandler={setcode} inputValue={code} inputPlaceHolder={'Code'}></InputElement>
      <Button  
      icon={
            <Icon
              name="barcode"
              size={20}
              color="white"
            />
          }
      style={{ width: "40%" }} title={'  Scanner'} disabled={!(accountname && username)} onPress={() => setisShowScannerModal(true)} />
      </View>
      <View>
      <Button style={styles.buttonStyle} title={'Update'} disabled={!(accountname && username)} onPress={() => updateUserProfile()} />
      </View>
      <MapModal isShowMapModal={isShowMapModal} latitude={latitude}  longitude={longitude} closeModal={() =>closeModalAndUpdateProfile()} getCoordinates={(coordinates) =>getCoordinates(coordinates)}/>
      <ScannerModal isShowScannerModal={isShowScannerModal}  closeScannerModal={() =>setisShowScannerModal(false)} handleBarCodeScanned={({ type, data }) =>handleBarCodeScanned({ type, data })}/>
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

export default UserProfile;
