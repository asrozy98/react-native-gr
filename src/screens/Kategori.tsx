import React, {useCallback, useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, ListItem, Text} from '../components/';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../redux';
import {ActivityIndicator, FlatList} from 'react-native';
import {onListKategori, onLoading} from '../redux/actions/kategoriActions';

const Kategori = () => {
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const dispatch = useDispatch();
  const {following, trending} = useData();
  const [kategori, setKategori] = useState(null);
  const [perPage, setPage] = useState(13);
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const auth = useSelector((state: ApplicationState) => state.AuthReducer);
  const dataKat = useSelector(
    (state: ApplicationState) => state.KategoriReducer,
  );

  useEffect(() => {
    dispatch(onListKategori(auth.token, perPage));
  }, [kategori, perPage]);
  const setPerPage = () => {
    dispatch(onLoading());
    setPage(perPage + 10);
  };

  return (
    <Block>
      {/* Kategori list */}
      <Block
        paddingHorizontal={sizes.padding}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block justify="center" marginTop={sizes.sm}>
          {dataKat.data ? (
            <FlatList
              data={dataKat.data}
              onEndReached={() => setPerPage()}
              onEndReachedThreshold={0.5}
              renderItem={(item) => <ListItem itemData={item.item} />}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => <Text center>{t('common.empty')}</Text>}
            />
          ) : (
            <ActivityIndicator size="large" color={colors.primary} />
          )}
        </Block>
      </Block>
    </Block>
  );
};

export default Kategori;
