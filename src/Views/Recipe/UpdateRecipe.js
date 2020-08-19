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
function UpdateRecipe(props) {
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
    var isNaviagtedFromRecipePage = props.navigation.getParam('isNaviagtedFromRecipePage');
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
 if(isNaviagtedFromRecipePage){
    activate()
     }else{
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
     }
  }, []);

  const activate = () => {
    var recipeObject = props.navigation.getParam('recipe');
    console.log("svdvsvbsbvds",recipeObject)
    setrecipeName(recipeObject.recipename)
    setrecipeType(recipeObject.recipetype)
    setorigin(recipeObject.origin)
    setrecipeCategory(recipeObject.category)
    setdifficultylLevel(recipeObject.difficultylevel)
    setnumofServings(recipeObject.servings.toString())
    setinstructions(recipeObject.intruction)
    setnote(recipeObject.note)
    sethours(recipeObject.hours.toString())
    var ingredientList=[];
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM table_ingredientrecipe where recipe_id = ?',[recipeObject.id],(tx, results) => {
            let queryString = ''
            let querydata = [];
            queryString="SELECT * FROM table_ingredientlist WHERE id=?"
            for (let i = 0; i < results.rows.length; ++i) {
                if (i != 0) {
                queryString=queryString+' OR id=?'
                }
                querydata.push(results.rows.item(i).ingredient_id)
                ingredientList.push({ "name": "", "quantity": results.rows.item(i).quantity, "unit":"", "id": results.rows.item(i).ingredient_id})
              }
              console.log('item:', queryString);
              tx.executeSql(queryString,querydata,(txn, results) => {
                console.log('second Results',  results.rows.length);
                console.log('second Results',  results.rows);
                for (let i = 0; i < results.rows.length; ++i) {
                    for (let j = 0; j < ingredientList.length; ++j) {
                        if(ingredientList[j].id==results.rows.item(i).id){
                            ingredientList[j].name=results.rows.item(i).name;
                            ingredientList[j].unit=results.rows.item(i).unit;
                        }
                    }
                }
                setIngredientList(ingredientList)
                console.log('item:', ingredientList);
            }
        );
         
        });
      });
  }

  //function to update Recipe 
  const updateRecipe = async () => {
    var recipeObject = props.navigation.getParam('recipe');
    db.transaction((tx) => {
      console.log('invemtorydb');
      tx.executeSql(
          'UPDATE table_recipelist set recipename=?, origin=? , recipetype=?, category=?, difficultylevel=?, servings=?, intruction=?, note=?, hours=?  where id=?',
          [recipeName, origin, recipeType, recipeCategory, difficultylLevel, numofServings, instructions, note, hours,recipeObject.id],
          (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                  console.log('Updation successful');
                  tx.executeSql(
                    'DELETE FROM  table_ingredientrecipe where recipe_id=?',
                    [recipeObject.id],
                    (tx, results) => {
                      console.log('Results', results.rowsAffected);
                      if (results.rowsAffected > 0) {
                        let queryString = ''
                        let querydata = [];
                        let list = IngredientList
                        for (let i = 0; i < list.length; i++) {
                          if (i == 0) {
                            queryString = 'INSERT INTO table_ingredientrecipe (quantity,recipe_id,ingredient_id) VALUES (?,?,?)'
                            querydata.push(list[i].quantity)
                            querydata.push(recipeObject.id)
                            querydata.push(list[i].id)
                          } else {
                            queryString = queryString + ',(?,?,?)'
                            querydata.push(list[i].quantity)
                            querydata.push(recipeObject.id)
                            querydata.push(list[i].id)
                          }
                        }
                        tx.executeSql(
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
                        alert('invalid recipe id');
                      }
                    }
                  );
              } else {
                  alert('Updation Failed');
              }
          }
      );
  })
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
    props.navigation.navigate(screen, {recipeObject: recipeObject,screeName:"UpdateRecipe"});
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
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
        <Button
          style={{ alignSelf: 'flex-start', marginLeft: 12 }} title={'Add Ingredient'} onPress={() => navigateToRespectiveScreen('AssociateIngredientToRecipe')} />
      { IngredientList.length>0?<Button
          style={{ marginLeft: 20 }} title={' Ingredient List : ' + IngredientList.length} onPress={() => navigateToRespectiveScreen('AssociatedIngredientList')} />:<Text></Text>}
      </View>
      <Button style={styles.buttonStyle} title={'Update'} disabled={!(recipeName && IngredientList.length > 0)} onPress={() => updateRecipe()} />
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

export default UpdateRecipe;