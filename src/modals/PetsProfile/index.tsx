import React, {Dispatch, SetStateAction} from 'react';
import {Modal, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {clearErrorUser} from '@redux/user/user_actions';
import {Text} from '@components/TextWrapper';
import {Pressable} from '@components/Pressable';
import {IPet} from '@utils/Types';
import {clearErrorPet} from '@redux/pets/pets_actions';
import {Pet} from './components/Pet';
import {generalStyles} from '@utils/Styles';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  navigateCreatePet: () => void;
};

export const PetsProfileModal = ({
  showModal,
  setShowModal,
  navigateCreatePet,
}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);

  const cancel = () => {
    dispatch(clearErrorUser());
    setShowModal(false);
  };

  const showAddPetModal = () => {
    dispatch(clearErrorPet());
    setShowModal(false);
    navigateCreatePet();
  };

  return (
    <Modal animationType={'fade'} transparent={true} visible={showModal}>
      <View style={generalStyles.modalBackground}>
        <View style={generalStyles.modalView}>
          <ScrollView>
            {user.pets && user.pets.length > 0 ? (
              user.pets.map((pet: IPet) => <Pet key={pet._id} pet={pet} />)
            ) : (
              <Text large center>
                No has añadido ninguna mascota
              </Text>
            )}
          </ScrollView>
          <Pressable
            style={generalStyles.imagePressable}
            onPress={showAddPetModal}>
            <Text large style={generalStyles.textStyle}>
              Añadir Mascota
            </Text>
          </Pressable>
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
