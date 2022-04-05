import React, {useCallback, useState} from 'react';
import {Platform, Linking, useWindowDimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import numeral from 'numeral';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RenderHtml from 'react-native-render-html';

const isAndroid = Platform.OS === 'android';

const ProdukDetail = ({route}) => {
  const {width} = useWindowDimensions();
  const {name, image, price, stock, description} = route.params;
  const [foto, setFoto] = useState(image[0].image);
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  const handleSocialLink = useCallback(
    (type: 'twitter' | 'dribbble') => {
      const url =
        type === 'twitter'
          ? `https://twitter.com/${user?.social?.twitter}`
          : `https://dribbble.com/${user?.social?.dribbble}`;

      try {
        Linking.openURL(url);
      } catch (error) {
        alert(`Cannot open URL: ${url}`);
      }
    },
    [user],
  );
  const source = {
    html: description,
  };

  return (
    <Block safe marginTop={sizes.xs}>
      <Block
        scroll
        // paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          <Image
            background
            resizeMode="cover"
            height={sizes.xxl * 6}
            padding={sizes.s}
            source={{uri: foto}}>
            <Block flex={0} align="flex-end">
              {image?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setFoto(item.image)}
                  key={`card-${index}`}>
                  <Image
                    width={64}
                    height={64}
                    marginBottom={sizes.sm}
                    source={{uri: item?.image}}
                  />
                </TouchableOpacity>
              ))}
            </Block>
          </Image>

          {/* product: stats */}
          <Block
            flex={0}
            // radius={sizes.s}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.sm}
            // marginTop='-40%'
            color={colors.secondary}>
            <Block
              blur
              flex={0}
              intensity={100}
              // radius={sizes.s}
              overflow="hidden"
              tint={colors.blurTint}
              // justify="space-evenly"
              renderToHardwareTextureAndroid>
              <Text h5 left={1} marginTop={sizes.s} marginLeft={sizes.s}>
                {name}
              </Text>
              <Block row padding={sizes.s}>
                <Block align="flex-start">
                  <Text h5>Rp. {numeral(price).format('0,0[.]00')},00</Text>
                  <Text>Stok: {stock}</Text>
                </Block>
                <Block align="flex-end">
                  <Text h5>{(user?.stats?.following || 0) / 1000}x</Text>
                  <Text>{t('common.sold')}</Text>
                </Block>
              </Block>
            </Block>
          </Block>

          {/* product: about me */}
          <Block paddingHorizontal={sizes.sm}>
            <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              {t('product.description')}:
            </Text>
            <Text p lineHeight={26} marginTop={sizes.s}>
              <RenderHtml contentWidth={width} source={source} />
            </Text>
          </Block>

          {/* product: photo album */}
          <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            <Block row align="center" justify="space-between">
              <Text h5 semibold>
                {t('common.album')}
              </Text>
              <Button>
                <Text p primary semibold>
                  {t('common.viewall')}
                </Text>
              </Button>
            </Block>
            <Block row justify="space-between" wrap="wrap">
              <Image
                resizeMode="cover"
                source={assets?.photo1}
                style={{
                  width: IMAGE_VERTICAL_SIZE + IMAGE_MARGIN / 2,
                  height: IMAGE_VERTICAL_SIZE * 2 + IMAGE_VERTICAL_MARGIN,
                }}
              />
              <Block marginLeft={sizes.m}>
                <Image
                  resizeMode="cover"
                  source={assets?.photo2}
                  marginBottom={IMAGE_VERTICAL_MARGIN}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
                <Image
                  resizeMode="cover"
                  source={assets?.photo3}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default ProdukDetail;
