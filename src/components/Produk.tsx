import React from 'react';
import {TouchableOpacity} from 'react-native';
import Block from './Block';
import Image from './Image';
import Text from './Text';
import {IProduct} from '../constants/types';
import {useTheme, useTranslation} from '../hooks/';
import {Ionicons} from '@expo/vector-icons';
import numeral from 'numeral';
import {useNavigation} from '@react-navigation/native';

const Produk = ({image, title, type, price, linkLabel}: IProduct) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {assets, colors, gradients, sizes} = useTheme();

  const isHorizontal = type !== 'vertical';
  const CARD_WIDTH = (sizes.width - sizes.padding * 2 - sizes.sm) / 2;

  return (
    <Block
      card
      marginTop={sizes.sm}
      flex={0}
      row={isHorizontal}
      marginBottom={sizes.sm}
      width={isHorizontal ? CARD_WIDTH * 2 + sizes.sm : CARD_WIDTH}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Screens', {
            screen: 'ProdukDetail',
            params: {
              namaProduk: title,
            },
          });
        }}>
        <Image
          resizeMode="cover"
          source={{uri: image}}
          style={{
            height: isHorizontal ? 114 : 110,
            width: !isHorizontal ? '100%' : sizes.width / 2.435,
          }}
        />
        <Text p bold gradient={gradients.secondary} marginTop={sizes.s}>
          {title}
        </Text>
        <Block marginTop={sizes.sm} marginLeft={sizes.xs}>
          <Text
            // p
            marginBottom={sizes.sm}
            align="right">
            Rp. {numeral(price).format('0,0[.]00')}
          </Text>
        </Block>
        <Block marginTop={-sizes.md}>
          <Ionicons name="md-checkmark-circle" size={25} color="green" />
          <Block row justify="space-between">
            <Text gray>{t('common.top')}</Text>
            <Text gray>10 {t('common.sold')}</Text>
          </Block>
        </Block>
      </TouchableOpacity>
      {/* user details */}
    </Block>
  );
};

export default Produk;
