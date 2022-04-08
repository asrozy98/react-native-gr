import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Linking, StyleSheet} from 'react-native';

import {
  useDrawerStatus,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Screens from './Screens';
import {Block, Text, Switch, Button, Image} from '../components';
import {useData, useTheme, useTranslation} from '../hooks';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState, onLogout, onRestoreToken} from '../redux';
import {DrawerActions} from '@react-navigation/native';

import {MaterialIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
/* drawer menu screens navigation */
const ScreensStack = () => {
  const {colors} = useTheme();
  const isDrawerOpen = useDrawerStatus() === 'open';
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{scale: scale}],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 100,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.primary,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}>
      <Screens />
    </Animated.View>
  );
};

/* custom drawer menu */
const DrawerContent = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: ApplicationState) => state.AuthReducer);
  const {navigation} = props;
  const {t} = useTranslation();
  const {isDark, handleIsDark} = useData();
  const [active, setActive] = useState('Home');
  const {assets, colors, gradients, sizes} = useTheme();
  const labelColor = colors.text;
  const handleNavigation = useCallback(
    (to) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive],
  );

  // screen list for Drawer menu
  const authScreens = [
    {name: t('screens.home'), to: 'Home', icon: assets.home},
    {name: t('screens.category'), to: 'Kategori', icon: assets.logo},
    {name: t('screens.components'), to: 'Components', icon: assets.components},
    {name: t('screens.articles'), to: 'Articles', icon: assets.document},
    {name: t('screens.rental'), to: 'Pro', icon: assets.rental},
    {name: t('screens.profile'), to: 'Profile', icon: assets.profile},
    {name: t('screens.settings'), to: 'Pro', icon: assets.settings},
    {name: t('screens.extra'), to: 'Pro', icon: assets.extras},
  ];
  const guestScreens = [
    {name: t('screens.register'), to: 'Register', icon: 'app-registration'},
    {name: t('screens.login'), to: 'Login', icon: 'login'},
  ];
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('@token-set');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };
  // const storeToken = async () => {
  //   try {
  //     await AsyncStorage.setItem('@token-set', JSON.stringify(auth.token));
  //     console.log('set token', auth.token);
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };
  // useEffect(() => {
  //   storeToken();
  // }, [auth.token]);

  const logOut = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
    dispatch(onLogout());
    removeToken();
  };

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{paddingBottom: sizes.padding}}>
      <Block paddingHorizontal={sizes.padding}>
        <Block flex={0} row align="center" marginBottom={sizes.l}>
          <Image
            radius={0}
            width={33}
            height={33}
            color={colors.text}
            source={assets.logo}
            marginRight={sizes.sm}
          />
          <Block>
            <Text size={12} semibold>
              {t('app.name')}
            </Text>
            <Text size={12} semibold>
              {t('app.native')}
            </Text>
          </Block>
        </Block>
        {auth.isLogin == true &&
          auth.token != null &&
          authScreens?.map((screen, index) => {
            const isActive = active === screen.to;
            return (
              <Button
                row
                justify="flex-start"
                marginBottom={sizes.s}
                key={`menu-screen-${screen.name}-${index}`}
                onPress={() => handleNavigation(screen.to)}>
                <Block
                  flex={0}
                  radius={6}
                  align="center"
                  justify="center"
                  width={sizes.md}
                  height={sizes.md}
                  marginRight={sizes.s}
                  gradient={gradients[isActive ? 'primary' : 'white']}>
                  <Image
                    radius={0}
                    width={14}
                    height={14}
                    source={screen.icon}
                    color={colors[isActive ? 'white' : 'black']}
                  />
                </Block>
                <Text p semibold={isActive} color={labelColor}>
                  {screen.name}
                </Text>
              </Button>
            );
          })}
        <Block
          flex={0}
          height={1}
          marginRight={sizes.md}
          marginVertical={sizes.sm}
          gradient={gradients.menu}
        />
        {auth.isLogin == true && auth.token != null ? (
          <Button
            row
            justify="flex-start"
            marginTop={sizes.sm}
            marginBottom={sizes.s}
            onPress={logOut}>
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              width={sizes.md}
              height={sizes.md}
              marginRight={sizes.s}
              gradient={gradients.white}>
              <Image
                radius={0}
                width={14}
                height={14}
                color={colors.black}
                source={assets.documentation}
              />
            </Block>
            <Text p color={labelColor}>
              {t('menu.logout')}
            </Text>
          </Button>
        ) : (
          guestScreens?.map((screen, index) => {
            const isActive = active === screen.to;
            return (
              <Button
                row
                justify="flex-start"
                marginBottom={sizes.s}
                key={`menu-screen-${screen.name}-${index}`}
                onPress={() => handleNavigation(screen.to)}>
                <Block
                  flex={0}
                  radius={6}
                  align="center"
                  justify="center"
                  width={sizes.md}
                  height={sizes.md}
                  marginRight={sizes.s}
                  gradient={gradients[isActive ? 'primary' : 'white']}>
                  <MaterialIcons
                    name={screen.icon}
                    size={24}
                    color={colors[isActive ? 'white' : 'black']}
                  />
                </Block>
                <Text p semibold={isActive} color={labelColor}>
                  {screen.name}
                </Text>
              </Button>
            );
          })
        )}
        <Block row justify="space-between" marginTop={sizes.sm}>
          <Text color={labelColor}>{t('darkMode')}</Text>
          <Switch
            checked={isDark}
            onPress={(checked) => {
              handleIsDark(checked);
            }}
          />
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
};

/* drawer menu navigation */
export default () => {
  const {gradients} = useTheme();
  const {isDark} = useData();

  return (
    <Block gradient={gradients[isDark ? 'dark' : 'light']}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: {
            flex: 1,
            width: '50%',
            borderRightWidth: 0,
            backgroundColor: 'transparent',
          },
          sceneContainerStyle: {backgroundColor: 'transparent'},
        }}
        drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Screens" component={ScreensStack} />
      </Drawer.Navigator>
    </Block>
  );
};
