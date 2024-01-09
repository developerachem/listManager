/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const OrLine = () => (
  <View style={{...style.line, width: '100%'}}>
    <Text style={style.or}>OR</Text>
  </View>
);

export default OrLine;

const style = StyleSheet.create({
  line: {
    alignItems: 'center',
    backgroundColor: '#000000',
    display: 'flex',
    height: 1,
    justifyContent: 'center',
    marginVertical: 20,
    position: 'relative',
  },

  or: {
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    padding: 5,
    position: 'absolute',
    color: 'black',
  },
});
