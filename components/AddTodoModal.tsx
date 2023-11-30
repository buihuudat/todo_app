import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Button, Card, Input, Modal, Text} from '@ui-kitten/components';
import {TodoType} from '../types/todoType';
import {useAppDispatch} from '../redux/hooks';
import {todoActions} from '../actions/todoActions';
import {dataStorage} from '../utils/handlers/dataStore';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const AddTodoListModal = (props: Props): React.ReactElement => {
  const {visible, setVisible} = props;
  const [data, setData] = useState<TodoType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setIsLoading(false);
    setData(null);
    setVisible(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const user = await dataStorage.getItem('user');
    await dispatch(todoActions.create({todo: data!, uid: user}))
      .unwrap()
      .then(() => {
        handleClose();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={handleClose}>
      <Card disabled={true}>
        <Text style={styles.title}>Add Todo</Text>

        <View>
          <Input
            style={styles.input}
            placeholder="Title"
            value={data?.title}
            onChangeText={title => setData({...data!, title})}
          />
          <Input
            style={styles.input}
            placeholder="Description"
            multiline
            numberOfLines={3}
            value={data?.description}
            onChangeText={description => setData({...data!, description})}
          />
        </View>

        <Button
          onPress={handleSubmit}
          accessoryRight={
            isLoading ? <ActivityIndicator color={'white'} /> : <></>
          }
          disabled={
            data?.title === undefined || data?.description === undefined
          }>
          ADD
        </Button>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    minWidth: 300,
  },
});
