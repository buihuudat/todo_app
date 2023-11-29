import React, {useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Image} from 'react-native';
import {Input, Button, Text, Icon, IconElement} from '@ui-kitten/components';
import {Logo} from '../resources/images';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes';

const AlertIcon = (props: any): IconElement => (
  <Icon {...props} name="alert-circle-outline" />
);

const RegisterScreen = () => {
  const [data, setData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    console.log(data);
  };

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = (): React.ReactElement => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>
          Should contain at least 8 symbols
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={{width: 200, height: 200}} />
      <Text category="h1">Register</Text>
      <View style={styles.form}>
        <Input
          label="Fullname"
          placeholder="Enter your name"
          value={data.fullname}
          onChangeText={fullname => setData(prev => ({...prev, fullname}))}
        />
        <Input
          label="Email"
          placeholder="Enter your email"
          value={data.email}
          onChangeText={email => setData(prev => ({...prev, email}))}
        />
        <Input
          label="Username"
          placeholder="Enter your username"
          value={data.username}
          onChangeText={username => setData(prev => ({...prev, username}))}
        />
        <Input
          value={data.password}
          label="Password"
          placeholder="Enter your password..."
          caption={renderCaption}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={password => setData(prev => ({...prev, password}))}
        />
        <Input
          value={data.confirmPassword}
          label="Confirm Password"
          placeholder="Enter confirm password..."
          caption={renderCaption}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={confirmPassword =>
            setData(prev => ({...prev, confirmPassword}))
          }
        />
        <Button style={{width: '100%'}} onPress={handleRegister}>
          Register
        </Button>
        <Button
          style={{width: '100%'}}
          appearance="ghost"
          onPress={handleLogin}>
          Already have an account? Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '100%',
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'opensans-regular',
    color: '#8F9BB3',
  },
});

export default RegisterScreen;
