import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Config from 'react-native-config';
import {persistor} from '@redux/store';
type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'welcome'>;

type WelcomeScreenProps = {
  navigation: NavigationStackProp['navigation'];
};

export const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text xxlarge>¡Bienvenido/a!</Text>
      <Text large>
        Esta aplicación es un nexo para personas y protectoras para poder
        facilitar la adopción y compartir tu experiencia con otra gente, hasta
        poder quedar juntos en eventos
      </Text>
      <Text large>
        Visita la pestaña de mascotas, busca aquella que te guste más y ponte en
        contacto con la protectora para adoptarla. Puedes ver todas las fotos
        haciendo click en el botón de "Ver contacto"
      </Text>
      <Text large>
        Sube posts con fotos al tablón para mostrar a la gente tu nueva mascota
        o crea/únete a eventos de todo el país para disfrutar con gente (tenga
        en cuenta que una vez registrado e iniciado sesión está sujeto a las
        reglas de comportamiento)
      </Text>
      <TouchableOpacity
        onPress={() => {
          persistor.purge();
        }}>
        <Text xxlarge>Purge</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('login');
        }}>
        <Text xxlarge>¡Quiero entrar!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
