import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList,ScrollView } from 'react-native';
import { Button, Card, ListItem } from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
var recipeObject;
const AssociatedIngredientList = props => {
    const [ingredientList, setingredientList] = useState([]);
    useEffect(() => {
        recipeObject = props.navigation.getParam('recipeObject');
        setingredientList(recipeObject.IngredientList)
    }, []);

    const navigateToRecipePage = () => {
        recipeObject.IngredientList=ingredientList;
        props.navigation.navigate("CreateRecipe", {recipeObject: recipeObject});
    }
    const deleteIngredientFromList = (index) => {
        let tempIngredientList = ingredientList
        tempIngredientList.splice(index, 1);
        setingredientList(tempIngredientList)
        console.log('ingredient', tempIngredientList);
      }

    return (
              <ScrollView >
        {
          ingredientList.map((rowData, index) => (
            <Card key={'row' + index} title={rowData.name}>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                <Text >{'Quantity : '}</Text><Text style={{ fontWeight: "bold" }}>{rowData.quantity} {rowData.unit}</Text>
              </View>
              <View>
                <Button style={{ alignSelf: 'flex-end', marginTop: 10 }} onPress={() => deleteIngredientFromList(index)} title={''}
                  icon={
                    <Icon
                      name="trash"
                      size={20}
                      color="white"
                    />
                  }
                ></Button>
              </View>
            </Card>
          ))
        }
         <View >
      <Button style={styles.buttonStyle} title={'Back'} onPress={() =>navigateToRecipePage()} />
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: 20,
        alignSelf: 'center',
        width: "60%",
    }
});

export default AssociatedIngredientList;
