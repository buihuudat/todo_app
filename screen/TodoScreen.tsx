import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Text, Button, List, ListItem, CheckBox} from '@ui-kitten/components';
import {TodoType} from '../types/todoType';
import {AddTodoListModal} from '../components/AddTodoModal';
import moment from 'moment';
import {Swipeable} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {todoActions} from '../actions/todoActions';
import {dataStorage} from '../utils/handlers/dataStore';
import {RootState} from '../redux/store';

const TodoListScreen = () => {
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const user = useAppSelector((state: RootState) => state.user.user);
  const todos = useAppSelector((state: RootState) => state.todo.todos);

  const sortedTodos = useMemo(() => {
    let currentTodos = [...todos];
    return currentTodos.sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1,
    );
  }, [todos]);

  const dispatch = useAppDispatch();

  const fetchTodos = async () => {
    setRefreshing(true);
    const user = await dataStorage.getItem('user');
    await dispatch(todoActions.getAll(user));
    setRefreshing(false);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = () => {
    setVisible(true);
  };

  const handleRefresh = async () => {
    await fetchTodos();
  };

  const handleCheck = (todo: TodoType) => {
    dispatch(
      todoActions.update({
        todo: {...todo, completed: !todo.completed},
        uid: user?._id!,
      }),
    );
  };

  const handleDelete = (id: string) => {
    dispatch(todoActions.delete(id));
  };

  const renderItemAccessory = (todo: TodoType) => (
    <CheckBox checked={todo.completed} onChange={() => handleCheck(todo)} />
  );

  const renderRightActions = (id: string) => {
    return (
      <TouchableOpacity
        onPress={() => handleDelete(id)}
        style={styles.deleteAction}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}: {item: TodoType}) => (
    <Swipeable renderRightActions={() => renderRightActions(item._id!)}>
      <ListItem
        title={item.title}
        description={
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: item.completed ? 'orange' : '#000',
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
        accessoryRight={() => renderItemAccessory(item)}
      />
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : !todos || !todos?.length ? (
        <Text>You don't have Todo</Text>
      ) : (
        <List
          style={styles.list}
          data={sortedTodos}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          keyExtractor={item => item.createdAt}
        />
      )}
      <Button style={styles.btnAdd} onPress={addTodo}>
        Add Todo
      </Button>
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

  deleteAction: {
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  deleteText: {
    color: 'white',
    fontWeight: '700',
    padding: 5,
    alignItems: 'center',
  },
  btnAdd: {
    marginTop: 'auto',
  },
});

export default TodoListScreen;
