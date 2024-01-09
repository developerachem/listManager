/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useLinkTo} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../utils/colors';

const UnSyncList = () => {
  const focus = useIsFocused();
  const linkTo = useLinkTo();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getData();
  }, [focus]);

  const getData = async () => {
    const data: any = await AsyncStorage.getItem('data');
    setUserData(JSON.parse(data)?.reverse());
  };

  const handleDelete = async (ind: number) => {
    const deletedData = userData.filter((_, index) => index !== ind);
    setUserData(deletedData);

    try {
      await AsyncStorage.setItem('data', JSON.stringify(deletedData));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{}}>
      <View
        style={{
          borderBlockColor: colors.bgc,
          borderBottomWidth: 1,
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
        }}>
        <TouchableOpacity
          onPress={() => linkTo('/Home')}
          style={{
            backgroundColor: 'black',
            paddingHorizontal: 15,
            borderRadius: 5,
            paddingVertical: 5,
          }}>
          <Text style={{color: 'white', fontSize: 12}}>Back</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: colors.primary, fontWeight: '700'}}>
          Unsync User List
        </Text>
      </View>

      <View style={{margin: 10}}>
        {userData?.length > 0 &&
          userData.map((item: any, index: number) => (
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
                backgroundColor: colors.bgc,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              key={index}>
              <Text style={{color: colors.primary}}>
                {item?.firstName + ' ' + item?.lastName}
              </Text>
              <TouchableOpacity
                onPress={() => handleDelete(index)}
                style={{
                  backgroundColor: 'red',
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  paddingVertical: 3,
                }}>
                <Text style={{color: colors.white, fontSize: 12}}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>

      {(userData?.length <= 0 || !userData) && (
        <View
          style={{
            backgroundColor: colors.bgc,
            width: '90%',
            borderColor: colors.border,
            borderWidth: 1,
            marginTop: 30,
            paddingHorizontal: 30,
            paddingVertical: 50,
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: colors.primary, textAlign: 'center'}}>
            Data Already Synced
          </Text>
        </View>
      )}
    </View>
  );
};

export default UnSyncList;
