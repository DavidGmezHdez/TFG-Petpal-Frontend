import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {clearErrorUser} from '@redux/user/user_actions';
import {Text} from '@components/TextWrapper';
import {Pressable} from '@components/Pressable';
import {Pet} from '@screens/Pets/components/Pet';
import {IPet} from '@utils/Types';
import {clearErrorPet} from '@redux/pets/pets_actions';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setShowCreatePetModal: Dispatch<SetStateAction<boolean>>;
};

export const PetsProfileModal = ({
  showModal,
  setShowModal,
  setShowCreatePetModal,
}: Props) => {
  const dispatch = useDispatch<any>();
  const pets = useSelector(getUser).pets;

  const cancel = () => {
    dispatch(clearErrorUser());
    setShowModal(false);
  };

  const showAddPetModal = () => {
    dispatch(clearErrorPet());
    setShowCreatePetModal(true);
  };

  return (
    <Modal animationType={'fade'} transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text large>Mis mascotas</Text>
          <ScrollView>
            {pets && pets.length > 0 ? (
              pets.map((pet: IPet) => <Pet key={pet._id} pet={pet} />)
            ) : (
              <Text large>No has añadido ninguna mascota</Text>
            )}
          </ScrollView>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={showAddPetModal}>
            <Text large style={styles.textStyle}>
              Añadir Mascota
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={cancel}>
            <Text large style={styles.textStyle}>
              Cerrar
            </Text>
          </Pressable>
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
    width: '90%',
    height: '90%',
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
