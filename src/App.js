import React, {Component, useRef} from 'react';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';
import {StyleSheet, View} from 'react-native';
import Constants from './Constants';
import Cat from './Cat';
import Physics from './Physics';

const App = () => {
  const gameEngine = useRef(null);

  const setupWorld = () => {
    let engine = Matter.Engine.create({enableSleeping: false});
    let world = engine.world;

    let cat = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 4,
      Constants.MAX_HEIGHT / 2,
      50,
      50,
    );

    Matter.World.add(world, [cat]);

    return {
      physics: {engine: engine, world: world},
      cat: {body: cat, size: [50, 50], color: 'red', renderer: Cat},
    };
  };

  return (
    <View>
      <GameEngine
        ref={gameEngine}
        style={styles.gameContainer}
        systems={[Physics]}
        entities={setupWorld()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
