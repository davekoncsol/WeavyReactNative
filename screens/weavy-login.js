import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Icon} from 'react-native-elements';

const LoginScreen = props => {
 const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          props.loginWeavy(itemValue);
        }}>
        <Picker.Item label="Dave" value="dave" />
        <Picker.Item label="Mai" value="mai" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
    weavy: {
      flex: 5,
    },
    button: {
      flex: 1,
    },
    picker: {
      flex: 1,
    },
    backgroundStyle: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
    },
  });

export default LoginScreen;
