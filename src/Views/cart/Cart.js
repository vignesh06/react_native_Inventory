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

function Cart(props) {
    const [cartList, setcartList] = useState([]);

    useEffect(() => {
        activate()
    }, []);
    var temp = [];

    const activate = () => {
        db.transaction(tx => {
            console.log("inventory db httpservice")
            tx.executeSql("SELECT * FROM table_cart", [], (tx, results) => {
                console.log('table_inventory_list:', results.rows.length);
                if (results.rows.length > 0) {
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setcartList(temp)
                }
            });
        });
    }

    //function to checkOutCart Inventory 
    const checkOutCart = async () => {
        db.transaction(function (txn) {
            txn.executeSql(
                'SELECT * FROM table_cart',
                [],
                function (txn, res) {
                    if (res.rows.length >0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_cart', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_cart(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255),count INTEGER)',
                            []
                        );
                        props.navigation.navigate("InventoryList");
                    }
                }
            );
        });
    }



    return (
        <ScrollView style={styles.container}>
            <ScrollView >
                {
                    cartList.map((rowData, index) => (
                        <Card key={'row' + index}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 18, marginRight: 10 }}>{rowData.name} : </Text>
                                <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 18, marginRight: 10, marginLeft: 10, }}>{rowData.count}</Text>
                            </View>
                        </Card>
                    ))
                }

            </ScrollView>
            <View>
                <Button style={{ marginTop: 10, width: "100%" }} onPress={() => checkOutCart()} title={'Checkout'}></Button>
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

export default Cart;