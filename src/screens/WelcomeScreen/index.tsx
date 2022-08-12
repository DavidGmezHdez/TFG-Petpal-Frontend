import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {colors} from '@utils/Colors';
import {Pressable} from '@components/Pressable';
type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'welcome'>;

type WelcomeScreenProps = {
  navigation: NavigationStackProp['navigation'];
};

export const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text xxxlarge style={styles.welcomeText}>
          ¡Bienvenido/a a PetPal!
        </Text>
      </View>
      <View style={styles.subtextWrap}>
        <Text xlarge center>
          Esta aplicación es un nexo para personas y protectoras para poder
          facilitar la adopción y compartir tu experiencia con otra gente, hasta
          poder quedar juntos en eventos
        </Text>
      </View>
      <View style={styles.subtextWrap}>
        <Text xlarge center>
          Visita la pestaña de mascotas, busca aquella que te guste más y ponte
          en contacto con la protectora para adoptarla.
        </Text>
        <Text xlarge center>
          Puedes ver todas las fotos haciendo click en el botón de "Ver
          contacto"
        </Text>
      </View>

      <View style={styles.subtextWrap}>
        <Text xlarge center>
          Sube posts con fotos al tablón para mostrar a la gente tu nueva
          mascota o crea/únete a eventos de todo el país para disfrutar con
          gente (tenga en cuenta que una vez registrado e iniciado sesión está
          sujeto a las reglas de comportamiento)
        </Text>
      </View>

      <Pressable
        style={styles.welcomePressable}
        onPress={() => {
          navigation.navigate('login');
        }}>
        <Text style={styles.texPressable} xxlarge>
          ¡Quiero entrar!
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.shadowBlue,
    height: '20%',
  },
  welcomeText: {
    textAlign: 'center',
    color: colors.white,
  },
  subtextWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20%',
    padding: '2%',
    textAlign: 'center',
  },
  subtext: {
    textAlign: 'center',
  },
  welcomePressable: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    backgroundColor: colors.springGreen,
  },
  texPressable: {
    color: colors.white,
  },
});
