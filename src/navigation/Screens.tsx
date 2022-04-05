import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Articles,
  Components,
  Home,
  Profile,
  Register,
  Login,
  Pro,
  ProdukDetail,
} from '../screens';
import {useScreenOptions, useTheme, useTranslation} from '../hooks';
import {ApplicationState, store} from '../redux';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();
  const auth = useSelector((state: ApplicationState) => state.AuthReducer);

  return (
    <Stack.Navigator>
      {auth.isLogin == false && auth.token == null ? (
        <Stack.Group screenOptions={screenOptions.stack}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
        </Stack.Group>
      ) : (
        <>
          <Stack.Group screenOptions={screenOptions.stack}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{title: t('navigation.home')}}
            />

            <Stack.Screen
              name="Components"
              component={Components}
              options={screenOptions.components}
            />

            <Stack.Screen
              name="Articles"
              component={Articles}
              options={{title: t('navigation.articles')}}
            />

            <Stack.Screen
              name="Pro"
              component={Pro}
              options={screenOptions.pro}
            />

            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
          </Stack.Group>
          <Stack.Group screenOptions={screenOptions.headerDetail}>
            <Stack.Screen
              name="ProdukDetail"
              component={ProdukDetail}
              options={({route}) => ({title: route.params.name})}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};
