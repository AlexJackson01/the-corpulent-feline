import React, { Component } from 'react';
import { View } from 'react-native';
import Matter from 'matter-js'

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine

    Matter.Engine.update(engine, time.delta)
    return entities
}

export default Physics