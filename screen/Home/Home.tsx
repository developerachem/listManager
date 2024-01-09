/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import FW5 from 'react-native-vector-icons/FontAwesome5';
import Input from '../../components/formElement/Input';
import Button from '../../components/shared/button/Button';
import BoxLayout from '../../components/shared/layout/BoxLayout';
import AuthLayout from '../../components/shared/layout/Layout';
import colors from '../../utils/colors';

const Home = ({navigation}: any) => {
  const focus = useIsFocused();

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [netInfo, setNetInfo] = useState(false);
  const [userData, setUserData] = useState([]);
  const [alert, setAlert] = useState(false);

  const handleSubmit = async () => {
    let arrayData = [];
    const data: any = await AsyncStorage.getItem('data');
    const oldData = JSON.parse(data);
    console.log({oldData});

    if (oldData?.length > 0) {
      JSON.parse(data).map((item: any) => {
        arrayData.push(item);
      });
    }
    arrayData.push({
      firstName: fName,
      lastName: lName,
      mobileNumber: phone,
      address: address,
    });

    // console.log('Running');
    if (netInfo === false) {
      console.log('arrayData', arrayData);
      if (fName === '' || lName === '' || phone === '' || address === '') {
        console.log('All Fields are required');
        setAlert(true);
      } else {
        try {
          await AsyncStorage.setItem('data', JSON.stringify(arrayData));
          setFName('');
          setLName('');
          setPhone('');
          setAddress('');
          Toast.show({
            type: 'success',
            text2: 'Data Added successfully',
          });
          setAlert(false);
        } catch (e) {
          console.log(e);
        }
      }
    }
    if (netInfo) {
      const onlineAPI = 'http://202.91.42.198:3962/users-info';
      const formatData = {
        firstName: fName,
        lastName: lName,
        // email: 'john@example.com',
        mobileNumber: phone,
        address: address,
        // dateOfBirth: '1990-01-01',
      };

      if (fName === '' || lName === '' || phone === '' || address === '') {
        console.log('Please enter a name');
        setAlert(true);
      } else {
        let res = await fetch(onlineAPI, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formatData),
        });

        if (res.status === 201) {
          resetData();
          setFName('');
          setLName('');
          setPhone('');
          setAddress('');

          Toast.show({
            type: 'success',
            text2: 'Data Added successfully',
          });
          setAlert(false);
        }
      }
    }
  };

  // * Internet Check
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setNetInfo(state?.isConnected);
    });

    // * Unsubscribe
    return () => {
      unsubscribe();
    };
  }, [netInfo, focus]);

  useEffect(() => {
    autoSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netInfo, focus]);

  const autoSync = async () => {
    if (netInfo && userData?.length > 0) {
      const formateData = {
        users: userData,
      };

      const url = 'http://202.91.42.198:3962/users-info/bulk-add-users';

      let res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formateData),
      });

      if (res.status === 201) {
        resetData();
        Toast.show({
          type: 'success',
          text2: 'Data Sync successfully',
        });
        setAlert(false);
      }
    }
  };

  const resetData = async () => {
    await AsyncStorage.removeItem('data');
  };

  // * Get Data
  useEffect(() => {
    getData();
  }, [netInfo, focus]);

  const getData = async () => {
    const data: any = await AsyncStorage.getItem('data');
    setUserData(JSON.parse(data));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('list')}
        style={{
          position: 'absolute',
          bottom: 15,
          right: 15,
          zIndex: 999,
        }}>
        <Text style={{color: 'green'}}>
          <FW5 name="list-ul" color={colors.primary} size={25} />
        </Text>
      </TouchableOpacity>

      <AuthLayout>
        <BoxLayout>
          <View>
            {alert && (
              <View
                style={{
                  backgroundColor: '#ff000030',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#ff0000', fontSize: 12}}>
                    All Field are required
                  </Text>
                  <TouchableOpacity onPress={() => setAlert(false)}>
                    <Text style={{fontSize: 18, color: 'black'}}>×</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {/* <View style={{marginTop: -10, marginBottom: 5}}>
            <Text
              style={{
                height: 20,
                width: 20,
                backgroundColor: netInfo ? 'green' : 'red',
                borderRadius: 10,
              }}
            />
          </View> */}
            <Input
              title="First Name"
              required
              value={fName}
              handler={(text: any) => setFName(text)}
            />
            <Input
              title="Last Name"
              required
              value={lName}
              handler={(text: any) => setLName(text)}
            />
            <Input
              title="Phone"
              required
              value={phone}
              number
              handler={(text: any) => setPhone(text)}
            />
            <Input
              title="Address"
              required
              value={address}
              handler={(text: any) => setAddress(text)}
            />
            <Button title="Submit" handleButton={handleSubmit} />
          </View>
        </BoxLayout>
      </AuthLayout>
    </>
  );
};

export default Home;
