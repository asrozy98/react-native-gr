import React, {useCallback, useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks';
import {Block, Button, Image, Input, Product, Text} from '../components';
import Produk from '../components/Produk';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../redux';
import {onProduk, onLoading} from '../redux/actions/produkActions';
import {ActivityIndicator, FlatList} from 'react-native';
import {onListKategori} from '../redux/actions/kategoriActions';
import {NavigationContainer} from '@react-useNavigation/native';
import {useNavigation} from '@react-navigation/native';

const KategoriDetail = ({route}) => {
  const {nama, id} = route.params;
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
    (state: ApplicationState) => state.ProdukReducer,
  );

  useEffect(() => {
    dispatch(onProduk(auth.token, id, cari, page));
  }, [cari, page]);
  const setPerPage = () => {
    dispatch(onLoading());
    if (page < count) {
      setPage(page + 10);
    } else {
      setPage(count);
    }
  };

  return (
    <Block>
      {/* search input */}
      <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input
          search
          placeholder={t('common.search')}
          onChangeText={(value) => setCari(value)}
        />
      </Block>

      {/* products list */}
      <Block
        paddingHorizontal={sizes.padding}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block justify="center" marginTop={sizes.sm}>
          {data && (
            <FlatList
              data={data}
              onEndReached={() => setPerPage()}
              onEndReachedThreshold={0.5}
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

export default KategoriDetail;
