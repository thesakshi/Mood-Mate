import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

const CategoriesScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Categories</Text>
            <StatusBar style="auto" />
            <TouchableOpacity onPress={""} style={styles.button}>
                <Text style={styles.buttonText}>Gaming</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={""} style={styles.button}>
                <Text style={styles.buttonText}>Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={""} style={styles.button}>
                <Text style={styles.buttonText}>Basketball</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={""} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFAE5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#E1B62F',
        textAlign: 'center',
        margin: 50,
        height: 100,
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: "#FFD700",
        padding: 10,
        margin: 5,
        borderRadius: 15,
        width: 200,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        textAlign: 'center',
    },
    nextButton: {
        backgroundColor: "#E1B62F",
        padding: 10,
        margin: 40,
        borderRadius: 15,
    },
    nextButtonText: {
        color: "white",
        fontSize: 20,
    },
});


export default CategoriesScreen;