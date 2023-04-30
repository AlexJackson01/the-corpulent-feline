import React, {Component} from 'react';
import {View} from 'react-native';
import Matter from 'matter-js';
import Constants from './Constants';

let tick = 0
let pose = 1

const Physics = (entities, {touches, time, dispatch}) => {
  let engine = entities.physics.engine;
  let cat = entities.cat.body;

  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      Matter.Body.applyForce(cat, cat.position, {x: 0.0, y: -0.1});
    });



  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, 'collisionStart', (event) => {
    dispatch({type: 'game_over'})
  })

  Object.keys(entities).forEach(key => {
    if (key.indexOf("floor") === 0) {
      if (entities[key].body.position.x <= -1 * Constants.MAX_WIDTH / 2) {
        Matter.Body.setPosition(entities[key].body, {x: Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2), y: entities[key].body.position.y})
      } else {
      Matter.Body.translate(entities[key].body, {x: -2, y: 0})
      }
    }
  })


  tick += 1
  if (tick % 5 === 0) {
    pose = pose + 1
    if (pose > 10) {
      pose = 1
    }
    entities.cat.pose = pose;
  }

  return entities;
};

export default Physics;
