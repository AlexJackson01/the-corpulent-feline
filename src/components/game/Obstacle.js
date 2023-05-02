import React, {Component, useState} from 'react';
import {View, Image} from 'react-native';
import Images from '../../assets/Images';
        
class Obstacle extends Component {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    const obstacleRatio = 32 / width;
    const obstacleHeight = 32 * obstacleRatio
    const obstacleIterations = Math.ceil(height / obstacleHeight)

    return (
      <View
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: width,
          height: height,
          zIndex: 1000,
          overflow: 'hidden',
          flexDirection: 'column'
        }}>
        {Array.apply(null, Array(obstacleIterations)).map((el, i) => {
          return (
            <Image
              style={{width: width, height: obstacleHeight}}
              key={i}
              resizeMode="stretch"
              source={Images.pipe}
            />
          );
        })}


        </View>
    );
  }
}

export default Obstacle;
