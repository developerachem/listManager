/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../utils/colors';

interface Props {
  title: string;
  required: boolean;
}

/**
 *
 * @param Title Required
 * @param Required Optional
 * @returns
 */
const Password = ({title, required}: Props) => {
  const [show, setShow] = React.useState(true);

  return (
    <View>
      <Text style={{color: colors.primary, fontSize: 12}}>
        {title} {required && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <View>
        <TextInput
          style={styles.input}
          secureTextEntry={show}
          placeholder={'Must be 8 characters'}
          placeholderTextColor="gray"
        />
        <Text
          onPress={() => setShow(!show)}
          style={{position: 'absolute', top: 10, right: 10}}>
          {show && <Feather name="eye" size={20} />}
          {!show && <Feather name="eye-off" size={20} />}
        </Text>
      </View>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 20,
    height: 45,
    maxWidth: '100%',
    backgroundColor: '#DEE1E5',
    marginBottom: 10,
  },
});
