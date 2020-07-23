import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Alert,ScrollView,TextInput,StyleSheet } from 'react-native';
import InputElement from '../../Components/FormElements/inputElement'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button} from 'react-native-elements';
import Selector from 'react-native-easy-select';
import {dropDownConstants} from '../../Constants/Constants';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
var Data = {
  tableHead: ['Name','Quantity','Action'],
}
function AddIngredients(props) {
  const [quantity, setquantity] = useState();
  const [ingredient, setingredient] = useState();
 const addtoIngredientList = () => {
   props.addtoIngredientList(ingredient,quantity);
   setquantity();
   setingredient();
 }
 const element = (data, index) => (
  <TouchableOpacity onPress={() =>  props.deleteIngredientFromList(index)}>
    <View style={styles.btn}>
      <Text style={styles.btnText}>Delete</Text>
    </View>
  </TouchableOpacity>
);
  return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Selector
    theme="dropdown" // Default: 'simple'
    items={dropDownConstants.ingredient}
    // Specify key
    valueKey="value" // Default: 'value'
    labelKey="text" // Default: 'label'
    defaultValue={ingredient} // Set default value
    placeholder="Select a Ingredient" // Placeholder for dropdown UI
    // Styles
    textOptionStyle={{ color: 'black' }}
    placeholderContainerStyle={{ paddingVertical: 20 }}
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
        secureTextEntry={props.isPassword}
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
          style={{ alignSelf: 'flex-start', marginLeft: 12 }} title={' ADD'} disabled={!(quantity&&ingredient)} onPress={() =>addtoIngredientList()} />

               {/* <Table borderStyle={{ borderColor: 'transparent' }} borderStyle={{ borderWidth: 1 }}>
        <Row data={Data.tableHead} style={styles.head} textStyle={styles.text} />
        {
          props.IngredientList.map((rowData, index) => (
            <TableWrapper key={'row' + index} style={styles.row}>
              <Cell data={rowData.ingredient} textStyle={styles.text} />
              <Cell data={rowData.quantity} textStyle={styles.text} />
              <Cell data={element(rowData, index)} textStyle={styles.text} />
            </TableWrapper>
          ))
        }
      </Table> */}
  </View>
  );
}
const styles = StyleSheet.create({
  inputStyle: {
    marginTop: 10,
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    fontSize: 18,
  },
  head: { height: 40, backgroundColor: '#2892e6' },
  text: { margin: 6 },
  row: { flexDirection: 'row' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
});
export default AddIngredients;