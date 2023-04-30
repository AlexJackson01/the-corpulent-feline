import React, {Component, useRef, useState} from 'react';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Constants from './Constants';
import Cat from './Cat';
import Ceiling from './Ceiling'
import Floor from './Floor';
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

const Game = () => {
    const [running, setRunning] = useState(true)
  const [gameEngine, setGameEngine] = useState(null);

  const setupWorld = () => {
    let engine = Matter.Engine.create({enableSleeping: false});
    let world = engine.world;
    world.gravity.y = 0.0

    let cat = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 4,
      Constants.MAX_HEIGHT / 2,
      50,
      50,
    );
    cat.restitution = 20

    let floor = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH,
      50,
      {isStatic: true},
    );

    let ceiling = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH,
      50,
      {isStatic: true},
    );


    Matter.World.add(world, [
      cat,
      floor,
      ceiling,
    ])



    return {
      physics: {engine: engine, world: world},
      cat: {body: cat, size: [50, 50], color: 'red', renderer: Cat},
      floor: {
        body: floor,
        renderer: Floor,
      },
      ceiling: {
        body: ceiling,
        renderer: Ceiling,
      }
    }
  };

  const reset = () => {
    gameEngine.swap(setupWorld())
    setRunning(true)
  }

  return (
    <>
    <GameEngine
      ref={(ref) => setGameEngine(ref)}
      style={styles.gameContainer}
      systems={[Physics]}
      running={running}
      onEvent={(e) => {
        switch (e.type) {
            case 'game_over':
                setRunning(false)
                gameEngine.stop()
        }
      }}
      entities={setupWorld()}
    />
    {!running && (
        <TouchableOpacity onPress={() => reset()} style={styles.fullScreenButton}>
            <View style={styles.fullScreen}>
                <Text style={styles.gameOverText}>Game Over</Text>
            </View>
        </TouchableOpacity>
    )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameOverText: {
    color: '#fff',
    fontSize: 40
  }
});

export default Game;
