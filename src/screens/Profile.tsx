import React, {useCallback, useEffect} from 'react';
import {Platform, Linking, FlatList, TouchableOpacity} from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import {ApplicationState, onProfile} from '../redux';
import {useDispatch, useSelector} from 'react-redux';

const isAndroid = Platform.OS === 'android';

const Profile = () => {
  const auth = useSelector((state: ApplicationState) => state.AuthReducer);
  const dispatch = useDispatch();
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, fonts, icons, colors, sizes} = useTheme();

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  useEffect(() => {
    dispatch(onProfile(auth.token));
  }, [auth.data]);

  const handleNavigation = useCallback(
    (to) => {
      navigation.navigate(to);
    },
    [navigation],
  );

  const setting = [
    {
      name: t('navigation.changeProfile'),
      to: 'Register',
      icon: 'account-circle',
    },
    {name: t('navigation.changePassword'), to: 'Register2', icon: 'lock-open'},
    {name: t('navigation.listTransaction'), to: 'Register2', icon: 'file-copy'},
    {name: t('navigation.address'), to: 'Register2', icon: 'edit-location'},
    {name: t('navigation.liveChat'), to: 'Register2', icon: 'chat'},
    {name: t('navigation.privacy'), to: 'Register2', icon: 'privacy-tip'},
    {name: t('navigation.about'), to: 'Register2', icon: 'contact-support'},
    {name: t('navigation.help'), to: 'Register2', icon: 'help-outline'},
  ];

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            source={assets.background}>
            <Button
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
                {t('profile.title')}
              </Text>
            </Button>
            <Block flex={0} align="center">
              <Image
                width={64}
                height={64}
                marginBottom={sizes.sm}
                source={{uri: auth.data?.avatar}}
              />
              <Text h5 center white>
                {auth.data?.name}
              </Text>
              <Text p bold center white>
                {auth.data?.email}
              </Text>

              <Block
                row
                marginVertical={sizes.m}
                // align="center"
                justify="space-evenly"
                width={sizes.width / 1.6}
                height={sizes.xl}>
                {auth.data?.status === 1 && (
                  // <Block
                  //   // shadow={false}
                  //   align="center">
                  // </Block>
                  <Ionicons
                    size={sizes.xl}
                    name="checkmark-circle"
                    color={colors.white}
                  />
                )}
                {auth.data?.premium === 1 && (
                  <Block
                    color={colors.primary}
                    row
                    align="center"
                    justify="space-evenly"
                    radius={sizes.s}
                    marginHorizontal={sizes.m}>
                    <MaterialIcons
                      name="stars"
                      size={24}
                      color={colors.white}
                    />
                    <Text white bold transform="uppercase">
                      Premium
                    </Text>
                  </Block>
                )}
              </Block>
            </Block>
          </Image>

          {/* profile: stats */}
          <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.l}
            marginHorizontal="4%"
            color="rgba(255,255,255,0.2)">
            <Block
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="center"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              {setting.map((setData, index) => {
                return (
                  <Block
                    gray
                    radius={5}
                    flex={0}
                    margin={5}
                    key={`menu-screen-${setData.name}-${index}`}>
                    <TouchableOpacity
                      onPress={() => handleNavigation(setData.to)}>
                      <Block row align="center">
                        <Block
                          flex={0}
                          radius={6}
                          align="center"
                          justify="center"
                          margin={sizes.s}
                          width={sizes.socialIconSize}
                          height={sizes.socialIconSize}>
                          <MaterialIcons
                            name={setData.icon}
                            size={24}
                            color={colors.text}
                          />
                        </Block>
                        <Text p font={fonts?.medium} color={colors.text}>
                          {setData.name}
                        </Text>
                        <Block
                          style={{
                            alignItems: 'flex-end',
                            marginRight: sizes.s,
                          }}>
                          <Image
                            radius={0}
                            width={10}
                            height={18}
                            color={colors.primary}
                            source={icons.arrow}
                          />
                        </Block>
                      </Block>
                    </TouchableOpacity>
                    {/* user details */}
                  </Block>
                );
              })}
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
