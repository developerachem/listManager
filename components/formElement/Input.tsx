/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import colors from '../../utils/colors';

interface Props {
  title: string;
  required?: boolean;
  number?: boolean;
  width?: number;
  value: string;
  handler: () => void;
}

/**
 *
 * @param Title Required
 * @param Required Optional
 * @param width Number or string
 * @returns
 */
const Input = ({title, required, number, width, value, handler}: Props) => {
  return (
    <View style={{width: width ? `${width}%` : '100%'}}>
      {title && (
        <Text style={{color: colors.primary, marginBottom: 5, fontSize: 12}}>
          {title || 'title not found'}{' '}
          {required && <Text style={{color: 'red'}}>*</Text>}
        </Text>
      )}
      <TextInput
        style={{...styles.input, width: '100%'}}
        placeholderTextColor="gray"
        placeholder={'Enter ' + title}
        keyboardType={number ? 'number-pad' : 'default'}
        onChangeText={handler}
        value={value}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    paddingHorizontal: 20,
    height: 45,
    maxWidth: '100%',
    backgroundColor: '#DEE1E5',
    marginBottom: 10,
  },
});
