import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, View, TextInput, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {clearErrorEvent, deleteEvent} from '@redux/events/events_actions';
import {updateUser} from '@redux/user/user_actions';
import {EventSchema} from './lib';
import {Text} from '@components/TextWrapper';
import {Pressable} from '@components/Pressable';
import {px} from '@utils/Constants';
import {getMessageEvents} from '@redux/events/events_reducer';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  eventId: string;
};

type eventDeleteTypes = {
  reason: string;
};

export const ConfirmationEventDelete = ({
  showModal,
  setShowModal,
  eventId,
}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const eventsMessage = useSelector(getMessageEvents);

  const initialValues: eventDeleteTypes = {
    reason: '',
  };

  const handleSendDelete = async (values: eventDeleteTypes) => {
    try {
      const deletedEvent = await dispatch(deleteEvent(eventId, values.reason));
      if (deletedEvent) {
        const hostEvents = [...(user.hostEvents ?? []), deletedEvent._id];
        await dispatch(updateUser(user._id, {hostEvents}, user.rol));
        setShowModal(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const cancel = () => {
    setShowModal(false);
    dispatch(clearErrorEvent());
  };

  return (
    <Modal animationType={'fade'} transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <ScrollView>
          <View style={styles.modalView}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSendDelete}
              validationSchema={EventSchema}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.centeredViewForm}>
                  <TextInput
                    onChangeText={handleChange('reason')}
                    onBlur={handleBlur('reason')}
                    value={values.reason}
                    placeholder={
                      'Describe la razón por la que deseas cancelar el evento'
                    }
                    multiline={true}
                    numberOfLines={4}
                    maxLength={50}
                    style={styles.textInput}
                  />
                  {errors.reason && touched.reason ? (
                    <Text large color={'red'}>
                      {errors.reason}
                    </Text>
                  ) : null}

                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => handleSubmit()}>
                    <Text large style={styles.textStyle}>
                      Borrar Quedada
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={cancel}>
                    <Text large style={styles.textStyle}>
                      Cancelar
                    </Text>
                  </Pressable>

                  {eventsMessage ? (
                    <Text large color={'red'}>
                      {eventsMessage}
                    </Text>
                  ) : null}
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    width: 1000 * px,
    height: 1500 * px,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredViewForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-around',
    height: '50%',
    width: '100%',
    padding: '2%',
  },
  textInput: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 2,
    textAlign: 'center',
    width: '100%',
    padding: 20 * px,
    marginBottom: 10,
  },
});
