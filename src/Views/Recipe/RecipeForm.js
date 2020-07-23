import React from 'react';
import {View, Text, TouchableOpacity, Alert,ScrollView } from 'react-native';
import InputElement from '../../Components/FormElements/inputElement'
import Selector from 'react-native-easy-select';
import {dropDownConstants} from '../../Constants/Constants';

function RecipeForm(props) {
  return (
    <ScrollView>
        <InputElement isPassword={false} inputChangeHandler={props.recipeNameInputChangeHandler} inputValue={props.recipeNameInputvalue} inputPlaceHolder={'Recipe Name*'}></InputElement>
        <Selector
    theme="dropdown" // Default: 'simple'
    items={dropDownConstants.origin}
    // Specify key
    valueKey="value" // Default: 'value'
    labelKey="text" // Default: 'label'
    defaultValue={props.originInputvalue} // Set default value
    placeholder="Select a Origin" // Placeholder for dropdown UI
    // Styles
    textOptionStyle={{ color: 'black' }}
    placeholderContainerStyle={{ paddingVertical: 20 }}
    placeholderStyle={{ color: 'black' }}
    optionContainerStyle={{ backgroundColor: 'white' }}
    iconStyle={{ tintColor: 'black' }}
    loadingStyle={{ marginBottom: 10 }}
    // On value change
    onChange={props.originInputChangeHandler}
  />
  <Selector
    theme="dropdown" // Default: 'simple'
    items={dropDownConstants.recipeType}
    // Specify key
    valueKey="value" // Default: 'value'
    labelKey="text" // Default: 'label'
    defaultValue={props.recipeTypeInputvalue} // Set default value
    placeholder="Type of Recipe" // Placeholder for dropdown UI
    // Styles
    textOptionStyle={{ color: 'black' }}
    placeholderContainerStyle={{ paddingVertical: 20 }}
    placeholderStyle={{ color: 'black' }}
    optionContainerStyle={{ backgroundColor: 'white' }}
    iconStyle={{ tintColor: 'black' }}
    loadingStyle={{ marginBottom: 10 }}
    // On value change
    onChange={props.recipeTypeInputChangeHandler}
  />
  <Selector
    theme="dropdown" // Default: 'simple'
    items={dropDownConstants.recipeCategory}
    // Specify key
    valueKey="value" // Default: 'value'
    labelKey="text" // Default: 'label'
    defaultValue={props.recipeCategoryInputvalue} // Set default value
    placeholder="Select a Category" // Placeholder for dropdown UI
    // Styles
    textOptionStyle={{ color: 'black' }}
    placeholderContainerStyle={{ paddingVertical: 20 }}
    placeholderStyle={{ color: 'black' }}
    optionContainerStyle={{ backgroundColor: 'white' }}
    iconStyle={{ tintColor: 'black' }}
    loadingStyle={{ marginBottom: 10 }}
    // On value change
    onChange={props.recipeCategoryInputChangeHandler}
  />
  <Selector
    theme="dropdown" // Default: 'simple'
    items={dropDownConstants.difficultylLevel}
    // Specify key
    valueKey="value" // Default: 'value'
    labelKey="text" // Default: 'label'
    defaultValue={props.difficultylLevelInputvalue} // Set default value
    placeholder="Difficulty Level" // Placeholder for dropdown UI
    // Styles
    textOptionStyle={{ color: 'black' }}
    placeholderContainerStyle={{ paddingVertical: 20 }}
    placeholderStyle={{ color: 'black' }}
    optionContainerStyle={{ backgroundColor: 'white' }}
    iconStyle={{ tintColor: 'black' }}
    loadingStyle={{ marginBottom: 10 }}
    // On value change
    onChange={props.difficultylLevelInputChangeHandler}
  />
  <InputElement isPassword={false} inputChangeHandler={props.numofServingsInputChangeHandler} inputValue={props.numofServingsInputvalue} inputPlaceHolder={'Num of Servings'}></InputElement>
        <InputElement isPassword={false} inputChangeHandler={props.instructionsInputChangeHandler} inputValue={props.instructionsInputvalue} inputPlaceHolder={'Instructions'}></InputElement>
        <InputElement isPassword={false} inputChangeHandler={props.noteInputChangeHandler} inputValue={props.noteInputvalue} inputPlaceHolder={'Note'}></InputElement>
        <InputElement isPassword={false} inputChangeHandler={props.hoursInputChangeHandler} inputValue={props.hoursInputvalue} inputPlaceHolder={'Hours'}></InputElement>
      </ScrollView>
  );
}

export default RecipeForm;