import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/Logo_completo_Color_1PNG.webp')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
});

export default memo(Logo);
