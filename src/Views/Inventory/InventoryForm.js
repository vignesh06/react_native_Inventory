import React from 'react';
import {View, Text, TouchableOpacity, Alert,ScrollView } from 'react-native';
import InputElement from '../../Components/FormElements/inputElement'
import Selector from 'react-native-easy-select';
import {dropDownConstants} from '../../Constants/Constants';

function InventoryForm(props) {
  return (
    <ScrollView>
        <InputElement isPassword={false} inputChangeHandler={props.materialInputChangeHandler} inputValue={props.materialInputvalue} inputPlaceHolder={'Material Name*'}></InputElement>
        <InputElement isPassword={false} inputChangeHandler={props.quantityInputChangeHandler} inputValue={props.quantityInputvalue} inputPlaceHolder={'Quantity*'}></InputElement>
        <InputElement isPassword={false} inputChangeHandler={props.descriptionInputChangeHandler} inputValue={props.descriptionInputvalue} inputPlaceHolder={'Description*'}></InputElement>
        <InputElement isPassword={false} inputChangeHandler={props.noteInputChangeHandler} inputValue={props.noteInputvalue} inputPlaceHolder={'Note'}></InputElement>
        <InputElement isPassword={false} inputChangeHandler={props.codeInputChangeHandler} inputValue={props.codeInputvalue} inputPlaceHolder={'Code'}></InputElement>
        <Selector
    theme="dropdown" // Default: 'simple'
    items={dropDownConstants.unit}
    // Specify key
    valueKey="value" // Default: 'value'
    labelKey="text" // Default: 'label'
    defaultValue={props.unitInputvalue} // Set default value
    placeholder="Select a Unit*" // Placeholder for dropdown UI
    // Styles
    textOptionStyle={{ color: 'black' }}
    placeholderContainerStyle={{ paddingVertical: 20 }}
    placeholderStyle={{ color: 'black' }}
    optionContainerStyle={{ backgroundColor: 'white' }}
    iconStyle={{ tintColor: 'black' }}
    loadingStyle={{ marginBottom: 10 }}
    // On value change
    onChange={props.unitInputChangeHandler}
  />
  <Selector
    theme="dropdown" // Default: 'simple'
    items={dropDownConstants.status}
    // Specify key
    valueKey="value" // Default: 'value'
    labelKey="text" // Default: 'label'
    defaultValue={props.statusInputvalue} // Set default value
    placeholder="Select a Status" // Placeholder for dropdown UI
    // Styles
    textOptionStyle={{ color: 'black' }}
    placeholderContainerStyle={{ paddingVertical: 20 }}
    placeholderStyle={{ color: 'black' }}
    optionContainerStyle={{ backgroundColor: 'white' }}
    iconStyle={{ tintColor: 'black' }}
    loadingStyle={{ marginBottom: 10 }}
    // On value change
    onChange={props.statusInputChangeHandler}
  />
  <Selector
    theme="dropdown" // Default: 'simple'
    items={dropDownConstants.make}
    // Specify key
    valueKey="value" // Default: 'value'
    labelKey="text" // Default: 'label'
    defaultValue={props.makeInputvalue} // Set default value
    placeholder="Select a Make*" // Placeholder for dropdown UI
    // Styles
    textOptionStyle={{ color: 'black' }}
    placeholderContainerStyle={{ paddingVertical: 20 }}
    placeholderStyle={{ color: 'black' }}
    optionContainerStyle={{ backgroundColor: 'white' }}
    iconStyle={{ tintColor: 'black' }}
    loadingStyle={{ marginBottom: 10 }}
    // On value change
    onChange={props.makeInputChangeHandler}
  />
  <Selector
    theme="dropdown" // Default: 'simple'
    items={dropDownConstants.category}
    // Specify key
    valueKey="value" // Default: 'value'
    labelKey="text" // Default: 'label'
    defaultValue={props.categoryInputvalue} // Set default value
    placeholder="Select a Category*" // Placeholder for dropdown UI
    // Styles
    textOptionStyle={{ color: 'black' }}
    placeholderContainerStyle={{ paddingVertical: 20 }}
    placeholderStyle={{ color: 'black' }}
    optionContainerStyle={{ backgroundColor: 'white' }}
    iconStyle={{ tintColor: 'black' }}
    loadingStyle={{ marginBottom: 10 }}
    // On value change
    onChange={props.categoryInputChangeHandler}
  />
      </ScrollView>
  );
}

export default InventoryForm;