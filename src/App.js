import React, {Component, useRef} from 'react';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';
import {StyleSheet, View} from 'react-native';
import Constants from './Constants';
import Cat from './Cat';
import Wall from './Wall';
import Physics from './Physics';

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateBuildings = () => {
  let topBuildingHeight = randomNumber(100, Constants.MAX_HEIGHT / 2 - 100);
  let bottomBuildingHeight =
    Constants.MAX_HEIGHT - topBuildingHeight - Constants.GAP_SIZE;

  let sizes = [topBuildingHeight, bottomBuildingHeight];

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
};

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
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH,
      50,
      {isStatic: true},
    );

    let ceiling = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      25,
      Constants.MAX_WIDTH,
      50,
      {isStatic: true},
    );

    let [building1Height, building2Height] = generateBuildings();
    let building1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH - Constants.BUILDING_WIDTH / 2,
      building1Height / 2,
      Constants.BUILDING_WIDTH,
      building1Height,
      {isStatic: true},
    );
    let building2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH - Constants.BUILDING_WIDTH / 2,
      Constants.MAX_HEIGHT - building2Height / 2,
      Constants.BUILDING_WIDTH,
      building2Height,
      {isStatic: true},
    );

    let [building3Height, building4Height] = generateBuildings();
    let building3 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH * 2 - Constants.BUILDING_WIDTH / 2,
      building3Height / 2,
      Constants.BUILDING_WIDTH,
      building3Height,
      {isStatic: true},
    );
    let building4 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH * 2 - Constants.BUILDING_WIDTH / 2,
      Constants.MAX_HEIGHT - building4Height / 2,
      Constants.BUILDING_WIDTH,
      building4Height,
      {isStatic: true},
    );

    Matter.World.add(world, [
      cat,
      floor,
      ceiling,
      building1,
      building2,
      building3,
      building4,
    ]);

    return {
      physics: {engine: engine, world: world},
      cat: {body: cat, size: [50, 50], color: 'red', renderer: Cat},
      floor: {
        body: floor,
        size: [Constants.MAX_WIDTH, 50],
        color: 'green',
        renderer: Wall,
      },
      ceiling: {
        body: ceiling,
        size: [Constants.MAX_WIDTH, 50],
        color: 'green',
        renderer: Wall,
      },
      building1: {
        body: building1,
        size: [Constants.BUILDING_WIDTH, building1Height],
        color: 'yellow',
        renderer: Wall,
      },
      building2: {
        body: building2,
        size: [Constants.BUILDING_WIDTH, building2Height],
        color: 'yellow',
        renderer: Wall,
      },
      building3: {
        body: building3,
        size: [Constants.BUILDING_WIDTH, building3Height],
        color: 'yellow',
        renderer: Wall,
      },
      building4: {
        body: building4,
        size: [Constants.BUILDING_WIDTH, building4Height],
        color: 'yellow',
        renderer: Wall,
      },
    };
  };

  return (
    <GameEngine
      ref={gameEngine}
      style={styles.gameContainer}
      systems={[Physics]}
      entities={setupWorld()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
