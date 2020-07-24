import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import Selector from 'react-native-easy-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import { dropDownConstants } from '../../Constants/Constants';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("InventoryDatabase.db");

var recipeObject;
const AssociateIngredientToRecipe = props => {
  const [quantity, setquantity] = useState();
  const [ingredient, setingredient] = useState();
  const [unit, setunit] = useState("");
  const [id, setid] = useState();
  const [isShowWarningMessage, setisShowWarningMessage] = useState(false);
  const [ingredientList, setingredientList] = useState([]);

  const addtoIngredientList = () => {
    recipeObject.IngredientList.push({ "name": ingredient, "quantity": quantity, "unit": unit, "id": id })
    props.navigation.navigate("CreateRecipe", { recipeObject: recipeObject });
  }

  const selectedIngredient = (value) => {
    let list = ingredientList;
    setingredient(value)
    for (let i = 0; i < list.length; i++) {
      if (value === list[i].name) {
        setunit(list[i].unit)
        setid(list[i].id)
        if(list[i].isSeasonal===1){
          setisShowWarningMessage(true)
        }else{
          setisShowWarningMessage(false)
        }
      }
    }
  }
  const navigateToRecipePage = () => {
    props.navigation.navigate("CreateRecipe", { recipeObject: recipeObject });
  }

  useEffect(() => {
    var temp = [];
    recipeObject = props.navigation.getParam('recipeObject');
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_ingredientlist', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        console.log('item:', temp);
        setingredientList(temp)
      });
    });
  }, []);


  return (
    <ScrollView>
      <View style={{marginTop: 20}}>
        <Selector
          theme="dropdown" // Default: 'simple'
          items={ingredientList}
          // Specify key
          valueKey="name" // Default: 'value'
          labelKey="name" // Default: 'label'
          defaultValue={ingredient} // Set default value
          placeholder="Select a Ingredient" // Placeholder for dropdown UI
          // Styles
          textOptionStyle={{ color: 'black' }}
          placeholderContainerStyle={{ paddingVertical: 20, backgroundColor: 'white' }}
          placeholderStyle={{ color: 'black' }}
          optionContainerStyle={{ backgroundColor: 'white' }}
          iconStyle={{ tintColor: 'black' }}
          loadingStyle={{ marginBottom: 10,marginRight: 20}}
          // On value change
          onChange={(value) => selectedIngredient(value)}
        />
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputStyle}
          secureTextEntry={false}
          placeholder={"Quantity"}
          value={quantity}
          onChangeText={setquantity}
        />
        <Text style={styles.headingstyle}>{unit}</Text>
      </View>
      {isShowWarningMessage?<Text style={styles.warningstyle}>Warning: This is seasonal Ingredient</Text>:<Text></Text>}
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
        <Button
          style={{ alignSelf: 'flex-start', marginLeft: 12 }} title={'Back'} onPress={() => navigateToRecipePage()} />
        <Button
          style={{ marginLeft: 20 }} title={'Add Ingredient'} disabled={!(quantity && ingredient)} onPress={() => addtoIngredientList()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 20,
    alignSelf: 'center',
    width: "60%",
  },
  headingstyle: { fontSize: 18, marginTop: 30, marginLeft: 10 },
  warningstyle: { fontSize: 18, marginTop: 20, marginLeft: 10,color:"#ffba00" },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: 'white',
  },
  inputStyle: {
    marginTop: 10,
    backgroundColor: 'white',
    height: 50,
    borderRadius: 5,
    fontSize: 18,
    width: "80%"
  },
});

export default AssociateIngredientToRecipe;
