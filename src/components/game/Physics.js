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



  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, 'collisionStart', (event) => {
    dispatch({type: 'game_over'})
  })

  return entities;
};

export default Physics;
