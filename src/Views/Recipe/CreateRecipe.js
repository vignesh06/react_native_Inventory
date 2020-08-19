import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, FlatList } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import IngredientsListModal from '../../Components/Modal/IngredientsListModal'
import AddIngredientModal from '../../Components/Modal/AddIngredientModal'
import RecipeForm from './RecipeForm'
import AddIngredients from './AddIngredients'
import Selector from 'react-native-easy-select';
import { dropDownConstants } from '../../Constants/Constants';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("InventoryDatabase.db");
function CreateRecipe(props) {
  const [recipeName, setrecipeName] = useState('');
  const [recipeType, setrecipeType] = useState("");
  const [origin, setorigin] = useState("");
  const [recipeCategory, setrecipeCategory] = useState('');
  const [difficultylLevel, setdifficultylLevel] = useState("");
  const [numofServings, setnumofServings] = useState("");
  const [instructions, setinstructions] = useState("");
  const [note, setnote] = useState("");
  const [hours, sethours] = useState("");
  const [IngredientList, setIngredientList] = useState([]);
  const [accountname, setaccountName] = useState('');
  const [isIngredientsListModal, setisIngredientsListModal] = useState(false);
  const [isAddIngredientsModal, setisAddIngredientsModal] = useState(false);

  var temp = [];
  useEffect(() => {
    var recipeObject = props.navigation.getParam('recipeObject');
    console.log("dvddv",recipeObject)
    setrecipeName(recipeObject.recipeName)
    setrecipeType(recipeObject.recipeType)
    setorigin(recipeObject.origin)
    setrecipeCategory(recipeObject.recipeCategory)
    setdifficultylLevel(recipeObject.difficultylLevel)
    setnumofServings(recipeObject.numofServings)
    setinstructions(recipeObject.instructions)
    setnote(recipeObject.note)
    sethours(recipeObject.hours)
    setIngredientList(recipeObject.IngredientList)
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          if (results.rows.item(i).is_active === 1) {
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
  const createRecipe = async () => {
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
        'INSERT INTO table_recipelist (recipename,origin,recipetype,category,difficultylevel,servings,intruction,note,hours) VALUES (?,?,?,?,?,?,?,?,?)',
        [recipeName, origin, recipeType, recipeCategory, difficultylLevel, numofServings, instructions, note, hours],
        (txn, results) => {
          console.log('first Results', results.insertId);
          if (results.rowsAffected > 0) {
            let queryString = ''
            let querydata = [];
            let list = IngredientList
            for (let i = 0; i < list.length; i++) {
              if (i == 0) {
                queryString = 'INSERT INTO table_ingredientrecipe (quantity,recipe_id,ingredient_id) VALUES (?,?,?)'
                querydata.push(list[i].quantity)
                querydata.push(results.insertId)
                querydata.push(list[i].id)
              } else {
                queryString = queryString + ',(?,?,?)'
                querydata.push(list[i].quantity)
                querydata.push(results.insertId)
                querydata.push(list[i].id)
              }
            }
            txn.executeSql(
              queryString,
              querydata,
              (txn, results) => {
                console.log('second Results', results.rowsAffected);
                console.log('Results', results);
                if (results.rowsAffected > 0) {
                  console.log('Insert success');
                  props.navigation.navigate("InventoryList");
                } else {
                  console.log('Insert failed');
                }
              }
            );
          } else {
            console.log('inventory Failed');
          }
        }
      );
    });
  }

  const navigateToRespectiveScreen = (screen) => {
    let recipeObject={
      "recipeName":recipeName,
      "recipeType":recipeType,
      "origin":origin,
      "recipeCategory":recipeCategory,
      "difficultylLevel":difficultylLevel,
      "numofServings":numofServings,
      "instructions":instructions,
      "note":note,
      "hours":hours,
      "IngredientList":IngredientList
    }
    props.navigation.navigate(screen, {recipeObject: recipeObject,screeName:"CreateRecipe"});
  }


  const addtoIngredientList = (ingredient, quantity) => {
    let tempIngredientList = IngredientList
    tempIngredientList.push({ "ingredient": ingredient, "quantity": quantity })
    setIngredientList(tempIngredientList)
    setisAddIngredientsModal(false)
    console.log('ingredient', tempIngredientList);
  }

  const deleteIngredientFromList = (index) => {
    let tempIngredientList = IngredientList
    tempIngredientList.splice(index, 1);
    setIngredientList(tempIngredientList)
    console.log('ingredient', tempIngredientList);
  }

  return (
    <ScrollView>
      <RecipeForm
        recipeNameInputvalue={recipeName}
        recipeNameInputChangeHandler={setrecipeName}
        originInputvalue={origin}
        originInputChangeHandler={setorigin}
        recipeTypeInputvalue={recipeType}
        recipeTypeInputChangeHandler={setrecipeType}
        recipeCategoryInputvalue={recipeCategory}
        recipeCategoryInputChangeHandler={setrecipeCategory}
        difficultylLevelInputvalue={difficultylLevel}
        difficultylLevelInputChangeHandler={setdifficultylLevel}
        numofServingsInputvalue={numofServings}
        numofServingsInputChangeHandler={setnumofServings}
        instructionsInputvalue={instructions}
        instructionsInputChangeHandler={setinstructions}
        noteInputvalue={note}
        noteInputChangeHandler={setnote}
        hoursInputvalue={hours}
        hoursInputChangeHandler={sethours}
      >
      </RecipeForm>

      {/* <Text style={styles.headingstyle}>No of Ingredients: {IngredientList.length}</Text>
      <Button
          icon={
            <Icon
              name="plus-square"
              size={20}
              color="white"
            />
          }
          style={{ alignSelf: 'flex-start', marginLeft: 12 }} onPress={() =>setisAddIngredientsModal(true)} /> 
       <TouchableOpacity onPress={() =>setisIngredientsListModal(true)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{IngredientList.length}</Text>
      </View>
    </TouchableOpacity> */}
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
        <Button
          style={{ alignSelf: 'flex-start', marginLeft: 12 }} title={'Add Ingredient'} onPress={() => navigateToRespectiveScreen('AssociateIngredientToRecipe')} />
      { IngredientList.length>0?<Button
          style={{ marginLeft: 20 }} title={' Ingredient List : ' + IngredientList.length} onPress={() => navigateToRespectiveScreen('AssociatedIngredientList')} />:<Text></Text>}
      </View>
      {/* <AddIngredients deleteIngredientFromList={(index)=>deleteIngredientFromList(index)}addtoIngredientList={(ingredient,quantity)=>addtoIngredientList(ingredient,quantity)} IngredientList={IngredientList}>
          </AddIngredients> */}
      {/* <IngredientsListModal  closeIngredientsListModal={() =>setisIngredientsListModal(false)}  isIngredientsListModal={isIngredientsListModal} deleteIngredientFromList={(index)=>deleteIngredientFromList(index)}  IngredientList={IngredientList}/>
    <AddIngredientModal  addtoIngredientList={(ingredient,quantity)=>addtoIngredientList(ingredient,quantity)}  isAddIngredientsModal={isAddIngredientsModal}/> */}
      <Button style={styles.buttonStyle} title={'Create'} disabled={!(recipeName && IngredientList.length > 0)} onPress={() => createRecipe()} />
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 40,
    alignSelf: 'center',
    width: "60%",
  },
  headingstyle: { fontSize: 18, marginTop: 30, },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});

export default CreateRecipe;