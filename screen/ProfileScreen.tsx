import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {Text, Avatar, Button, Input} from '@ui-kitten/components';
import {UserType} from '../types/userType';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../routes';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {RootState} from '../redux/store';
import {userActions} from '../actions/userActions';
import {LogoutModal} from '../components/LogoutModal';
import {dataStorage} from '../utils/handlers/dataStore';
import {clearTodosList} from '../redux/slice/todoSlice';
import {removeUser} from '../redux/slice/userSlice';

type ProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const {email, username, fullname, avatar} = user!;
  const [data, setData] = useState<UserType>(user!);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [onLogout, setOnLogout] = useState(false);
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    dispatch(userActions.update(data))
      .unwrap()
      .then(() => {
        setEdit(false);
      })
      .catch(e => Alert.alert(e?.message))
      .finally(() => setIsLoading(false));
  };

  const onShowLogoutModal = () => {
    setVisible(true);
  };

  const handleLogout = async () => {
    setOnLogout(true);

    await dataStorage.removeItem('user').then(() => {
      navigation.navigate('Login');
      // dispatch(clearTodosList());
      // dispatch(removeUser());
    });
    setVisible(false);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Avatar style={styles.avatar} source={{uri: avatar}} />
      <Text style={styles.fullname}>{fullname}</Text>

      <View style={styles.form}>
        <Input
          label={'Fullname'}
          style={styles.input}
          disabled={!edit}
          defaultValue={fullname}
          onChangeText={fullname => setData(prev => ({...prev, fullname}))}
        />
        <Input
          label={'Email'}
          style={styles.input}
          disabled={!edit}
          defaultValue={email}
          onChangeText={email => setData(prev => ({...prev, email}))}
        />
        <Input
          label={'Username'}
          style={styles.input}
          disabled={!edit}
          defaultValue={username}
          onChangeText={username => setData(prev => ({...prev, username}))}
        />
        <Input
          label={'Password'}
          style={styles.input}
          disabled={!edit}
          defaultValue={'******'}
          onChangeText={password => setData(prev => ({...prev, password}))}
        />
        {edit && (
          <Input
            label={'Confirm Password'}
            style={styles.input}
            disabled={!edit}
            defaultValue={'******'}
            onChangeText={confirmPassword =>
              setData(prev => ({...prev, confirmPassword}))
            }
          />
        )}
        {edit && (
          <Button
            style={{width: 300, margin: 2}}
            appearance="outline"
            status={'success'}
            onPress={handleSubmit}
            accessoryRight={
              isLoading ? <ActivityIndicator color={'green'} /> : <></>
            }>
            Submit
          </Button>
        )}
        <Button
          style={{width: 300, margin: 2}}
          appearance="outline"
          status={edit ? 'warning' : 'primary'}
          onPress={handleEdit}>
          {edit ? 'Cancel' : 'Edit Profile'}
        </Button>
      </View>
      <Button
        style={{width: 300, margin: 2}}
        appearance="outline"
        status={'danger'}
        onPress={onShowLogoutModal}>
        Logout
      </Button>

      <LogoutModal
        visible={visible}
        loading={onLogout}
        setVisible={setVisible}
        handleLogout={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  fullname: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '600',
  },
  text: {
    marginBottom: 8,
  },
  form: {
    margin: 10,
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
  },
  input: {
    margin: 2,
  },
});

export default ProfileScreen;
