/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, ScrollView, Text, View, useWindowDimensions} from 'react-native';
import colors from '../../../utils/colors';

interface Props {
  children: any;
  withoutLogo?: boolean;
  button?: boolean;
  link?: string;
}
const AuthLayout = ({children, withoutLogo}: Props) => {
  const {width, height} = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          borderBottomLeftRadius: 600,
          borderBottomEndRadius: 600,
          width: width * 1.7,
        }}
      />
      <View style={{flex: 1, backgroundColor: colors.black}} />

      <View
        style={{
          position: 'absolute',
          width: width,
        }}>
        <ScrollView style={{height: height - 100, marginTop: 100}}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {!withoutLogo && (
              <>
                <Image
                  source={require('../../../assets/images/logo-round.png')}
                  style={{
                    borderRadius: 100,
                    margin: 'auto',
                    height: 100,
                    width: 100,
                  }}
                />
                <Text style={{color: colors.white, marginTop: 5, fontSize: 18}}>
                  SmartCare List
                </Text>
              </>
            )}
            {children}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AuthLayout;
