import React, {useState} from 'react';
import {StyleSheet, View, TextInput, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {getMessageEvents} from '@redux/events/events_reducer';
import {clearErrorEvent, sendEvent} from '@redux/events/events_actions';
import {updateUser} from '@redux/user/user_actions';
import {EventSchema} from './lib';
import {Text} from '@components/TextWrapper';
import {Pressable} from '@components/Pressable';
import {provinces, px} from '@utils/Constants';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {generalStyles, pickerSelectStyles} from '@utils/Styles';
import {colors} from '@utils/Colors';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'createPets'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

type eventValuesTypes = {
  title: string;
  description: string;
  price: string;
  place: string;
  date: Date | null;
  image: string;
  region: string;
};

export const CreateEvent = ({navigation}: Props) => {
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
    region: '',
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
        region: values.region,
      };

      const createdEvent = await dispatch(sendEvent(event));
      if (createdEvent) {
        const hostEvents = [...(user.hostEvents ?? []), createdEvent._id];
        await dispatch(updateUser(user._id, {hostEvents}, user.rol));
        navigation.navigate('tabs_navigator');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const cancel = () => {
    navigation.navigate('tabs_navigator');
    dispatch(clearErrorEvent());
  };

  return (
    <View style={styles.centeredView}>
      <ScrollView
        contentContainerStyle={generalStyles.scrollViewStyles}
        showsVerticalScrollIndicator={false}>
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
            <View style={generalStyles.centeredViewForm}>
              <TextInput
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                placeholder={'Titulo'}
                maxLength={20}
                style={styles.textInput}
              />
              {errors.title && touched.title ? (
                <Text large center style={generalStyles.textError}>
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
                style={styles.textInputDescription}
              />
              {errors.description && touched.description ? (
                <Text large center style={generalStyles.textError}>
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
                <Text large center style={generalStyles.textError}>
                  {errors.price}
                </Text>
              ) : null}

              <TextInput
                onChangeText={handleChange('place')}
                onBlur={handleBlur('place')}
                value={values.place}
                placeholder={'Lugar'}
                maxLength={60}
                style={styles.textInput}
              />
              {errors.place && touched.place ? (
                <Text large center style={generalStyles.textError}>
                  {errors.place}
                </Text>
              ) : null}

              {values.date ? (
                <Text large center>
                  {format(values.date, 'dd-MM-yy hh:mm')}
                </Text>
              ) : null}

              <Pressable
                style={generalStyles.imagePressable}
                onPress={() => setOpen(true)}>
                <Text large style={generalStyles.textStyle}>
                  Seleccionar Día y Hora
                </Text>
              </Pressable>
              {errors.date && touched.date ? (
                <Text large center style={generalStyles.textError}>
                  {errors.date}
                </Text>
              ) : null}
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
              <Text large>Provincia</Text>
              <RNPickerSelect
                onValueChange={(value: string) =>
                  setFieldValue('region', value)
                }
                items={provinces}
                placeholder={{label: 'Cualquier provincia', value: null}}
                value={values.region}
                style={pickerSelectStyles}
              />
              {errors.region && touched.region ? (
                <Text large center style={generalStyles.textError}>
                  {errors.region}
                </Text>
              ) : null}
              <Pressable
                style={generalStyles.mainPressable}
                onPress={() => handleSubmit()}>
                <Text large style={generalStyles.textStyle}>
                  Crear Quedada
                </Text>
              </Pressable>
              <Pressable style={generalStyles.cancelPressable} onPress={cancel}>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    width: 800 * px,
    backgroundColor: colors.white,
    margin: '2%',
    padding: '2%',
    borderRadius: 8,
    borderColor: colors.primary,
    borderWidth: 2,
    fontSize: 48 * px,
  },
  textInputDescription: {
    textAlignVertical: 'top',
    borderRadius: 8,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 2,
    fontSize: 48 * px,
    width: 800 * px,
    height: 100,
    padding: 10,
    marginBottom: 10,
  },
});
