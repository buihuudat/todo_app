import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Logo} from '../resources/images';
import {dataStorage} from '../utils/handlers/dataStore';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../routes';
import {useAppDispatch} from '../redux/hooks';
import {userActions} from '../actions/userActions';

type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

const SplashScreen = ({navigation}: SplashScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const userID = await dataStorage.getItem('user');
    if (!userID) {
      navigation.navigate('Login');
    } else {
      await dispatch(userActions.get(userID))
        .unwrap()
        .then(() => {
          navigation.navigate('Home');
        })
        .catch(() => navigation.navigate('Login'));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      setIsLoading(true);
      checkAuth();
    });

    return () => {
      unsubscribeFocus();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.text}>My Todo</Text>

      {isLoading && <ActivityIndicator />}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#88bddd',
  },
  logo: {
    width: 150,
    height: 150,
  },

  text: {
    fontWeight: '700',
    fontSize: 25,
    fontStyle: 'italic',
    paddingTop: 50,
    color: 'white',
  },
});
