import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Input, Button, Text, Icon} from '@ui-kitten/components';
import {Logo} from '../resources/images';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes';
import {useAppDispatch} from '../redux/hooks';
import {StackNavigationProp} from '@react-navigation/stack';
import {userActions} from '../actions/userActions';

const initialData = {
  fullname: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const isValidEmail = (email: string) => {
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  return emailRegex.test(email);
};

type RegisterScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
};

const RegisterScreen = ({navigation}: RegisterScreenProps) => {
  const [data, setData] = useState(initialData);
  const [errorText, setErrorText] = useState(initialData);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    setData(initialData);
    setErrorText(initialData);
    navigation.navigate('Login');
  };

  const handleRegister = async () => {
    let error = false;
    if (data.fullname.length < 3) {
      setErrorText(prev => ({
        ...prev,
        fullname: 'Should fullname at least 3 symbols',
      }));
      error = true;
    }
    if (data.username.length < 6) {
      setErrorText(prev => ({
        ...prev,
        username: 'Should username at least 6 symbols',
      }));
      error = true;
    }
    if (!isValidEmail(data.email)) {
      setErrorText(prev => ({
        ...prev,
        email: 'Invalid email format',
      }));
      error = true;
    }
    if (data.password.length < 8) {
      setErrorText(prev => ({
        ...prev,
        password: 'Should password at least 8 symbols',
      }));
      error = true;
    }
    if (data.password !== data.confirmPassword) {
      setErrorText(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match',
      }));
      error = true;
    }

    if (error) return;
    setErrorText(initialData);
    setIsLoading(true);

    await dispatch(userActions.register(data))
      .unwrap()
      .then(() => navigation.navigate('Home'))
      .catch((e: any) => Alert.alert(e?.message))
      .finally(() => setIsLoading(false));
  };

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = (text: string): React.ReactElement => {
    return text !== '' ? (
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>{text}</Text>
      </View>
    ) : (
      <></>
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
          caption={renderCaption(errorText.fullname)}
          status={errorText.fullname !== '' ? 'danger' : 'basic'}
          keyboardType="default"
          value={data.fullname}
          onChangeText={fullname => setData(prev => ({...prev, fullname}))}
        />
        <Input
          label="Email"
          placeholder="Enter your email"
          caption={renderCaption(errorText.email)}
          status={errorText.email !== '' ? 'danger' : 'basic'}
          value={data.email}
          keyboardType="email-address"
          onChangeText={email => setData(prev => ({...prev, email}))}
        />
        <Input
          label="Username"
          placeholder="Enter your username"
          value={data.username}
          status={errorText.username !== '' ? 'danger' : 'basic'}
          caption={renderCaption(errorText.username)}
          onChangeText={username => setData(prev => ({...prev, username}))}
        />
        <Input
          value={data.password}
          label="Password"
          placeholder="Enter your password... "
          caption={renderCaption(errorText.password)}
          status={errorText.password !== '' ? 'danger' : 'basic'}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={password => setData(prev => ({...prev, password}))}
        />
        <Input
          value={data.confirmPassword}
          label="Confirm Password"
          placeholder="Enter confirm password..."
          caption={renderCaption(errorText.confirmPassword)}
          status={errorText.confirmPassword !== '' ? 'danger' : 'basic'}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={confirmPassword =>
            setData(prev => ({...prev, confirmPassword}))
          }
        />
        <Button
          style={{width: '100%'}}
          onPress={handleRegister}
          accessoryRight={
            isLoading ? <ActivityIndicator color={'white'} /> : <></>
          }>
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
    color: 'red',
  },
});

export default RegisterScreen;
