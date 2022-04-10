import React from 'react';
import {TouchableOpacity} from 'react-native';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/core';
import {DrawerActions} from '@react-navigation/native';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';

import {useData} from './useData';
import {useTranslation} from './useTranslation';

import {Entypo} from '@expo/vector-icons';
import Image from '../components/Image';
import Text from '../components/Text';
import useTheme from '../hooks/useTheme';
import Button from '../components/Button';
import Block from '../components/Block';
import {useSelector} from 'react-redux';
import {ApplicationState} from '../redux';

export default () => {
  const {t} = useTranslation();
  const {user} = useData();
  const navigation = useNavigation();
  const {icons, colors, gradients, sizes} = useTheme();
  const dataKer = useSelector(
    (state: ApplicationState) => state.KeranjangReducer,
  );
  const menu = {
    headerStyle: {elevation: 0, backgroundColor: colors.primary},
    headerTitleAlign: 'left',
    headerTitleContainerStyle: {marginLeft: -sizes.s},
    headerLeftContainerStyle: {paddingLeft: sizes.s},
    headerRightContainerStyle: {paddingRight: sizes.s},
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({children}) => (
      <Text p white>
        {children}
      </Text>
    ),
    headerLeft: () => (
      <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image source={icons.menu} radius={0} color={colors.white} />
      </Button>
    ),
    headerRight: () => (
      <Block row flex={0} align="center" marginRight={sizes.padding}>
        <TouchableOpacity
          style={{marginRight: sizes.sm}}
          onPress={() =>
            navigation.navigate('Screens', {
              screen: 'Pro',
            })
          }>
          <Image source={icons.bell} radius={0} color={colors.white} />
          <Block
            flex={0}
            right={0}
            width={sizes.s}
            height={sizes.s}
            radius={sizes.xs}
            position="absolute"
            gradient={gradients?.danger}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Screens', {
              screen: 'Keranjang',
            })
          }>
          <Entypo name="shopping-cart" size={24} color={colors.white} />
          <Block
            flex={0}
            padding={0}
            justify="center"
            position="absolute"
            top={-sizes.s}
            right={-sizes.s}
            width={sizes.sm}
            height={sizes.sm}
            radius={sizes.sm / 2}
            gradient={gradients?.danger}>
            <Text white center bold size={10} lineHeight={10} paddingTop={3}>
              {dataKer.count}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    ),
  } as StackHeaderOptions;
  const headerDetail = {
    headerStyle: {elevation: 0, backgroundColor: colors.primary},
    headerTitleAlign: 'left',
    headerTitleContainerStyle: {marginLeft: -sizes.s},
    headerLeftContainerStyle: {paddingLeft: sizes.s},
    headerRightContainerStyle: {paddingRight: sizes.s},
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({children}) => (
      <Text p white>
        {children}
      </Text>
    ),
    headerLeft: () => (
      <Button onPress={() => navigation.goBack()}>
        <Image
          radius={0}
          width={10}
          height={18}
          color={colors.white}
          source={icons.arrow}
          transform={[{rotate: '180deg'}]}
        />
      </Button>
    ),
    headerRight: () => (
      <Block row flex={0} align="center" marginRight={sizes.padding}>
        <TouchableOpacity
          style={{marginRight: sizes.sm}}
          onPress={() =>
            navigation.navigate('Screens', {
              screen: 'Pro',
            })
          }>
          <Image source={icons.bell} radius={0} color={colors.white} />
          <Block
            flex={0}
            right={0}
            width={sizes.s}
            height={sizes.s}
            radius={sizes.xs}
            position="absolute"
            gradient={gradients?.danger}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Screens', {
              screen: 'Keranjang',
            });
          }}>
          <Entypo name="shopping-cart" size={24} color={colors.white} />
          <Block
            flex={0}
            padding={0}
            justify="center"
            position="absolute"
            top={-sizes.s}
            right={-sizes.s}
            width={sizes.sm}
            height={sizes.sm}
            radius={sizes.sm / 2}
            gradient={gradients?.danger}>
            <Text white center bold size={10} lineHeight={10} paddingTop={3}>
              {dataKer.count}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    ),
  } as StackHeaderOptions;

  const options = {
    stack: menu,
    headerDetail: headerDetail,
    components: {
      ...menu,
      headerTitle: () => (
        <Text p white semibold>
          {t('navigation.components')}
        </Text>
      ),
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Image source={icons.menu} radius={0} color={colors.white} />
        </Button>
      ),
    },
    pro: {
      ...menu,
      headerTransparent: true,
      headerTitle: () => (
        <Text p white semibold>
          {t('pro.title')}
        </Text>
      ),
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Image source={icons.menu} radius={0} color={colors.white} />
        </Button>
      ),
    },
    back: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()}>
          <Image
            radius={0}
            width={10}
            height={18}
            color={colors.white}
            source={icons.arrow}
            transform={[{rotate: '180deg'}]}
          />
        </Button>
      ),
    },
    profile: {
      ...menu,
      headerRight: () => (
        <Block row flex={0} align="center" marginRight={sizes.padding}>
          <TouchableOpacity
            style={{marginRight: sizes.sm}}
            onPress={() =>
              navigation.navigate('Screens', {
                screen: 'Notifications',
              })
            }>
            <Image source={icons.bell} radius={0} color={colors.white} />
            <Block
              flex={0}
              right={0}
              width={sizes.s}
              height={sizes.s}
              radius={sizes.xs}
              position="absolute"
              gradient={gradients?.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                DrawerActions.jumpTo('Screens', {screen: 'Profile'}),
              )
            }>
            <Image
              radius={6}
              width={24}
              height={24}
              source={{uri: user.avatar}}
            />
          </TouchableOpacity>
        </Block>
      ),
    },
  };

  return options;
};
