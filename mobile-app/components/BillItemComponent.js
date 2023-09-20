import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BillItemComponent = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  name: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    color: '#4CAF50',
  },
});

export default BillItemComponent;
