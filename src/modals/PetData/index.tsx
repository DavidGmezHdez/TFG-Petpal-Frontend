import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPet} from '@utils/Types';
import {Pressable} from '@components/Pressable';
import {CarouselImages} from '@components/Carousel';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  pet: IPet | undefined;
};

export const PetDataModal = ({showModal, setShowModal, pet}: Props) => {
  const widthScreen = Dimensions.get('window').width;
  const cancel = () => {
    setShowModal(false);
  };

  return (
    <Modal animationType={'fade'} transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text large>Nombre protectora: {pet?.protector.name}</Text>
            <Text large>
              Telefono de contacto: {pet?.protector.contactPhone}
            </Text>
            <Text large>Direccion: {pet?.protector.direction}</Text>
            <Text large>Provincia: {pet?.protector.region}</Text>
            <Text large>Imagenes:</Text>
            <CarouselImages
              images={pet?.image ?? []}
              width={200}
              height={200}
            />
          </ScrollView>
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
