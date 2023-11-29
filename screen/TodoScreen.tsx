import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
  Button,
  List,
  ListItem,
  Icon,
  Radio,
  CheckBox,
} from '@ui-kitten/components';
import {TodoType} from '../types/todoType';
import {AddTodoListModal} from '../components/AddTodoModal';
import moment from 'moment';

const TodoListScreen = ({navigation}: any) => {
  const [visible, setVisible] = useState(false);
  const [todos, setTodos] = useState<TodoType[]>([
    {
      _id: '123',
      title: 'Buy groceries',
      description: 'Go to the supermarket and buy some essentials.',
      completed: false,
      auth: 'John Doe',
      createdAt: '2023-01-01T10:00:00',
    },
    {
      _id: '124',
      title: 'Read a book',
      description: 'Finish reading the latest novel.',
      completed: true,
      auth: 'Jane Doe',
      createdAt: '2023-01-02T15:30:00',
    },
    {
      _id: '125',
      title: 'Go for a run',
      description: 'Jog in the park for at least 30 minutes.',
      completed: false,
      auth: 'Bob Smith',
      createdAt: '2023-01-03T08:45:00',
    },
  ]);

  const addTodo = () => {
    setVisible(true);
  };

  const handleCheck = (id: string) => {};

  const renderItemAccessory = (todo: TodoType) => (
    <CheckBox
      checked={todo.completed}
      onChange={() => handleCheck(todo._id!)}
    />
  );

  const renderItem = ({item}: {item: TodoType}) => (
    <ListItem
      title={item.title}
      description={
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 18,
              color: item.completed ? '#999' : '#000',
              fontStyle: item.completed ? 'italic' : 'normal',
              textDecorationLine: item.completed ? 'line-through' : 'none',
              textDecorationStyle: 'solid',
              textDecorationColor: '#000',
            }}>
            {item.description}
          </Text>
          <Text style={{fontSize: 14, fontStyle: 'italic'}}>
            ({moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')})
          </Text>
        </View>
      }
      accessoryRight={style => renderItemAccessory(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo</Text>
      <List
        style={styles.list}
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.createdAt}
      />
      <Button onPress={addTodo}>Add Todo</Button>
      <AddTodoListModal visible={visible} setVisible={setVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    marginBottom: 16,
  },
});

export default TodoListScreen;
