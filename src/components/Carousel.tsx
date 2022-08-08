import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {px} from '@utils/Constants';
import FastImage from 'react-native-fast-image';

type Props = {
  images: string[];
  height: number;
  width: number;
};

type ItemProps = {
  item: string;
  index: number;
};

export const CarouselImages = ({images, height, width}: Props) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);

  console.log(slideIndex);

  const renderImage = ({item}: ItemProps) => {
    return (
      <View style={styles.imageWrapper}>
        <FastImage source={{uri: item}} style={styles.images} />
      </View>
    );
  };

  return (
    <>
      <Carousel
        layout={'default'}
        data={images}
        sliderWidth={width}
        sliderHeight={height}
        itemWidth={width}
        renderItem={renderImage}
        onSnapToItem={(index: number) => setSlideIndex(index)}
      />
      <Pagination
        activeDotIndex={slideIndex}
        dotsLength={images.length}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  images: {
    width: 500 * px,
    height: 500 * px,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  inactiveDotStyle: {
    backgroundColor: 'rgb(160,160,160)',
  },
});
