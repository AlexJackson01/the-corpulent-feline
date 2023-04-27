import {useState} from 'react';
import {View} from 'react-native';

const Bird = ({size, body, color}) => {
  const [height, setHeight] = useState(size[0]);
  const [width, setWidth] = useState(size[1]);
  const [x, setX] = useState(body.position.x - width / 2);
  const [y, setY] = useState(body.position.y - height / 2);

  return (
    <View
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: width,
        height: height,
        backgroundColor: color,
      }}>
        
      </View>
  );
};
export default Bird;
