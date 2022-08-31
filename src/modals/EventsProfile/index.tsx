import React, {Dispatch, SetStateAction, useState} from 'react';
import {Modal, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {clearErrorUser} from '@redux/user/user_actions';
import {Text} from '@components/TextWrapper';
import {IEvent} from '@utils/Types';
import {ProfileEvent} from './components/ProfileEvent';
import {Pressable} from '@components/Pressable';
import {ConfirmationEventDelete} from '@modals/ConfirmationEventDelete';
import {generalStyles} from '@utils/Styles';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const EventsProfileModal = ({showModal, setShowModal}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const [showModalConfirmation, setShowModalConfirmation] =
    useState<boolean>(false);
  const [eventId, setEventId] = useState<string>('');

  const cancel = () => {
    dispatch(clearErrorUser());
    setShowModal(false);
  };

  return (
    <Modal animationType={'fade'} transparent={true} visible={showModal}>
      <View style={generalStyles.modalBackground}>
        <View style={generalStyles.modalView}>
          <ScrollView>
            {user.hostEvents && user.hostEvents.length > 0 ? (
              user.hostEvents.map((event: IEvent) => (
                <ProfileEvent
                  key={event._id}
                  event={event}
                  setShowModal={setShowModalConfirmation}
                  setSelectedEvent={setEventId}
                />
              ))
            ) : (
              <Text large>No creado ninguna quedada</Text>
            )}
          </ScrollView>
          <Pressable style={generalStyles.cancelPressable} onPress={cancel}>
            <Text large style={generalStyles.textStyle}>
              Cerrar
            </Text>
          </Pressable>
          <ConfirmationEventDelete
            showModal={showModalConfirmation}
            setShowModal={setShowModalConfirmation}
            eventId={eventId}
          />
        </View>
      </View>
    </Modal>
  );
};
