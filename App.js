import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Gyroscope } from 'expo-sensors';

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
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      <Image
        style={styles.tinyLogo}
        source={require('./assets/pack/0001.png')}
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
