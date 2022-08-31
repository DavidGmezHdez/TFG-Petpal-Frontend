import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, View, ScrollView} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPet} from '@utils/Types';
import {Pressable} from '@components/Pressable';
import {CarouselImages} from '@components/Carousel';
import {generalStyles} from '@utils/Styles';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  pet: IPet | undefined;
};

export const PetDataModal = ({showModal, setShowModal, pet}: Props) => {
  const cancel = () => {
    setShowModal(false);
  };

  return (
    <Modal animationType={'fade'} transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={{...generalStyles.modalView, height: '70%'}}>
          <ScrollView>
            <Text xlarge>Nombre protectora: {pet?.protector.name}</Text>
            <Text xlarge>
              Telefono de contacto: {pet?.protector.contactPhone}
            </Text>
            <Text xlarge>Direccion: {pet?.protector.direction}</Text>
            <Text xlarge>Provincia: {pet?.protector.region}</Text>
            <Text xlarge>Imagenes:</Text>
            <CarouselImages
              images={pet?.image ?? []}
              width={200}
              height={200}
            />
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
