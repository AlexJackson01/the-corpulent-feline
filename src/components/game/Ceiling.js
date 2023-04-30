import React, {Component, useState} from 'react';
import {View, Image} from 'react-native';
import Images from '../../assets/Images'

        
class Floor extends Component {
  render() {
    const width = this.props.body.bounds.max.x;
    const height = this.props.body.bounds.max.y
    const x = this.props.body.position.x - 450;
    const y = this.props.body.position.y - height;

    const imageIterations = Math.ceil(width / height)

    return (
      <View
        style={{
          position: 'absolute',
          top: x,
          left: y,
          width: width,
          height: height,
        //   overflow: 'hidden',
          flexDirection: 'row'
        }}>
            {Array.apply(null, Array(imageIterations)).map((el, i) => {
                return <Image style={{width: height, height: height}} key={i} resizeMode='center' source={Images.cloudsTop} />
            })}

        </View>
    );
  }
}

export default Floor;
