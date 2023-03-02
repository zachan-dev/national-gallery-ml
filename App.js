import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Gyroscope } from 'expo-sensors';

function round(num) {
  return (Math.round(num * 1000) / 1000).toFixed(0);
}

const imageFolder = './assets/images/'; // The folder containing the images
const imageArray = []; // The array to store the images

const importAll = (r) => {
  r.keys().forEach((key) => imageArray.push(r(key)));
};

try {
  importAll(require.context(imageFolder, false, /\.(png|jpe?g|svg)$/));
} catch (error) {
  console.error(error);
}

export default function App() {

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const _fast = () => Gyroscope.setUpdateInterval(16);

  useEffect(() => {
    Gyroscope.addListener(gyroscopeData => {
      setData(gyroscopeData);
    });
    _fast();
    console.log("Subscribed to gyroscope");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gyroscope:</Text>
      <Text style={styles.text}>x: {round(x)}</Text>
      <Text style={styles.text}>y: {round(y)}</Text>
      <Text style={styles.text}>z: {round(z)}</Text>
      <Image
        style={styles.tinyLogo}
        source={{uri: '0032.png'}}
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
