import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Button, Card, Modal, Text} from '@ui-kitten/components';

interface Props {
  visible: boolean;
  loading: boolean;
  setVisible: (visible: boolean) => void;
  handleLogout: () => void;
}

export const LogoutModal = (props: Props): React.ReactElement => {
  const {visible, loading, setVisible, handleLogout} = props;

  return (
    <View>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Text style={styles.text}>Are you sure? </Text>
          <View style={{display: 'flex', flexDirection: 'row', gap: 23}}>
            <Button status="warning">Cancel</Button>
            <Button
              onPress={handleLogout}
              accessoryRight={
                loading ? <ActivityIndicator color={'white'} /> : <></>
              }>
              Sure
            </Button>
          </View>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
