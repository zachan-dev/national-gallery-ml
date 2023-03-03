import React, { useCallback, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import images from './images';

import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function round(num) {
  return (Math.round(num * 1000) / 1000).toFixed(0);
}

function mapping(num) {
  if (num < 0) return 0;
  else if (num > 99) return 99;
  else return num;
}

let imgNum = 50;

export default function App() {

  let [isLoaded, setIsLoaded] = useState(false);

  let cacheResources = async () => {
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };


  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const _fast = () => Gyroscope.setUpdateInterval(16);

  useEffect(() => {
    const loadResources = async () => {
      await cacheResources();
      setIsLoaded(true);
    }

    loadResources();

    Gyroscope.addListener(gyroscopeData => {
      setData(gyroscopeData);
      imgNum = mapping(Number(Number(imgNum) - Number(round(gyroscopeData.y))));
    });
    _fast();
    console.log("Subscribed to gyroscope");
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Image
        style={{width: '100%', height: '50%'}}
        source={images[parseInt(imgNum)]}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});
