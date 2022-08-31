import React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {useDispatch} from 'react-redux';
import {logout} from '@redux/user/user_actions';
import {Pressable} from '@components/Pressable';
import {Text} from '@components/TextWrapper';
import {generalStyles} from '@utils/Styles';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'feed'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const ProfileAdmin = ({navigation}: Props) => {
  const dispatch = useDispatch<any>();

  const _handleLogout = () => {
    dispatch(logout());
    navigation.navigate('login');
  };

  return (
    <View style={generalStyles.centeredViewForm}>
      <Pressable style={generalStyles.cancelPressable} onPress={_handleLogout}>
        <Text large style={generalStyles.textStyle}>
          Cerrar Sesión
        </Text>
      </Pressable>
    </View>
  );
};
