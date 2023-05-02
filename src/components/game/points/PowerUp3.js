import React, {Component, useState} from 'react';
import {View, Image} from 'react-native';
import Images from '../../../assets/Images';

class PowerUp3 extends Component {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x + width;
    const y = this.props.body.position.y + height + 100;

    const powerRatio = 48 / width;
    const powerHeight = 100 * powerRatio;
    const powerIterations = Math.ceil(height / powerHeight);


    return (
      <View
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: 48,
          height: 48,
          zIndex: 1000,
          overflow: 'hidden',
          flexDirection: 'column',
        }}>
          {
            Array.apply(null, Array(powerIterations)).map((el, i) => {
              return (
                <Image
                  style={{width: 48, height: 48}}
                  key={i}
                  resizeMode="stretch"
                  source={Images.power1}
                />
              );
            })
          }
      </View>
    );
  }
}

export default PowerUp3;
