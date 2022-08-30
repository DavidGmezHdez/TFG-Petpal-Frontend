import React, {Dispatch, SetStateAction} from 'react';
import {Modal, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {clearErrorUser} from '@redux/user/user_actions';
import {Text} from '@components/TextWrapper';
import {IEvent} from '@utils/Types';
import {ProfileJoinedEvent} from './components/ProfileJoinedEvent';
import {Pressable} from '@components/Pressable';
import {generalStyles} from '@utils/Styles';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const JoinedEventsProfileModal = ({showModal, setShowModal}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);

  const cancel = () => {
    dispatch(clearErrorUser());
    setShowModal(false);
  };

  return (
    <Modal animationType={'fade'} transparent={true} visible={showModal}>
      <View style={generalStyles.modalBackground}>
        <View style={generalStyles.modalView}>
          <ScrollView>
            {user.attendingEvents && user.attendingEvents.length > 0 ? (
              user.attendingEvents.map((event: IEvent) => (
                <ProfileJoinedEvent key={event._id} event={event} />
              ))
            ) : (
              <Text large center>
                No te has unido a ninguna quedada
              </Text>
            )}
          </ScrollView>
          <Pressable style={generalStyles.cancelPressable} onPress={cancel}>
            <Text large style={generalStyles.textStyle}>
              Cerrar
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
