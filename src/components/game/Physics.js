import React, {Component} from 'react';
import {View} from 'react-native';
import Matter from 'matter-js';
import Constants from './Constants';

const Physics = (entities, {touches, time, dispatch}) => {
  let engine = entities.physics.engine;
  let cat = entities.cat.body;

  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      Matter.Body.applyForce(cat, cat.position, {x: 0.0, y: -0.1});
    });

  for (let i = 1; i <= 4; i++) {
    if (
      entities['building' + i].body.position.x <=
      -1 * (Constants.BUILDING_WIDTH / 2)
    ) {
      Matter.Body.setPosition(entities['building' + i].body, {
        x: Constants.MAX_WIDTH * 2 - Constants.BUILDING_WIDTH / 2,
        y: entities['building' + i].body.position.y,
      });
    } else {
      Matter.Body.translate(entities['building' + i].body, {x: -1, y: 0});
    }
  }

  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, 'collisionStart', (event) => {
    dispatch({type: 'game_over'})
  })

  return entities;
};

export default Physics;
