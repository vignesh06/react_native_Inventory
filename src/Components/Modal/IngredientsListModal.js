import React from 'react';
import { View, TextInput, StyleSheet, Text,FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

const IngredientsListModal = props => {
    return (
        <View>
            <Modal isVisible={props.isIngredientsListModal}>
                <View>
                <FlatList
        data={props.IngredientList}
    renderItem={({item}) => <Text style={styles.item}>{item.ingredient}({item.quantity})       
            <Icon
              name="trash"
              size={20}
              color="black"
               onPress={() => props.closeIngredientsListModal()}
            />
          </Text>}
      />
                    <Button title="Close" style={styles.buttonStyle} onPress={() => props.closeIngredientsListModal()} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    mapStyle: {
        width: 300,
        height: 300,
        alignSelf: 'center'
    },
    buttonStyle: {
        marginTop: 40,
        alignSelf: 'center',
        width: "60%",
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: 'white',
      }
});

export default IngredientsListModal;
