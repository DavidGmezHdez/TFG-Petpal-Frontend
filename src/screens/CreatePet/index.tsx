import React from 'react';
import {
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
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {generalStyles, pickerSelectStyles} from '@utils/Styles';
import {colors} from '@utils/Colors';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'createPets'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

const options: ImageLibraryOptions = {
  mediaType: 'photo',
  selectionLimit: 5,
};

export const CreatePetScreen = ({navigation}: Props) => {
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

      if (values.images && values.images.length) {
        values.images.forEach((image: Asset) =>
          formData.append('images', {
            // @ts-ignore: Type error
            uri: image.uri,
            type: image.type ?? 'image/jpeg',
            name: values.name,
          }),
        );
      }

      const createdPet = await dispatch(sendPet(formData));
      if (createdPet) {
        const pets = [...(user.pets ?? []), createdPet._id];
        await dispatch(updateUser(user._id, {pets}, user.rol));
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

  // TODO: Fix  keyboard scroll

  return (
    <View style={styles.centeredView}>
      <ScrollView
        contentContainerStyle={generalStyles.scrollViewStyles}
        showsVerticalScrollIndicator={false}>
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
              <View style={generalStyles.centeredViewForm}>
                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder={'Nombre'}
                  maxLength={20}
                  style={generalStyles.textInput}
                />
                {errors.name && touched.name ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.name}
                  </Text>
                ) : null}

                <RNPickerSelect
                  onValueChange={value => setFieldValue('sex', value)}
                  items={sexs}
                  placeholder={{label: 'Selecciona sexo', value: null}}
                  value={values.sex}
                  style={pickerSelectStyles}
                />

                {errors.sex && touched.sex ? (
                  <Text large center style={generalStyles.textError}>
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
                  style={generalStyles.textInput}
                />
                {errors.age && touched.age ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.age}
                  </Text>
                ) : null}

                <RNPickerSelect
                  onValueChange={value => setFieldValue('type', value)}
                  items={types}
                  placeholder={{label: 'Selecciona tipo', value: null}}
                  value={values.type}
                  style={pickerSelectStyles}
                />

                {errors.type && touched.type ? (
                  <Text large center style={generalStyles.textError}>
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
                      style={pickerSelectStyles}
                    />
                    {errors.race && touched.race ? (
                      <Text large center style={generalStyles.textError}>
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
                  style={pickerSelectStyles}
                />

                {errors.size && touched.size ? (
                  <Text large center style={generalStyles.textError}>
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
                  style={styles.textInputDescription}
                />
                {errors.description && touched.description ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.description}
                  </Text>
                ) : null}

                <Pressable
                  style={generalStyles.imagePressable}
                  onPress={async () => {
                    const {assets} = await launchImageLibrary(options);
                    setFieldValue('images', assets?.reverse());
                  }}>
                  <Text large style={generalStyles.textStyle}>
                    Subir Foto
                  </Text>
                </Pressable>

                {values.images && values.images.length
                  ? values.images.map((image: Asset) => (
                      <Image
                        key={image.id}
                        source={{uri: image.uri}}
                        style={generalStyles.images}
                      />
                    ))
                  : null}

                <Pressable
                  style={generalStyles.mainPressable}
                  onPress={() => handleSubmit()}>
                  <Text large style={generalStyles.textStyle}>
                    Crear Mascota
                  </Text>
                </Pressable>
                <Pressable
                  style={generalStyles.cancelPressable}
                  onPress={cancel}>
                  <Text large style={generalStyles.textStyle}>
                    Cancelar
                  </Text>
                </Pressable>

                {petsMessage ? (
                  <Text large color={'red'}>
                    {petsMessage}
                  </Text>
                ) : null}
              </View>
            </KeyboardAvoidingView>
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
