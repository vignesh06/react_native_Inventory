import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text,FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import Selector from 'react-native-easy-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import {dropDownConstants} from '../../Constants/Constants';

const AddIngredientsModal = props => {
    const [quantity, setquantity] = useState();
    const [ingredient, setingredient] = useState();
   const addtoIngredientList = () => {
     props.addtoIngredientList(ingredient,quantity);
     setquantity();
     setingredient();
   }
    return (
        <View>
            <Modal isVisible={props.isAddIngredientsModal}>
                <View>
                <Selector
    theme="dropdown" // Default: 'simple'
    items={dropDownConstants.ingredient}
    // Specify key
    valueKey="value" // Default: 'value'
    labelKey="text" // Default: 'label'
    defaultValue={ingredient} // Set default value
    placeholder="Select a Ingredient" // Placeholder for dropdown UI
    // Styles
    textOptionStyle={{ color: 'black'}}
    placeholderContainerStyle={{ paddingVertical: 20 , backgroundColor: 'white'}}
    placeholderStyle={{ color: 'black' }}
    optionContainerStyle={{ backgroundColor: 'white' }}
    iconStyle={{ tintColor: 'black' }}
    loadingStyle={{ marginBottom: 10 }}
    // On value change
    onChange={setingredient}
  />
  <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        secureTextEntry={false}
        placeholder={"Quantity"}
        value={quantity}
        onChangeText={setquantity}
      />
      <Button
          icon={
            <Icon
              name="plus-square"
              size={20}
              color="white"
            />
          }
         style={styles.buttonStyle} title={' ADD'} disabled={!(quantity&&ingredient)} onPress={() =>addtoIngredientList()} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: 10,
        alignSelf: 'center',
        width: "60%",
    },
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
        marginHorizontal: 15,
        fontSize: 18,
      },
});

export default AddIngredientsModal;
