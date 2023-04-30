import React, {Component} from 'react';
import {View} from 'react-native';
import Matter from 'matter-js';
import Constants from './Constants';

let tick = 0;
let pose = 1;

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
