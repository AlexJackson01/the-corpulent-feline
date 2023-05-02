import React, {Component} from 'react';
import {View} from 'react-native';
import Matter from 'matter-js';
import Constants from './Constants';
import Obstacle from './Obstacle';
import ObstacleEndTop from './ObstacleEndTop';
import ObstacleEndBottom from './ObstacleEndBottom';

let tick = 0;
let pose = 1;
let obstacles = 0;

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateObstacles = () => {
  let topObstHeight = randomNumber(100, Constants.MAX_HEIGHT / 2 - 100);
  let bottomObstHeight =
    Constants.MAX_HEIGHT - topObstHeight - Constants.GAP_SIZE;

  let sizes = [topObstHeight, bottomObstHeight];

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
};

export const addObstaclesAtLocation = (x, world, entities) => {
  let [obst1Height, obst2Height] = generateObstacles();

  let obstEndWidth = Constants.OBSTACLE_WIDTH + 20;
  let obstEndHeight = (obstEndWidth / 32) * 32;

  obst1Height = obst1Height - obstEndHeight;

  let obst1End = Matter.Bodies.rectangle(
    x,
    obst1Height + obstEndHeight / 2,
    obstEndWidth,
    obstEndHeight,
    {
      isStatic: true,
      collisionFilter: {
        group: 1,
        mask: 0,
      },
    },
  );

  let obst1 = Matter.Bodies.rectangle(
    x,
    obst1Height / 2,
    Constants.OBSTACLE_WIDTH,
    obst1Height,
    {
      isStatic: true,
      collisionFilter: {
        group: 1,
        mask: 0,
      },
    },
  );

  obst2Height = obst2Height - obstEndHeight;

  let obst2End = Matter.Bodies.rectangle(
    x,
    Constants.MAX_HEIGHT - obst2Height - obstEndHeight / 2,
    obstEndWidth,
    obstEndHeight,
    {
      isStatic: true,
      collisionFilter: {
        group: 1,
        mask: 0,
      },
    },
  );

  let obst2 = Matter.Bodies.rectangle(
    x,
    Constants.MAX_HEIGHT - obst2Height / 2,
    Constants.OBSTACLE_WIDTH,
    obst2Height,
    {
      isStatic: true,
      collisionFilter: {
        group: 1,
        mask: 0,
      },
    },
  );

  Matter.World.add(world, [obst1, obst1End, obst2, obst2End]);

  entities['obstacle' + (obstacles + 1)] = {
    body: obst1,
    renderer: Obstacle,
  };

  entities['obstacle' + (obstacles + 2)] = {
    body: obst2,
    renderer: Obstacle,
  };

  entities['obstacle' + (obstacles + 1) + 'End'] = {
    body: obst1End,
    renderer: ObstacleEndTop,
  };

  entities['obstacle' + (obstacles + 2) + 'End'] = {
    body: obst2End,
    renderer: ObstacleEndBottom,
  };

  obstacles += 2;
};

const Physics = (entities, {touches, time, dispatch}) => {
  let engine = entities.physics.engine;
  let world = entities.physics.world;
  let cat = entities.cat.body;

  let hadTouches = false;

  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      if (!hadTouches) {
        if (world.gravity.y === 0.0) {
          world.gravity.y = 1.2;

          addObstaclesAtLocation(
            Constants.MAX_WIDTH * 2 - Constants.OBSTACLE_WIDTH / 2,
            world,
            entities,
          );
          addObstaclesAtLocation(
            Constants.MAX_WIDTH * 3 - Constants.OBSTACLE_WIDTH / 2,
            world,
            entities,
          );
        }
        hadTouches = true;
        Matter.Body.setVelocity(cat, {x: cat.velocity.x, y: -10});
      }
    });

  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, 'collisionStart', event => {
    dispatch({type: 'game_over'});
  });

  Object.keys(entities).forEach(key => {
    if (key.indexOf('obst') === 0) {
      Matter.Body.translate(entities[key].body, {x: -2, y: 0});

      if (
        key.indexOf('End') !== -1 &&
        parseInt(key.replace('obst', '')) % 2 === 0
      ) {
        if (
          entities[key].body.position.x <=
          -1 * (Constants.OBSTACLE_WIDTH / 2)
        ) {
          let obstIndex = parseInt(key.replace('obst', ''));
          delete entities['obst' + (obstIndex - 1) + 'End'];
          delete entities['obst' + (obstIndex - 1)];
          delete entities['obst' + obstIndex + 'End'];
          delete entities['obst' + obstIndex];

          addObstaclesAtLocation(
            Constants.MAX_WIDTH * 2 - Constants.OBSTACLE_WIDTH / 2,
            world,
            entities,
          );
        }
      }
    }

    if (key.indexOf('clouds') === 0) {
      if (entities[key].body.position.x <= (-1 * Constants.MAX_WIDTH) / 2) {
        Matter.Body.setPosition(entities[key].body, {
          x: Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2,
          y: entities[key].body.position.y,
        });
      } else {
        Matter.Body.translate(entities[key].body, {x: -2, y: 0});
      }
    }
  });

  tick += 1;
  if (tick % 5 === 0) {
    pose = pose + 1;
    if (pose > 10) {
      pose = 1;
    }
    entities.cat.pose = pose;
  }

  return entities;
};

export default Physics;
