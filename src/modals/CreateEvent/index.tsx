import React, {Dispatch, SetStateAction, useState} from 'react';
import {Modal, StyleSheet, View, TextInput, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {getMessageEvents} from '@redux/events/events_reducer';
import {clearErrorEvent, sendEvent} from '@redux/events/events_actions';
import {updateUser} from '@redux/user/user_actions';
import {EventSchema} from './lib';
import {Text} from '@components/TextWrapper';
import {Pressable} from '@components/Pressable';
import {px} from '@utils/Constants';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

type eventValuesTypes = {
  title: string;
  description: string;
  price: string;
  place: string;
  date: Date | null;
  image: string;
};

export const CreateEventModal = ({showModal, setShowModal}: Props) => {
  const dispatch = useDispatch<any>();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const user = useSelector(getUser);
  const eventsMessage = useSelector(getMessageEvents);

  const initialValues: eventValuesTypes = {
    title: '',
    description: '',
    price: '',
    place: '',
    date: null,
    image: '',
  };

  const _handleSubmit = async (values: eventValuesTypes) => {
    try {
      const event = {
        title: values.title,
        description: values.description,
        host: user._id,
        price: values.price,
        place: values.place,
        date: values.date,
        image: values.image,
      };

      const createdEvent = await dispatch(sendEvent(event));
      if (createdEvent) {
        const hostEvents = [...(user.hostEvents ?? []), createdEvent._id];
        await dispatch(updateUser(user._id, {hostEvents}));
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
              onSubmit={_handleSubmit}
              validationSchema={EventSchema}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.centeredViewForm}>
                  <TextInput
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                    placeholder={'Titulo'}
                    maxLength={20}
                    style={styles.textInput}
                  />
                  {errors.title && touched.title ? (
                    <Text large color={'red'}>
                      {errors.title}
                    </Text>
                  ) : null}

                  <TextInput
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    placeholder={'Descripcion'}
                    multiline={true}
                    numberOfLines={4}
                    maxLength={300}
                    style={styles.textInput}
                  />
                  {errors.description && touched.description ? (
                    <Text large color={'red'}>
                      {errors.description}
                    </Text>
                  ) : null}

                  <TextInput
                    onChangeText={handleChange('price')}
                    value={values.price}
                    keyboardType="numeric"
                    placeholder={'Precio'}
                    style={styles.textInput}
                    maxLength={3}
                  />
                  {errors.price && touched.price ? (
                    <Text large color={'red'}>
                      {errors.price}
                    </Text>
                  ) : null}

                  <TextInput
                    onChangeText={handleChange('place')}
                    onBlur={handleBlur('place')}
                    value={values.place}
                    placeholder={'Lugar'}
                    maxLength={20}
                    style={styles.textInput}
                  />
                  {errors.place && touched.place ? (
                    <Text large color={'red'}>
                      {errors.place}
                    </Text>
                  ) : null}

                  {values.date ? (
                    <Text large>{format(values.date, 'dd-MM-yy hh:mm')}</Text>
                  ) : null}
                  {errors.date && touched.date ? (
                    <Text large color={'red'}>
                      {errors.date}
                    </Text>
                  ) : null}
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setOpen(true)}>
                    <Text large style={styles.textStyle}>
                      Seleccionar Día y Hora
                    </Text>
                  </Pressable>
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    locale={'es'}
                    onConfirm={(dat: Date) => {
                      setOpen(false);
                      setDate(dat);
                      setFieldValue('date', dat, true);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                    is24hourSource={'locale'}
                  />

                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => handleSubmit()}>
                    <Text large style={styles.textStyle}>
                      Crear Quedada
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
