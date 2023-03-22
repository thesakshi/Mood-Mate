import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Alert, Button, Text, View, } from 'react-native';

const CategoriesScreen = ({navigation}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const isCategorySelected = (category) => {
    return selectedCategories.includes(category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Categories</Text>
      <StatusBar style="auto"/>

      <TouchableOpacity
        onPress={() => handleCategorySelect('Love')}
        style={[
          styles.button,
          isCategorySelected('Love') && styles.buttonSelected,
        ]}
      >
        <Text style={[styles.buttonText, isCategorySelected('Love') && styles.buttonTextSelected]}>Love</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleCategorySelect('Sports')}
        style={[
          styles.button,
          isCategorySelected('Sports') && styles.buttonSelected,
        ]}
      >
        <Text style={[styles.buttonText, isCategorySelected('Sports') && styles.buttonTextSelected]}>Sports</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleCategorySelect('Family')}
        style={[
          styles.button,
          isCategorySelected('Family') && styles.buttonSelected,
        ]}
      >
        <Text style={[styles.buttonText, isCategorySelected('Family') && styles.buttonTextSelected]}>Family</Text>
      </TouchableOpacity>

      <Button onPress={() => navigation.navigate("ChatBot")} title="Next"/>
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
    backgroundColor: "#E1B62F",
    padding: 10,
    margin: 5,
    borderRadius: 15,
    width:200,
  },
  buttonSelected: {
    backgroundColor: "white",
    borderColor: "#E1B62F",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: 'center',
  },
  buttonTextSelected: {
    color: "#333",
  },
});

export default CategoriesScreen;
