import React from 'react';
import {StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import {px} from '@utils/Constants';

type Props = {
  images: string[];
  height: number;
  width: number;
};

export const CarouselImages = ({images, height, width}: Props) => {
  const renderImage = (item: any) => {
    return <FastImage source={{uri: item}} style={styles.images} />;
  };

  return (
    <Carousel
      layout={'default'}
      data={images}
      sliderWidth={width}
      sliderHeight={height}
      itemHeight={height}
      renderItem={renderImage}
    />
  );
};

const styles = StyleSheet.create({
  images: {
    width: 200 * px,
    height: 200 * px,
  },
});
