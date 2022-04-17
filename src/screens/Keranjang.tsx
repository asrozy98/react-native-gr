import React, {useCallback, useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, ListItem, Text} from '../components/';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../redux';
import {ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import {
  onDeleteKeranjang,
  onListKeranjang,
  onLoading,
  onSelectKeranjang,
  onUpdateKeranjang,
} from '../redux/actions/keranjangActions';
import {FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import numeral from 'numeral';
import {Checkbox} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Keranjang = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const auth = useSelector((state: ApplicationState) => state.AuthReducer);
  const dataKer = useSelector(
    (state: ApplicationState) => state.KeranjangReducer,
  );

  useEffect(() => {
    dispatch(onListKeranjang(auth.token));
  }, [dataKer.count, dataKer.select]);

  const selectItem = (id: number, sum: number) => {
    let array = dataKer.select.cart;
    let index = array.indexOf(id);
    let sumTotal = 0;
    if (array.includes(id)) {
      array.splice(index, 1);
      sumTotal = dataKer.select.sum - sum;
    } else {
      array.push(id);
      sumTotal = dataKer.select.sum + sum;
    }
    if (array.length === dataKer.count) {
      dispatch(onSelectKeranjang(array, true, sumTotal));
    } else {
      dispatch(onSelectKeranjang(array, false, sumTotal));
    }
  };

  const selectAll = () => {
    let array = [];
    let select = false;
    let sum = 0;
    if (dataKer.select.selectAll === false) {
      dataKer.data.map((item) => {
        array.push(item.id);
        sum += item.price_total;
      });
      select = true;
    } else if (dataKer.select.selectAll) {
      array = [];
      select = false;
    }
    dispatch(onSelectKeranjang(array, select, sum));
  };

  const CardItem = ({itemData}) => {
    return (
      <Block card marginVertical={sizes.s}>
        <Checkbox
          status={
            dataKer.select.cart.includes(itemData.id) ? 'checked' : 'unchecked'
          }
          onPress={() => {
            selectItem(itemData.id, itemData.price_total);
          }}
        />
        <Block row marginTop={-sizes.s}>
          <Image
            resizeMode="contain"
            source={{uri: itemData.product_image}}
            style={{height: sizes.width / 3.5, width: sizes.width / 2.5}}
          />
          <Block marginTop={-sizes.m} padding={sizes.s} justify="space-between">
            <TouchableOpacity>
              <Block row align="center">
                <Text p semibold marginRight={sizes.s} color={colors.link}>
                  {itemData.product_name}
                </Text>
              </Block>
            </TouchableOpacity>
            <Block>
              <Text>Rp. {numeral(itemData.price).format('0,0[.]00')}</Text>
            </Block>
            <Block
              row
              justify="center"
              marginVertical={sizes.s}
              marginRight={sizes.xxl}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    onUpdateKeranjang(
                      auth.token,
                      itemData.product_id,
                      itemData.qty + 1,
                    ),
                  );
                  dispatch(onSelectKeranjang([], false, 0));
                }}>
                <MaterialIcons
                  name="add-circle"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
              <Block marginHorizontal={sizes.s}>
                <Text center>{itemData.qty}</Text>
              </Block>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    onUpdateKeranjang(
                      auth.token,
                      itemData.product_id,
                      itemData.qty - 1,
                    ),
                  );
                  dispatch(onSelectKeranjang([], false, 0));
                }}>
                <MaterialIcons
                  name="remove-circle"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            </Block>
            <Block>
              <Text>
                {t('common.total')} Rp.{' '}
                {numeral(itemData.price_total).format('0,0[.]00')}
              </Text>
            </Block>
          </Block>
        </Block>
        <Block align="flex-end" marginTop={-sizes.m}>
          <TouchableOpacity
            onPress={() => {
              dispatch(onListKeranjang(auth.token, perPage));
              dispatch(
                onDeleteKeranjang(
                  auth.token,
                  itemData.product_id,
                  auth.data.id,
                ),
              );
            }}>
            <MaterialIcons name="delete" size={24} color={colors.text} />
          </TouchableOpacity>
        </Block>
      </Block>
    );
  };

  return (
    <Block>
      {/* Keranjang list */}
      <Block
        paddingHorizontal={sizes.padding}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block justify="center" marginTop={sizes.sm}>
          {dataKer.data && (
            <FlatList
              data={dataKer.data}
              renderItem={(item) => <CardItem itemData={item.item} />}
              keyExtractor={(item) => item.product_name}
              ListEmptyComponent={() => <Text center>{t('common.empty')}</Text>}
            />
          )}
          {dataKer.loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : null}
        </Block>
      </Block>
      <Block
        row
        justify="space-between"
        align="center"
        height={sizes.xxl}
        width={sizes.width}
        bottom={0}
        color={colors.gray}
        paddingLeft={sizes.s}
        position="absolute">
        <Checkbox
          status={dataKer.select.selectAll ? 'checked' : 'unchecked'}
          onPress={() => selectAll()}
        />
        <Text paddingLeft={sizes.s} white bold>
          {t('common.all')}
        </Text>
        <Block>
          <Text white bold align="right" marginRight={sizes.s}>
            {t('common.total')} Rp.{' '}
            {numeral(dataKer.select.sum).format('0,0[.]00')}
          </Text>
        </Block>
        <Block>
          <Button
            gradient={gradients.primary}
            onPress={() => navigation.push('Checkout')}>
            <Text white p bold>
              {t('product.buyNow')}
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default Keranjang;
