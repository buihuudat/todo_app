import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Input, Button, Text, Icon, IconElement} from '@ui-kitten/components';
import {Logo} from '../resources/images';
import {RootStackParamList} from '../routes';
import {useAppDispatch} from '../redux/hooks';
import {userActions} from '../actions/userActions';
import {StackNavigationProp} from '@react-navigation/stack';

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const AlertIcon = (props: any): IconElement => (
  <Icon {...props} name="alert-circle-outline" />
);

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    await dispatch(userActions.login(data))
      .unwrap()
      .then(() => navigation.navigate('Home'))
      .catch((e: any) => Alert.alert(e?.message))
      .finally(() => setIsLoading(false));
  };

  const handleRegister = () => {
    navigation.navigate('Register');
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
      <Text category="h1">Login</Text>
      <View style={styles.form}>
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
        <Button
          style={{width: '100%'}}
          onPress={handleLogin}
          disabled={data.username === '' || data.password === ''}
          accessoryRight={
            isLoading ? <ActivityIndicator color={'white'} /> : <></>
          }>
          Login
        </Button>
        <Button
          style={{width: '100%'}}
          appearance="ghost"
          onPress={handleRegister}>
          Don't have account? Register now
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

export default LoginScreen;
