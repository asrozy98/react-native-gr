import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';
import {
  ApplicationState,
  onLoading,
  onLogin,
  onRestoreToken,
  onSetFormLogin,
} from '../redux';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isAndroid = Platform.OS === 'android';

interface ILogin {
  email: string;
  password: string;
}
interface ILoginValidation {
  email: boolean;
  password: boolean;
}

const Login = () => {
  const {isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {form, isLogin, token, error, loading} = useSelector(
    (state: ApplicationState) => state.AuthReducer,
  );
  // const {access_token} = user;

  const [isValid, setIsValid] = useState<ILoginValidation>({
    email: false,
    password: false,
  });

  const restoreToken = async () => {
    // setTimeout(async () => {
    try {
      const token = await AsyncStorage.getItem('@token-set');
      if (token !== null) {
        // value previously stored
        dispatch(onRestoreToken(JSON.parse(token)));
        // navigation.navigate('Home');
      }
    } catch (error) {
      console.warn(error);
      console.log(error);
    }
    // }, 1000);
  };

  const {assets, colors, gradients, sizes} = useTheme();

  const handleChange = (value, inputType) => {
    // console.log(form, isLogin);
    dispatch(onSetFormLogin(value, inputType));
  };

  const handleLogin = () => {
    // if (!Object.values(isValid).includes(false)) {
    //   /** send/save registratin data */
    //   console.log('handleSignUp', registration);
    // }
    dispatch(onLoading());
    dispatch(onLogin(form.email, form.password));
  };

  useEffect(() => {
    restoreToken();
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(form.email),
      password: regex.password.test(form.password),
      // agreed: login.agreed,
    }));
  }, [form, setIsValid]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0}}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.background}
            height={sizes.height * 0.3}>
            {/* <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p white marginLeft={sizes.s}>
                {t('common.goBack')}
              </Text>
            </Button> */}

            <Text h4 center white marginBottom={sizes.md}>
              {t('login.title')}
            </Text>
          </Image>
        </Block>
        {/* login form */}
        <Block
          keyboard
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.2 - sizes.l)}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              <Text p semibold center>
                {t('login.subtitle')}
              </Text>
              {/* social buttons */}
              <Block row center justify="space-evenly" marginVertical={sizes.m}>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.facebook}
                    height={sizes.m}
                    width={sizes.m}
                    color={colors.primary}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.apple}
                    height={sizes.m}
                    width={sizes.m}
                    color={colors.primary}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.google}
                    height={sizes.m}
                    width={sizes.m}
                    color={colors.primary}
                  />
                </Button>
              </Block>
              <Block
                row
                flex={0}
                align="center"
                justify="center"
                marginBottom={sizes.sm}
                paddingHorizontal={sizes.xxl}>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[1, 0]}
                  start={[0, 1]}
                  gradient={gradients.divider}
                />
                <Text center marginHorizontal={sizes.s}>
                  {t('common.or')}
                </Text>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[0, 1]}
                  start={[1, 0]}
                  gradient={gradients.divider}
                />
              </Block>
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.email')}
                  keyboardType="email-address"
                  placeholder={t('common.emailPlaceholder')}
                  success={Boolean(form.email && isValid.email)}
                  danger={Boolean(form.email && !isValid.email)}
                  onChangeText={(value) => handleChange(value, 'email')}
                  value={form.email}
                />
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.password')}
                  placeholder={t('common.passwordPlaceholder')}
                  onChangeText={(value) => handleChange(value, 'password')}
                  value={form.password}
                  success={Boolean(form.password && isValid.password)}
                  danger={Boolean(form.password && !isValid.password)}
                />
              </Block>
              {/* checkbox terms */}
              {loading ? (
                <ActivityIndicator
                  size="large"
                  style={{flex: 1, justifyContent: 'center'}}
                  color={colors.primary}
                />
              ) : (
                <>
                  <Button
                    onPress={handleLogin}
                    gradient={gradients.primary}
                    outlined
                    shadow={!isAndroid}
                    marginVertical={sizes.s}
                    marginHorizontal={sizes.sm}>
                    <Text bold white transform="uppercase">
                      {t('common.signin')}
                    </Text>
                  </Button>
                  <Button
                    marginVertical={sizes.s}
                    marginHorizontal={sizes.sm}
                    color={colors.secondary}
                    onPress={() => {
                      navigation.navigate('Screens', {
                        screen: 'Register',
                      });
                    }}>
                    <Text bold white transform="uppercase">
                      {t('common.signup')}
                    </Text>
                  </Button>
                </>
              )}
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Login;
