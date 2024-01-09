import React from 'react';
import {PermissionsAndroid, Text, View} from 'react-native';
import {DownloadDirectoryPath, writeFile} from 'react-native-fs';
import {urid} from 'urid';
import XLSX from 'xlsx';
import Button from '../../components/shared/button/Button';

const Permission = () => {
  // * Example CSV Data
  const exampleCSVData = [
    {
      ExpenseType: 'Travel - International - Sole Trader',
      Amount: 50,
      Description: 'Expense Description',
      CreateTime: '2023-11-24T16:58:04.861Z',
      Note: 'Make sure you have to put valid expense type name and time format , you can remove this column after read',
    },
  ];

  // * Download Example CSV Data
  const exportDataToCsv = () => {
    const urId = urid();
    const downloaded = exampleCSVData || [];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(downloaded);
    XLSX.utils.book_append_sheet(wb, ws, 'User');
    const wbout = XLSX.write(wb, {
      type: 'binary',
      bookType: 'csv',
    });

    writeFile(
      `${DownloadDirectoryPath}/EasyTax-Example-${urId}.csv`,
      wbout,
      'ascii',
    )
      .then(() => {
        console.log('Download Success');
      })
      .catch(err => console.log(err));
  };

  // * Check File Write Permissions
  const downloadCSV = async () => {
    try {
      let isPermitted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitted) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Please grant storage permission to download the CSV file.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.');
          exportDataToCsv();
        } else {
          console.log('Storage Permission Denied.');
          const res = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'Please grant storage permission to download the CSV file.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (res === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage Permission Granted.');
            exportDataToCsv();
          }
        }
      } else {
        exportDataToCsv();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Permission</Text>
      <Button title="Get Write Permission" handleButton={downloadCSV} />
    </View>
  );
};

export default Permission;
