import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, View, TextInput, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {clearErrorEvent, deleteEventReason} from '@redux/events/events_actions';
import {updateUser} from '@redux/user/user_actions';
import {EventSchema} from './lib';
import {Text} from '@components/TextWrapper';
import {Pressable} from '@components/Pressable';
import {getMessageEvents} from '@redux/events/events_reducer';
import {generalStyles} from '@utils/Styles';

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
      const deletedEvent = await dispatch(
        deleteEventReason(eventId, values.reason),
      );
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
      <View style={generalStyles.modalBackground}>
        <ScrollView
          contentContainerStyle={generalStyles.scrollViewStyles}
          showsVerticalScrollIndicator={false}>
          <View style={generalStyles.modalView}>
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
                <View style={generalStyles.centeredViewForm}>
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
                    <Text large center style={generalStyles.textError}>
                      {errors.reason}
                    </Text>
                  ) : null}

                  <Pressable
                    style={generalStyles.mainPressable}
                    onPress={() => handleSubmit()}>
                    <Text large style={generalStyles.textStyle}>
                      Borrar Quedada
                    </Text>
                  </Pressable>
                  <Pressable
                    style={generalStyles.cancelPressable}
                    onPress={cancel}>
                    <Text large style={generalStyles.textStyle}>
                      Cancelar
                    </Text>
                  </Pressable>

                  {eventsMessage ? (
                    <Text large center style={generalStyles.textError}>
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
  textInput: {
    textAlignVertical: 'top',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 2,
    width: '100%',
    height: 100,
    padding: 10,
    marginBottom: 10,
  },
});
