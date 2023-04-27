import React, {Component, useRef} from 'react';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';
import {StyleSheet, View} from 'react-native';
import Constants from './Constants';
import Cat from './Cat';
import Wall from './Wall';
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

    let floor = Matter.Bodies.rectangle(
        Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT - 25, Constants.MAX_WIDTH, 50, { isStatic: true }
    )

    let ceiling = Matter.Bodies.rectangle(
        Constants.MAX_WIDTH / 2, 25, Constants.MAX_WIDTH, 50, { isStatic: true }
    )

    Matter.World.add(world, [cat, floor]);

    return {
      physics: {engine: engine, world: world},
      cat: {body: cat, size: [50, 50], color: 'red', renderer: Cat},
      floor: {body: floor, size: [Constants.MAX_WIDTH, 50], color: 'green', renderer: Wall},
      ceiling: {body: ceiling, size: [Constants.MAX_WIDTH, 50], color: 'green', renderer: Wall},
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
