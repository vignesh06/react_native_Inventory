import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputElement = props => {
  return (
    <View style={styles.backgroundStyle}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={props.isPassword}
        style={styles.inputStyle}
        placeholder={props.inputPlaceHolder}
        value={props.inputValue}
        onChangeText={props.inputChangeHandler}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row'
  },
  inputStyle: {
    flex: 1,
    fontSize: 18
  }
});

export default InputElement;
