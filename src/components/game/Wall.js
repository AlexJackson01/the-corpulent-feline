import React, {Component, useState} from 'react';
import {View} from 'react-native';
        
class Wall extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <View
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: width,
          height: height,
          zIndex: 1000,
          backgroundColor: this.props.color,
        }}></View>
    );
  }
}

export default Wall;
