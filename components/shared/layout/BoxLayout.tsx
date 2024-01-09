/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import colors from '../../../utils/colors';

interface Props {
  children: any;
  button?: boolean;
  link?: string;
}
const BoxLayout = ({children}: Props) => {
  const {width} = useWindowDimensions();
  return (
    <View
      style={{
        width: width / 1.3,
        ...styles.card,
        marginBottom: 20,
      }}>
      {children}
    </View>
  );
};

export default BoxLayout;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 10,
    borderRadius: 10,
  },
});
