import React, {useCallback, useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';
import Produk from '../components/Produk';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../redux';
import {onProduk, onLoading} from '../redux/actions/produkActions';
import {ActivityIndicator, FlatList} from 'react-native';

const Home = () => {
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const dispatch = useDispatch();
  const {following, trending} = useData();
  const [products, setProducts] = useState(following);
  const [cari, setCari] = useState(null);
  const [kategori, setKategori] = useState(null);
  const [page, setPage] = useState(10);
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const auth = useSelector((state: ApplicationState) => state.AuthReducer);
  const {data, count, loading} = useSelector(
    (state: ApplicationState) => state.ProdukReducer,
  );

  useEffect(() => {
    dispatch(onProduk(auth.token, kategori, cari, page));
    console.log(data);
  }, [kategori, cari, page]);

  const handleProducts = useCallback(
    (tab: number) => {
      setTab(tab);
      setProducts(tab === 0 ? following : trending);
    },
    [following, trending, setTab, setProducts],
  );
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
      {/* <Block
        row
        flex={0}
        align="center"
        justify="center"
        color={colors.card}
        paddingBottom={sizes.sm}>
        <Button onPress={() => handleProducts(0)}>
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 0 ? 'primary' : 'secondary']}>
              <Image source={assets.extras} color={colors.white} radius={0} />
            </Block>
            <Text p font={fonts?.[tab === 0 ? 'medium' : 'normal']}>
              {t('home.following')}
            </Text>
          </Block>
        </Button>
        <Block
          gray
          flex={0}
          width={1}
          marginHorizontal={sizes.sm}
          height={sizes.socialIconSize}
        />
        <Button onPress={() => handleProducts(1)}>
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 1 ? 'primary' : 'secondary']}>
              <Image
                radius={0}
                color={colors.white}
                source={assets.documentation}
              />
            </Block>
            <Text p font={fonts?.[tab === 1 ? 'medium' : 'normal']}>
              {t('home.trending')}
            </Text>
          </Block>
        </Button>
      </Block> */}

      {/* products list */}
      <Block
        paddingHorizontal={sizes.padding}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block justify="center" marginTop={sizes.sm}>
          {/* {data &&
            data?.map((item, index) => (
              <Produk item={item} key={`card-${index}`} />
            ))} */}
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
            <ActivityIndicator
              size="large"
              // style={{flex: 1, justifyContent: 'center'}}
              color={colors.primary}
            />
          ) : null}
        </Block>
      </Block>
    </Block>
  );
};

export default Home;
