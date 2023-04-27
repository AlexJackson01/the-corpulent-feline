import {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

const Start = ({navigation}) => {
  const [showText, setShowText] = useState(true);
  const value = useRef(new Animated.Value(0)).current;

  const {width} = Dimensions.get('window');

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(showText => !showText);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const moveCat = () => {
      Animated.timing(value, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => navigation.navigate('Game'), 500)
      });
  };

  const xVal = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250]
  })

  const yVal = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 350]
  })

  const animStyle = {
    transform: [
        {
            translateX: yVal,
        }
    ]
  }


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/city2.png')}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/images/title.png')}
            style={styles.gameTitle}
          />
        </View>
        <Animated.Image
          source={require('../../assets/images/flying_cat.gif')}
          style={[styles.cat, animStyle]}
        />
        <TouchableOpacity onPress={() => moveCat()}>
          <Text
            style={[
              styles.startText,
            //   {
            //     display: showText ? 'none' : 'flex',
            //   },
            ]}>
            Start
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  cat: {
    height: 250,
    width: 250,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameTitle: {
    // fontSize: 45,
    // color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 400,
    marginTop: -200,
    // paddingBottom: 200,
  },
  startText: {
    fontFamily: 'Squartiqa4FLight',
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,
    paddingTop: 50,
    marginBottom: -100,
  },
});
export default Start;
