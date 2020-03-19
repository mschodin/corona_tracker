import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import Constants from 'expo-constants';


const DATA = [
    {
      id: '1',
      title: 'First Item',
    },
    {
      id: '2',
      title: 'Second Item',
    },
    {
      id: '3',
      title: 'Third Item',
    },
    {
        id: '4',
        title: 'First Item',
      },
      {
        id: '5',
        title: 'Second Item',
      },
      {
        id: '6',
        title: 'Third Item',
      },
      {
        id: '7',
        title: 'First Item',
      },
      {
        id: '8',
        title: 'Second Item',
      },
      {
        id: '9',
        title: 'Third Item',
      },
  ];
  

  function Item({ title }) {
    return (
      <View style={{backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,}}>
        <Text style={{fontSize: 32}}>{title}</Text>
      </View>
    );
  }

export default CrossFeed = (props) => {
    return (
        <View>
            <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
        </View>
    );
}