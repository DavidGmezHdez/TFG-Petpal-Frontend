import React, {Dispatch, SetStateAction} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {getUser} from '@redux/user/user_reducer';
import {clearErrorEvent} from '@redux/events/events_actions';
import {updateUser} from '@redux/user/user_actions';
import {sendPet} from '@redux/pets/pets_actions';
import {getMessagePets} from '@redux/pets/pets_reducer';
import {initialValues, PetSchema, petValuesTypes} from './lib';
import {Text} from '@components/TextWrapper';
import {Pressable} from '@components/Pressable';
import {px, sexs, sizes, types} from '@utils/Constants';

import {getRaces} from '@utils/Helpers';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const options: ImageLibraryOptions = {
  mediaType: 'photo',
  selectionLimit: 1,
};

export const CreatePetModal = ({showModal, setShowModal}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const petsMessage = useSelector(getMessagePets);

  const _handleSubmit = async (values: petValuesTypes) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('protector', user._id);
      formData.append('type', values.type);
      formData.append('age', values.age);
      formData.append('race', values.race);
      formData.append('region', user.region);
      formData.append('size', values.size);
      formData.append('sex', values.sex);

      if (values.imageUri) {
        formData.append('image', {
          // @ts-ignore: Type error
          uri: values.imageUri,
          type: values.imageType,
          name: values.name,
        });
      }

      const createdPet = await dispatch(sendPet(formData));
      if (createdPet) {
        const pets = [...(user.pets ?? []), createdPet._id];
        await dispatch(updateUser(user._id, {pets}, user.rol));
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

  // TODO: Fix  keyboard scroll

  return (
    <Modal animationType={'fade'} transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Formik
            initialValues={initialValues}
            onSubmit={_handleSubmit}
            validationSchema={PetSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <KeyboardAvoidingView>
                <View style={styles.centeredViewForm}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    // eslint-disable-next-line react-native/no-inline-styles
                    contentContainerStyle={{
                      flexGrow: 1,
                      justifyContent: 'center',
                      width: 870 * px,
                    }}>
                    <TextInput
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      placeholder={'Nombre'}
                      maxLength={20}
                      style={styles.textInput}
                    />
                    {errors.name && touched.name ? (
                      <Text large color={'red'}>
                        {errors.name}
                      </Text>
                    ) : null}

                    <RNPickerSelect
                      onValueChange={value => setFieldValue('sex', value)}
                      items={sexs}
                      placeholder={{label: 'Selecciona sexo', value: null}}
                      value={values.sex}
                    />

                    {errors.sex && touched.sex ? (
                      <Text large color={'red'}>
                        {errors.sex}
                      </Text>
                    ) : null}

                    <TextInput
                      onChangeText={handleChange('age')}
                      onBlur={handleBlur('age')}
                      value={values.age}
                      placeholder={'Edad'}
                      maxLength={2}
                      keyboardType="numeric"
                      style={styles.textInput}
                    />
                    {errors.age && touched.age ? (
                      <Text large color={'red'}>
                        {errors.age}
                      </Text>
                    ) : null}

                    <RNPickerSelect
                      onValueChange={value => setFieldValue('type', value)}
                      items={types}
                      placeholder={{label: 'Selecciona tipo', value: null}}
                      value={values.type}
                    />

                    {errors.type && touched.type ? (
                      <Text large color={'red'}>
                        {errors.type}
                      </Text>
                    ) : null}

                    {values.type === 'Perro' || values.type === 'Gato' ? (
                      <>
                        <RNPickerSelect
                          onValueChange={value => setFieldValue('race', value)}
                          items={getRaces(values.type)}
                          placeholder={{
                            label: 'Selecciona raza',
                            value: null,
                          }}
                          value={values.race}
                        />
                        {errors.race && touched.race ? (
                          <Text large color={'red'}>
                            {errors.race}
                          </Text>
                        ) : null}
                      </>
                    ) : null}

                    <RNPickerSelect
                      onValueChange={value => setFieldValue('size', value)}
                      items={sizes}
                      placeholder={{label: 'Selecciona tamaño', value: null}}
                      value={values.size}
                    />

                    {errors.size && touched.size ? (
                      <Text large color={'red'}>
                        {errors.size}
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

                    <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={async () => {
                        const {assets} = await launchImageLibrary(options);
                        setFieldValue('imageUri', assets![0].uri);
                        setFieldValue('imageType', assets![0].type);
                        setFieldValue('imageName', assets![0].fileName);
                        console.log(values);
                        console.log(assets);
                      }}>
                      <Text large style={styles.textStyle}>
                        Subir Foto
                      </Text>
                    </Pressable>

                    {values.imageUri.length ? (
                      <Image
                        source={{uri: values.imageUri}}
                        style={styles.images}
                      />
                    ) : null}

                    <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={() => handleSubmit()}>
                      <Text large style={styles.textStyle}>
                        Crear Mascota
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={cancel}>
                      <Text large style={styles.textStyle}>
                        Cancelar
                      </Text>
                    </Pressable>

                    {petsMessage ? (
                      <Text large color={'red'}>
                        {petsMessage}
                      </Text>
                    ) : null}
                  </ScrollView>
                </View>
              </KeyboardAvoidingView>
            )}
          </Formik>
        </View>
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
  images: {
    width: 200 * px,
    height: 200 * px,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
});
