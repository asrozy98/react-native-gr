import React, {useEffect} from 'react';
import {Button, TouchableOpacity} from 'react-native';
import Block from './Block';
import Image from './Image';
import Text from './Text';
import {IProduct} from '../constants/types';
import {useTheme, useTranslation} from '../hooks/';
import {Ionicons} from '@expo/vector-icons';
import numeral from 'numeral';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../redux';

const ListItem = ({itemData}) => {
  const auth = useSelector((state: ApplicationState) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {icons, colors, fonts, gradients, sizes} = useTheme();
  const {t} = useTranslation();

  const isHorizontal = false;
  // const isHorizontal = type !== 'vertical';
  const CARD_WIDTH = (sizes.width - sizes.padding * 2 - sizes.sm) / 2;

  return (
    <Block card flex={0} margin={5}>
      <TouchableOpacity
        onPress={() => {
          navigation.push('KategoriDetail', {
            name: itemData.nama,
            id: itemData.id,
          });
        }}>
        <Block row align="center">
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            marginRight={sizes.s}
            width={sizes.socialIconSize}
            height={sizes.socialIconSize}>
            <Image
              source={{uri: itemData.icon}}
              radius={0}
              style={{
                height: sizes.m,
                width: sizes.m,
              }}
            />
          </Block>
          <Text p font={fonts?.medium} color={colors?.text}>
            {itemData.nama}
          </Text>
          <Block style={{alignItems: 'flex-end'}}>
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
};

export default ListItem;
