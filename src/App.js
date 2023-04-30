import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TrackPlayer from 'react-native-track-player';
import {RepeatMode} from 'react-native-track-player';

import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import {useEffect} from 'react';

const App = () => {
  useEffect(() => {
    // start();
  }, []);

  const start = async () => {
    try {
      await TrackPlayer.setupPlayer();

      await TrackPlayer.add({
        url: require('./assets/music/music2.mp3'),
      });

      await TrackPlayer.setRepeatMode(RepeatMode.Track);

      await TrackPlayer.play();
    } catch (err) {
      console.log(err);
    }
  };

  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
