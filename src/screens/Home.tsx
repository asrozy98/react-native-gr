import React, {useCallback, useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Text} from '../components/';
import Produk from '../components/Produk';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../redux';
import {onProduk, onLoading} from '../redux/actions/produkActions';
import {ActivityIndicator, FlatList} from 'react-native';
import {onListKategori} from '../redux/actions/kategoriActions';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [cari, setCari] = useState(null);
  const [kategori, setKategori] = useState(null);
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
    dispatch(onListKategori(auth.token, 5));
    dispatch(onProduk(auth.token, kategori, cari, page));
  }, [kategori, cari, page]);
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

      {/* toggle products list */}
      <Block
        row
        flex={0}
        wrap={'wrap'}
        align="center"
        justify="space-between"
        color={colors.card}
        paddingHorizontal={sizes.sm}
        paddingBottom={sizes.s}>
        {loading ? (
          <Block justify="center">
            <ActivityIndicator size="large" color={colors.primary} />
          </Block>
        ) : (
          <>
            {dataKat.data?.map((item, key) => (
              <Button onPress={() => setKategori(item.id)} key={`kat-${key}`}>
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
                      source={{uri: item.icon}}
                      radius={0}
                      style={{
                        height: sizes.m,
                        width: sizes.m,
                      }}
                    />
                  </Block>
                  <Text
                    p
                    font={fonts?.[kategori === item.id ? 'medium' : 'normal']}
                    color={colors?.[kategori === item.id ? 'primary' : 'text']}>
                    {item.nama}
                  </Text>
                </Block>
              </Button>
            ))}
            <Button
              onPress={() =>
                navigation.navigate('Screens', {screen: 'Kategori'})
              }
              key={`kat-00`}>
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
                    source={assets.logo}
                    radius={0}
                    color={colors?.[kategori === null ? 'primary' : 'text']}
                    style={{
                      height: sizes.m,
                      width: sizes.m,
                    }}
                  />
                </Block>
                <Text
                  p
                  font={fonts?.[kategori === null ? 'medium' : 'normal']}
                  color={colors?.[kategori === null ? 'primary' : 'text']}>
                  Semua
                </Text>
              </Block>
            </Button>
          </>
        )}
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

export default Home;
