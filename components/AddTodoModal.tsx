import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Input, Modal, Radio, Text} from '@ui-kitten/components';
import {TodoType} from '../types/todoType';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const AddTodoListModal = (props: Props): React.ReactElement => {
  const {visible, setVisible} = props;
  const [data, setData] = useState<TodoType>();

  const handleSubmit = () => {};

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}>
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

          <Radio
            style={{marginBottom: 16}}
            checked={data?.completed}
            onChange={completed => setData({...data!, completed})}>
            Completed
          </Radio>
        </View>

        <Button onPress={handleSubmit}>ADD</Button>
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
