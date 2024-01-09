/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';

const Logo = () => {
  return (
    <Image
      source={require('../../../assets/images/logo-round.png')}
      height={80}
      width={80}
      style={{alignSelf: 'center'}}
    />
  );
};

export default Logo;
