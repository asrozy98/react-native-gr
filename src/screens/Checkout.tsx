import React, {useCallback, useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {
  Block,
  Button,
  Image,
  Input,
  Modal,
  ListItem,
  Text,
} from '../components/';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../redux';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';
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
import {onAlamat, setAlamat} from '../redux/actions/alamatActions';
const isAndroid = Platform.OS === 'android';

const Checkout = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [showModalAlamat, setModalAlamat] = useState(false);
  const [showModalPembayaran, setModalPembayaran] = useState(false);
  const [showModalVoucher, setModalVoucher] = useState(false);
  const navigation = useNavigation();
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const auth = useSelector((state: ApplicationState) => state.AuthReducer);
  const dataKer = useSelector(
    (state: ApplicationState) => state.KeranjangReducer,
  );
  const alamat = useSelector((state: ApplicationState) => state.AlamatReducer);
  const [dataPembayaran, setDataPembayaran] = useState({
    id: 1,
    nama: 'Bayar di Koperasi',
    icon: 'payments',
    cost: 0,
  });
  const [dataVoucher, setDataVoucher] = useState({
    id: 1,
    nama: 'Free Shipping',
    kode: 'FREE',
    discount: 0,
  });
  const voucher = [{id: 1, nama: 'Free Shipping', kode: 'FREE', discount: 0}];
  const metodePembayaran = [
    {
      id: 1,
      nama: 'Bayar di Koperasi',
      icon: 'payments',
      cost: 0,
    },
    {
      id: 2,
      nama: 'Transfer Bank',
      icon: 'send-to-mobile',
      cost: 0,
    },
    {
      id: 3,
      nama: 'Bayar di tempat COD',
      icon: 'delivery-dining',
      cost: 0,
    },
    {
      id: 4,
      nama: 'Paylater',
      icon: 'credit-card',
      cost: 0,
    },
    {
      id: 5,
      nama: 'Saldo',
      icon: 'account-balance-wallet',
      cost: 0,
    },
  ];

  useEffect(() => {
    dispatch(onAlamat(auth.token));
  }, []);

  return (
    <Block safe>
      <Block
        paddingTop={sizes.xxl}
        paddingHorizontal={sizes.m}
        // paddingBottom={sizes.l}
        flex={0}
        color={colors.primary}>
        <Button row justify="flex-start" onPress={() => navigation.goBack()}>
          <Image
            radius={0}
            width={10}
            height={18}
            color={colors.white}
            source={assets.arrow}
            transform={[{rotate: '180deg'}]}
          />
          <Text p white marginLeft={sizes.s}>
            {t('common.goBack')}
          </Text>
        </Button>
      </Block>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block color={colors.light}>
          <Text color={colors.text}>Alamat Pengiriman:</Text>
          <Button flex={1} row onPress={() => setModalAlamat(true)} outlined>
            <Block
              row
              color="rgba(255,255,255,0.2)"
              align="center"
              justify="space-between"
              paddingHorizontal={sizes.sm}>
              <Text color={colors.text} bold marginRight={sizes.sm}>
                {alamat.data?.find((item) => item.id == alamat.selected)
                  ?.nama ?? '-'}
              </Text>
              <Text color={colors.text} bold marginRight={sizes.sm}>
                {alamat.data?.find((item) => item.id == alamat.selected)
                  ?.no_hp ?? '-'}
              </Text>
              <Image
                source={assets.arrow}
                color={colors.text}
                transform={[{rotate: '90deg'}]}
              />
            </Block>
          </Button>
          <Modal
            visible={showModalAlamat}
            onRequestClose={() => setModalAlamat(false)}>
            <FlatList
              data={alamat.data}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <Button
                  color={colors.primary}
                  marginBottom={sizes.sm}
                  onPress={() => {
                    dispatch(setAlamat(item.id));
                    setModalAlamat(false);
                  }}>
                  <Block row>
                    <Block margin={sizes.s}>
                      <Block row justify="space-between">
                        <Text white semibold>
                          {item.nama}
                          {item.default === 1 && ' [Utama]'}
                        </Text>
                        {item.id === alamat.selected && (
                          <MaterialIcons
                            name="check"
                            size={24}
                            color={colors.white}
                          />
                        )}
                      </Block>
                      <Text p white>
                        {item.no_hp}
                      </Text>
                      <Block row justify="space-between">
                        <Text p white>
                          {item.alamat_lengkap}
                        </Text>
                        <MaterialIcons
                          name="location-pin"
                          size={24}
                          color={colors.white}
                        />
                      </Block>
                    </Block>
                  </Block>
                </Button>
              )}
            />
          </Modal>
        </Block>
        <Block color={colors.gray}>
          <Text color={colors.text} marginBottom={1}>
            Produk:
          </Text>
          {dataKer.select.cart &&
            dataKer.select.cart?.map((item) => {
              return (
                <Block key={item} row justify="space-between" paddingBottom={3}>
                  <Block align="center">
                    <Image
                      resizeMode="contain"
                      rounded
                      source={{
                        uri: dataKer.data.find((i) => i.id == item)
                          ?.product_image,
                      }}
                      style={{
                        height: sizes.width / 5,
                        width: sizes.width / 2,
                      }}
                    />
                  </Block>
                  <Block>
                    <Text>
                      {dataKer.data.find((i) => i.id == item)?.product_name}
                    </Text>
                    <Text>
                      Rp.{' '}
                      {numeral(
                        dataKer.data.find((i) => i.id == item)?.price,
                      ).format('0,0[.]00')}
                    </Text>
                  </Block>
                  <Block align="center">
                    <Text>
                      Qty: {dataKer.data.find((i) => i.id == item)?.qty}
                    </Text>
                    <Text>
                      Rp.{' '}
                      {numeral(
                        dataKer.data.find((i) => i.id == item)?.price_total,
                      ).format('0,0[.]00')}
                    </Text>
                  </Block>
                </Block>
              );
            })}
        </Block>
        <Block color={colors.light}>
          <Text color={colors.text}>Metode Pembayaran:</Text>
          <Button
            flex={1}
            row
            onPress={() => setModalPembayaran(true)}
            outlined>
            <Block
              row
              color="rgba(255,255,255,0.2)"
              align="center"
              justify="space-between"
              paddingHorizontal={sizes.sm}>
              <MaterialIcons
                name={dataPembayaran.icon}
                size={24}
                color={colors.text}
              />
              <Text color={colors.text} bold marginRight={sizes.sm}>
                {dataPembayaran.nama}
              </Text>
              <Image
                source={assets.arrow}
                color={colors.text}
                transform={[{rotate: '90deg'}]}
              />
            </Block>
          </Button>
          <Modal
            visible={showModalPembayaran}
            onRequestClose={() => setModalPembayaran(false)}>
            <FlatList
              data={metodePembayaran}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <Button
                  color={colors.primary}
                  marginBottom={sizes.sm}
                  onPress={() => {
                    setDataPembayaran({
                      ...dataPembayaran,
                      id: item.id,
                      nama: item.nama,
                      icon: item.icon,
                      cost: item.cost,
                    });
                    setModalPembayaran(false);
                  }}>
                  <Block row>
                    <Block margin={sizes.s}>
                      <Block row justify="space-between">
                        <MaterialIcons
                          name={item.icon}
                          size={24}
                          color={colors.white}
                        />
                        <Text white semibold marginLeft={sizes.m}>
                          {item.nama}
                          {/* {item.default === 1 && ' [Utama]'} */}
                        </Text>
                        <Block align="flex-end">
                          {item.id === dataPembayaran.id && (
                            <MaterialIcons
                              name="check"
                              size={24}
                              color={colors.white}
                            />
                          )}
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Button>
              )}
            />
          </Modal>
        </Block>
        <Block color={colors.light}>
          <Text color={colors.text}>Voucher:</Text>
          <Button flex={1} row onPress={() => setModalVoucher(true)} outlined>
            <Block
              row
              color="rgba(255,255,255,0.2)"
              align="center"
              justify="space-between"
              paddingHorizontal={sizes.sm}>
              <MaterialIcons name="local-offer" size={24} color={colors.text} />
              <Text color={colors.text} bold marginRight={sizes.sm}>
                {dataVoucher.nama}
              </Text>
              <Image
                source={assets.arrow}
                color={colors.text}
                transform={[{rotate: '90deg'}]}
              />
            </Block>
          </Button>
          <Modal
            visible={showModalVoucher}
            onRequestClose={() => setModalVoucher(false)}>
            <FlatList
              data={voucher}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <Button
                  color={colors.primary}
                  marginBottom={sizes.sm}
                  onPress={() => {
                    setDataVoucher({
                      ...dataVoucher,
                      id: item.id,
                      nama: item.nama,
                      kode: item.kode,
                      discount: item.discount,
                    });
                    setModalVoucher(false);
                  }}>
                  <Block row>
                    <Block margin={sizes.s}>
                      <Block row justify="space-between">
                        <MaterialIcons
                          name="local-offer"
                          size={24}
                          color={colors.white}
                        />
                        <Text white semibold marginLeft={sizes.m}>
                          {item.nama}
                          {/* {item.default === 1 && ' [Utama]'} */}
                        </Text>
                        <Block align="flex-end">
                          {item.id === dataVoucher.id && (
                            <MaterialIcons
                              name="check"
                              size={24}
                              color={colors.white}
                            />
                          )}
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Button>
              )}
            />
          </Modal>
        </Block>
        <Block>
          <Text>Detail Pembayaran:</Text>
          <Block row justify="space-between">
            <Block>
              <Text>Subtotal Produk:</Text>
              <Text>Pengiriman:</Text>
              <Text>Potongan Voucher:</Text>
              <Text>{t('common.total')}</Text>
            </Block>
            <Block align="flex-end">
              <Text>Rp. {numeral(dataKer.select.sum).format('0,0[.]00')}</Text>
              <Text>
                Rp. {numeral(dataVoucher.discount).format('0,0[.]00')}
              </Text>
              <Text>Rp. {numeral(dataPembayaran.cost).format('0,0[.]00')}</Text>
              <Text>
                Rp.{' '}
                {numeral(
                  dataKer.select.sum +
                    dataPembayaran.cost -
                    dataVoucher.discount,
                ).format('0,0[.]00')}
              </Text>
            </Block>
          </Block>
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
        <Block>
          <Text white bold align="right" marginRight={sizes.s}>
            {t('common.total')} Rp.{' '}
            {numeral(
              dataKer.select.sum + dataPembayaran.cost - dataVoucher.discount,
            ).format('0,0[.]00')}
          </Text>
        </Block>
        <Block>
          <Button
            gradient={gradients.primary}
            onPress={() => navigation.push('CheckoutEnd')}>
            <Text white p bold>
              {t('product.buyNow')}
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default Checkout;
