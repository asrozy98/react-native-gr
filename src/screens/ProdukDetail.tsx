import React, {useCallback, useEffect, useState} from 'react';
import {
  Platform,
  Linking,
  useWindowDimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {FontAwesome5, Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text, Produk} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import numeral from 'numeral';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RenderHtml, {
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';
import {ApplicationState} from '../redux';
import {useDispatch, useSelector} from 'react-redux';
import {onKategoriProduk} from '../redux/actions/produkActions';
import {onAddKeranjang} from '../redux/actions/keranjangActions';
import {addWishlist, deleteWishlist} from '../redux/actions/wishlistActions';

const isAndroid = Platform.OS === 'android';

const ProdukDetail = ({route}) => {
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  const {product_id, name, image, price, stock, description, category_id} =
    route.params;
  const auth = useSelector((state: ApplicationState) => state.AuthReducer);
  const [foto, setFoto] = useState(image[0].image);
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, gradients, colors, sizes} = useTheme();
  const {katData, loading} = useSelector(
    (state: ApplicationState) => state.ProdukReducer,
  );
  const wishlist = useSelector(
    (state: ApplicationState) => state.WishlistReducer,
  );

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  useEffect(() => {
    dispatch(onKategoriProduk(auth.token, category_id, 4));
  }, [category_id, wishlist.data]);

  const source = {
    html: `<blue-circle>${description}</blue-circle>`,
  };

  const customHTMLElementModels = {
    'blue-circle': HTMLElementModel.fromCustomModel({
      tagName: 'blue-circle',
      mixedUAStyles: {
        backgroundColor: colors.card,
        color: colors.text,
      },
      contentModel: HTMLContentModel.block,
    }),
  };

  const HtmlComponent = React.memo(() => (
    <RenderHtml
      contentWidth={width}
      source={source}
      customHTMLElementModels={customHTMLElementModels}
    />
  ));

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
                  key={`image-${index}`}>
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
                  <Text h5>Rp. {numeral(price).format('0,0[.]00')}</Text>
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
          <Block paddingHorizontal={sizes.sm} color={colors.card}>
            <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              {t('product.description')}:
            </Text>
            <HtmlComponent />
          </Block>

          {/* product: product similar */}
          <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            <Block row align="center" justify="space-between">
              <Text h5 semibold>
                {t('common.album')}
              </Text>
              <Button>
                <Text p semibold>
                  {t('common.viewall')}
                </Text>
              </Button>
            </Block>
            <Block row justify="space-between" wrap="wrap">
              {loading ? (
                <ActivityIndicator
                  size="large"
                  // style={{flex: 1, justifyContent: 'center'}}
                  color={colors.primary}
                />
              ) : (
                katData?.map((item, index) => (
                  <Produk item={item} key={`kat-${index}`} />
                ))
              )}
            </Block>
          </Block>
        </Block>
      </Block>
      <Block
        row
        justify="space-between"
        align="center"
        height={sizes.xxl}
        width={width}
        bottom={0}
        color={colors.gray}
        position="absolute">
        <Block>
          <Button
            // gradient={gradients.secondary}
            onPress={() => {
              wishlist.data.find((item) => item.id === product_id)
                ? dispatch(deleteWishlist(auth.token, product_id))
                : dispatch(addWishlist(auth.token, product_id));
            }}>
            {wishlist.data.find((item) => item.id === product_id) ? (
              <Ionicons name="heart" size={24} color="red" />
            ) : (
              <FontAwesome5 name="heart" size={24} color={colors.white} />
            )}
          </Button>
        </Block>
        <Block>
          <Button
            onPress={() => {
              dispatch(onAddKeranjang(auth.token, product_id));
              // console.log(product_id, auth.token);
            }}>
            <FontAwesome5 name="cart-plus" size={24} color={colors.white} />
          </Button>
        </Block>
        <Block>
          <Button
            gradient={gradients.primary}
            onPress={() => navigation.navigate('Cart')}>
            <Text white p bold>
              {t('product.buyNow')}
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default ProdukDetail;
