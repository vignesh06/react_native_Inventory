import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ScannerModal = props => {
    return (
        <View>
            <Modal isVisible={props.isShowScannerModal}>
                <View>
                    <BarCodeScanner
                        onBarCodeScanned={({ type, data }) => props.handleBarCodeScanned({ type, data })}
                        style={{
                            width: "100%",
                            height: 200,
                        }}
                    />
                    <Button title="Close" style={styles.buttonStyle} onPress={() => props.closeScannerModal()} />
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

export default ScannerModal;
