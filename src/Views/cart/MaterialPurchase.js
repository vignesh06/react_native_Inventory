import React, { useState, useEffect } from 'react';
import { Button, Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Dimensions } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { NavigationEvents } from 'react-navigation';
import { dropDownConstants } from '../../Constants/Constants';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("InventoryDatabase.db");
var recipeObject;
var Data = {
    tableHead: ['name', 'category', 'unit', 'quantity', 'code', 'Action'],
}

function MaterialPurchase(props) {
    const [materialData, setmaterialData] = useState([]);

    useEffect(() => {
        activate()
    }, []);
   

    const activate = () => {
        var temp = [];
        db.transaction(tx => {
            console.log("inventory db httpservice")
            tx.executeSql("SELECT * FROM table_inventorylist", [], (tx, results) => {
                console.log('table_inventory_list:', results.rows.length);
                if (results.rows.length > 0) {
                    for (let i = 0; i < results.rows.length; ++i) {
                        let materialObject = {
                            "name": results.rows.item(i).name,
                            "count": 1,
                            "id": results.rows.item(i).id,
                            "quantity": results.rows.item(i).quantity
                        }
                        temp.push(materialObject);
                    }
                    setmaterialData(temp)
                }
            });
        });
        db.transaction(function (txn) {
            txn.executeSql(
                'SELECT * FROM table_cart',
                [],
                function (txn, res) {
                    if (res.rows.length>0) {
                        console.log("dcdscdsc")
                        txn.executeSql('DROP TABLE IF EXISTS table_cart', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_cart(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255),count INTEGER)',
                            []
                        );
                    }
                }
            );
        });
    }

    //function to create Inventory 
    const addMaterialToCart = async () => {
        db.transaction(function (txn) {
            var temp = [];
            temp = materialData
            var queryString = ''
            var queryData = [];
            let firstEntry = true;
            for (let i = 0; i < temp.length; i++) {
                console.log('invemtory');
                if (temp[i].count > 0) {
                    if (firstEntry) {
                        firstEntry = false
                        queryString = 'INSERT INTO table_cart (name,count) VALUES (?,?)'
                        queryData.push(temp[i].name)
                        queryData.push(temp[i].count)
                    } else {
                        queryString = queryString + ',(?,?)'
                        queryData.push(temp[i].name)
                        queryData.push(temp[i].count)
                    }
                }
            }
            console.log('invemtory',queryString);
            console.log('invemtory',queryData);
            txn.executeSql(queryString,queryData,(txn, results) => {
                    console.log('second Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        console.log('Insert success');
                        props.navigation.navigate("Cart");
                    } else {
                        console.log('Insert failed');
                    }
                }
            );
        });
    }

    const addOrRemoveItem = (index, type) => {
        var temp = [];
        temp = materialData
        console.log("ccdd")
        if (type === 'add') {
            temp[index].count = temp[index].count + 1;
            setmaterialData(prevmaterialData => ([...temp]));
        } else {
            temp[index].count = temp[index].count - 1;
            setmaterialData(prevmaterialData => ([...temp]));
        }
    }

    return (
        <ScrollView style={styles.container}>
         <NavigationEvents
        onDidFocus={() => activate()}
      />
            <ScrollView >
                {
                    materialData.map((rowData, index) => (
                        <Card key={'row' + index}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 18, marginRight: 10 }}>{rowData.name}</Text>
                                <Button onPress={() => addOrRemoveItem(index, 'remove')} title={''}
                                    icon={
                                        <Icon
                                            name="minus-square"
                                            size={20}
                                            color="white"
                                        />
                                    }
                                    disabled={!rowData.count > 0}></Button>
                                <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 18, marginRight: 10, marginLeft: 10, }}>{rowData.count}</Text>
                                <Button style={{ marginLeft: 10 }} onPress={() => addOrRemoveItem(index, 'add')} title={''}
                                    icon={
                                        <Icon
                                            name="plus-square"
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
            <View>
                <Button style={{ marginTop: 10, width: "100%" }} onPress={() => addMaterialToCart()} title={'Go To Cart'}></Button>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: { padding: 16, paddingTop: 30, backgroundColor: '#fff' },
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

export default MaterialPurchase;