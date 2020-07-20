import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';

const MapModal = props => {
    return (
        <View>
            <Modal isVisible={props.isShowMapModal}>
                <View>
                    <MapView style={styles.mapStyle}>
                        <Marker draggable onDragEnd={(e) => props.getCoordinates(e.nativeEvent.coordinate)}
                            coordinate={{ latitude: props.latitude, longitude: props.longitude }}
                        />
                    </MapView>
                    <Button title="Save" style={styles.buttonStyle} onPress={() => props.closeModal()} />
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
    }
});

export default MapModal;
