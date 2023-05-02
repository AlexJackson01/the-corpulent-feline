import React, {Component, useRef, useState} from 'react';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from './Constants';
import Cat from './Cat';
import Wall from './Wall';
import Clouds from './Clouds';
import Physics from './Physics';
import Images from '../../assets/Images';


const Game = () => {
  const [running, setRunning] = useState(true);
  const [gameEngine, setGameEngine] = useState(null);

  const setupWorld = () => {
    let engine = Matter.Engine.create({
      enableSleeping: false,
      height: Dimensions.get('window').height,
    });
    let world = engine.world;
    world.gravity.y = 0.0;

    let cat = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 4,
      Constants.MAX_HEIGHT / 2,
      Constants.CAT_WIDTH,
      Constants.CAT_HEIGHT,
      {
        collisionFilter: {
          group: 1,
          mask: 0,
        },
      },
    );
    cat.restitution = 20;

    let clouds = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH,
      Constants.MAX_HEIGHT - 10,
      Constants.MAX_WIDTH * 3,
      Constants.MAX_WIDTH,
      {
        isStatic: true,
        collisionFilter: {
          group: 2,
          mask: 0,
        },
      },
    );

    let floor = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT,
      Constants.MAX_WIDTH,
      1,
      {isStatic: true, collisionFilter: {
        group: 1,
        mask: 0
      }},
    );

    let ceiling = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      0,
      Constants.MAX_WIDTH,
      1,
      {isStatic: true, collisionFilter: {
        group: 1,
        mask: 0
      }},
    );

    

    Matter.World.add(world, [cat, clouds, floor, ceiling]);

    return {
      physics: {engine: engine, world: world},
      cat: {body: cat, pose: 1, renderer: Cat},
      floor: {
        body: floor,
        size: [Constants.MAX_WIDTH, 0],
        color: 'green',
        renderer: Wall,
      },
      ceiling: {
        body: ceiling,
        size: [Constants.MAX_WIDTH, 0],
        color: 'green',
        renderer: Wall,
      },
      clouds: {
        body: clouds,
        renderer: Clouds,
      },
    };
  };

  const reset = () => {
    gameEngine.swap(setupWorld());
    setRunning(true);
  };

  return (
    <>
      <Image
        source={Images.background}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <GameEngine
        ref={ref => setGameEngine(ref)}
        style={styles.gameContainer}
        systems={[Physics]}
        running={running}
        onEvent={e => {
          switch (e.type) {
            case 'game_over':
              setRunning(false);
              gameEngine.stop();
          }
        }}
        entities={setupWorld()}
      />
      {!running && (
        <TouchableOpacity
          onPress={() => reset()}
          style={styles.fullScreenButton}>
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
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
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
    alignItems: 'center',
  },
  gameOverText: {
    color: '#fff',
    fontSize: 40,  
    fontFamily: 'Squartiqa4FLight',
  },
});

export default Game;
