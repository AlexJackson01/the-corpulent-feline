import React, {Component, useState} from 'react';
import {View, Image} from 'react-native';
import Images from '../../assets/Images'

        
class Floor extends Component {
  render() {
    const width = this.props.body.bounds.max.x;
    const height = this.props.body.bounds.max.y
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    const imageIterations = Math.ceil(width / height)

    return (
      <View
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: width,
          height: height,
          overflow: 'hidden',
          flexDirection: 'row'
        }}>
            {Array.apply(null, Array(imageIterations)).map((el, i) => {
                return <Image style={{width: height, height: height}} key={i} resizeMode='center' source={Images.clouds} />
            })}

        </View>
    );
  }
}

export default Floor;