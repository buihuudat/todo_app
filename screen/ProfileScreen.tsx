import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Avatar, Button, Input} from '@ui-kitten/components';
import {UserType} from '../types/userType';

const sampleUser: UserType = {
  email: 'user@example.com',
  username: 'sample_user',
  password: '******',
  fullname: 'Sample User',
  avatar: 'https://placekitten.com/200/200',
};

const ProfileScreen = () => {
  const {email, username, fullname, avatar} = sampleUser;
  const [disable, setDisable] = useState(true);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <Avatar style={styles.avatar} source={{uri: avatar}} />
      <Text style={styles.fullname}>{fullname}</Text>

      <View style={styles.form}>
        <Input
          label={'Fullname'}
          style={styles.input}
          disabled={!edit}
          defaultValue={sampleUser.fullname}
        />
        <Input
          label={'Email'}
          style={styles.input}
          disabled={!edit}
          defaultValue={sampleUser.email}
        />
        <Input
          label={'Username'}
          style={styles.input}
          disabled={!edit}
          defaultValue={sampleUser.username}
        />
        <Input
          label={'Password'}
          style={styles.input}
          disabled={!edit}
          defaultValue={'******'}
        />
        {edit && (
          <Input
            label={'Confirm Password'}
            style={styles.input}
            disabled={!edit}
            defaultValue={'******'}
          />
        )}
        {edit && (
          <Button
            style={{width: 300, margin: 2}}
            appearance="outline"
            status={'success'}
            onPress={handleSubmit}>
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
