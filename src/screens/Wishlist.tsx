import React, {useCallback, useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks';
import {Block, Button, Image, Input, Produk, Text} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../redux';
import {onProduk, onLoading} from '../redux/actions/produkActions';
import {ActivityIndicator, FlatList} from 'react-native';
import {onListKategori} from '../redux/actions/kategoriActions';
import {useNavigation} from '@react-navigation/native';
import {onWishlist} from '../redux/actions/wishlistActions';

const Wishlist = () => {
  // const {nama, id} = route.params;
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const dispatch = useDispatch();
  const {following, trending} = useData();
  const navigation = useNavigation();
  const [cari, setCari] = useState(null);
  const [page, setPage] = useState(10);
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const auth = useSelector((state: ApplicationState) => state.AuthReducer);
  const dataKat = useSelector(
    (state: ApplicationState) => state.KategoriReducer,
  );
  const {data, count, loading} = useSelector(
    (state: ApplicationState) => state.WishlistReducer,
  );

  useEffect(() => {
    dispatch(onWishlist(auth.token));
  }, [data]);

  return (
    <Block>
      {/* search input */}
      {/* <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input
          search
          placeholder={t('common.search')}
          onChangeText={(value) => setCari(value)}
        />
      </Block> */}

      {/* products list */}
      <Block
        paddingHorizontal={sizes.padding}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block justify="center" marginTop={sizes.sm}>
          {data && (
            <FlatList
              data={data}
              // onEndReached={() => setPerPage()}
              // onEndReachedThreshold={0.5}
              renderItem={(item) => <Produk item={item.item} />}
              keyExtractor={(item) => item.id}
              numColumns={2}
              ListEmptyComponent={() => <Text center>{t('common.empty')}</Text>}
            />
          )}
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : null}
        </Block>
      </Block>
    </Block>
  );
};

export default Wishlist;
