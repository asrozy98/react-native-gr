import React, {useCallback, useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, ListItem, Text} from '../components/';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../redux';
import {ActivityIndicator, FlatList} from 'react-native';
import {onListKategori, onLoading} from '../redux/actions/kategoriActions';
// import React, {Component} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const Crisp = () => {
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const dispatch = useDispatch();
  const {following, trending} = useData();
  const [kategori, setKategori] = useState(null);
  const [perPage, setPage] = useState(15);
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const auth = useSelector((state: ApplicationState) => state.AuthReducer);

  return (
    <WebView
      source={{
        uri: `https://go.crisp.chat/chat/embed/?website_id=9a075abc-5f0a-4749-a03f-761e6747f134&user_email=${auth.data.email}&user_phone=${auth.data.phone}&user_nickname=${auth.data.name}`,
      }}
    />
  );
};

export default Crisp;
