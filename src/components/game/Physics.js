import React, {Component} from 'react';
import {View} from 'react-native';
import Matter from 'matter-js';
import Constants from './Constants';
import Obstacle1 from './obstacles/Obstacle1';
import Obstacle2 from './obstacles/Obstacle2';
import ObstacleEndTop from './obstacles/ObstacleEndTop';
import ObstacleEndBottom from './obstacles/ObstacleEndBottom';
import PowerUp1 from './points/PowerUp1';
import PowerUp2 from './points/PowerUp2';
import PowerUp3 from './points/PowerUp3';
import PowerUp4 from './points/PowerUp4';

let tick = 0;
let pose = 1;
let obstacles = 0;
let powers = 0;

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const resetPipes = () => {
  powers = 0;
  pipes = 0;
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
      label: 'Obstacle',
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
      label: 'Obstacle',
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
      label: 'Obstacle',
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
      label: 'Obstacle',
      collisionFilter: {
        group: 1,
        mask: 0,
      },
    },
  );

  Matter.World.add(world, [obst1, obst1End, obst2, obst2End]);

  entities['obstacle' + (obstacles + 1)] = {
    body: obst1,
    renderer: Obstacle1,
    scored: false,
  };

  entities['obstacle' + (obstacles + 2)] = {
    body: obst2,
    renderer: Obstacle2,
    scored: false,
  };

  entities['obstacle' + (obstacles + 1) + 'End'] = {
    body: obst1End,
    renderer: ObstacleEndTop,
    scored: false,
  };

  entities['obstacle' + (obstacles + 2) + 'End'] = {
    body: obst2End,
    renderer: ObstacleEndBottom,
    scored: false,
  };

  obstacles += 2;
};

export const addPowersAtLocation = (x, world, entities) => {
  // obst1Height = obst1Height - obstEndHeight;

  let power1End = Matter.Bodies.rectangle(x, 48 + 48 / 2, 48, 48, {
    isStatic: true,
    label: 'PowerUp',
    collisionFilter: {
      group: 1,
      mask: 0,
    },
  });

  let power1 = Matter.Bodies.rectangle(
    x,
    48 / 2,
    Constants.OBSTACLE_WIDTH,
    48,
    {
      isStatic: true,
      label: 'PowerUp',
      collisionFilter: {
        group: 1,
        mask: 0,
      },
    },
  );

  let power2End = Matter.Bodies.rectangle(
    x,
    Constants.MAX_HEIGHT - 48 - 48 / 2,
    48,
    48,
    {
      isStatic: true,
      label: 'PowerUp',
      collisionFilter: {
        group: 1,
        mask: 0,
      },
    },
  );

  let power2 = Matter.Bodies.rectangle(
    x,
    Constants.MAX_HEIGHT - 48 / 2,
    Constants.OBSTACLE_WIDTH,
    48,
    {
      isStatic: true,
      label: 'PowerUp',
      collisionFilter: {
        group: 1,
        mask: 0,
      },
    },
  );

  Matter.World.add(world, [power1]);

  entities['powerUp' + (powers + 1)] = {
    body: power1,
    renderer: PowerUp1,
    scored: false,
  };

  entities['powerUp' + (powers + 2)] = {
    body: power2,
    renderer: PowerUp2,
    scored: false,
  };

  entities['powerUp' + (powers + 1) + 'End'] = {
    body: power1End,
    renderer: PowerUp3,
    scored: false,
  };

  entities['powerUp' + (powers + 2) + 'End'] = {
    body: power2End,
    renderer: PowerUp4,
    scored: false,
  };

  powers += 2;
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
            Constants.MAX_WIDTH * 4 - Constants.OBSTACLE_WIDTH / 2,
            world,
            entities,
          );
          addPowersAtLocation(
            Constants.MAX_WIDTH * 3 - Constants.OBSTACLE_WIDTH / 2,
            world,
            entities,
          );
          addPowersAtLocation(
            Constants.MAX_WIDTH * 5 - Constants.OBSTACLE_WIDTH / 2,
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
    if (event.pairs.some(pair => pair.bodyB.label == 'Obstacle')) {
      dispatch({type: 'game_over'});
    }

    if (
      event.pairs.some(
        pair => pair.bodyB.label == 'PowerUp' && !pair.bodyB.scored,
      )
    ) {
      event.pairs.some(pair => (pair.bodyB.scored = true));
      dispatch({type: 'power_up'});
    }
  });

  Object.keys(entities).forEach(key => {
    if (key.indexOf('powerUp') === 0 && entities.hasOwnProperty(key)) {
      Matter.Body.translate(entities[key].body, {x: -2, y: 0});

      if (
        key.indexOf('End') !== -1 &&
        parseInt(key.replace('powerUp', '')) % 2 === 0
      ) {
        if (
          entities[key].body.position.x === cat.position.x &&
          !entities[key].scored
        ) {
          entities[key].scored = true;
          dispatch({type: 'power_up'});
        }

        if (
          entities[key].body.position.x <=
          -1 * (Constants.OBSTACLE_WIDTH / 2)
        ) {
          let powerIndex = parseInt(key.replace('powerUp', ''));
          delete entities['powerUp' + (powerIndex - 1) + 'End'];
          delete entities['powerUp' + (powerIndex - 1)];
          delete entities['powerUp' + powerIndex + 'End'];
          delete entities['powerUp' + powerIndex];

          addPowersAtLocation(
            Constants.MAX_WIDTH * 2.5 - Constants.OBSTACLE_WIDTH / 2,
            world,
            entities,
          );
        }
      }
    }

    if (key.indexOf('obstacle') === 0 && entities.hasOwnProperty(key)) {
      Matter.Body.translate(entities[key].body, {x: -2, y: 0});

      if (
        key.indexOf('End') !== -1 &&
        parseInt(key.replace('obstacle', '')) % 2 === 0
      ) {
        if (
          entities[key].body.position.x <= cat.position.x &&
          !entities[key].scored
        ) {
          entities[key].scored = true;
          dispatch({type: 'score'});
        }

        if (
          entities[key].body.position.x <=
          -1 * (Constants.OBSTACLE_WIDTH / 2)
        ) {
          let obstIndex = parseInt(key.replace('obstacle', ''));
          delete entities['obstacle' + (obstIndex - 1) + 'End'];
          delete entities['obstacle' + (obstIndex - 1)];
          delete entities['obstacle' + obstIndex + 'End'];
          delete entities['obstacle' + obstIndex];

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
