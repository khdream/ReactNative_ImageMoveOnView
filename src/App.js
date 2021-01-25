/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Button, Dimensions} from 'react-native';
import Draggable from '../Draggable'; // first, run "npm run source" to get Draggable.js
import ChildComponent from './ChildComponent';

const {width, height} = Dimensions.get('window');
export default function App() {
  const [renderCount, setRenderCount] = React.useState(1);
  const [shouldReverse, setShouldReverse] = React.useState(false);
  const [drag01, setDrag01] = React.useState({x:100, y:200});
  const [source, setSource] = React.useState(require('../img/trump1.png'));

  const changeFace = () => {
    console.log('drag release');
    setSource(require('../img/trump2.png'));
  };

  return (
    <View>
      <Draggable x={10} y={10}>
        <ChildComponent />
      </Draggable>
      <Draggable
        debug
        renderColor="#555"
        renderSize={64}
        x={width * 0.75}
        y={height - 100}
        minX={width / 2}
        maxX={width}
        minY={height - 200}
        maxY={height - 20}
        renderText="💩"
        imageSource={source}
      />
      <Draggable
        debug
        isCircle={true}
        imageSource={source}
        renderSize={64}
        minX={100}
        x={50}
        y={250}
        z={0}
        shouldReverse={true}
        onDrag={() => console.log('drag')}
        onShortPressRelease={() => console.log('short press release')}
        onDragRelease={changeFace}
        onLongPress={() => console.log('long press')}
        onPressIn={() => console.log('in press')}
        onPressOut={() => console.log('out press')}
        onRelease={(e, wasDragging) =>
          console.log(`was dragging is ${wasDragging}`)
        }
        // TODO onRelease={() => console.log('release')}
      />
      <Draggable
        debug
        renderSize={128}
        renderColor="black"
        x={200}
        y={300}
        minX={0}
        maxX={width}
        minY={300}
        maxY={300}
        renderText="Constrained Slider"
        shouldReverse={true}
        onShortPressRelease={() => alert('touched!!')}
      />
      <Button
        title={`Cause rerender ${renderCount} of the parent`}
        onPress={() => setRenderCount(renderCount + 1)}
      />
      <Draggable debug y={20} z={5} renderColor={'yellowgreen'} />
      <Button
        title={`Reverse Draggable01`}
        onPress={() => {
          setShouldReverse(true);
        }}
      />
      <Draggable 
        renderText="Draggable01" 
        renderSize={50} 
        renderColor="yellow" 
        x={drag01.x} 
        y={drag01.y} 
        shouldReverse={shouldReverse} 
        onReverse={()=>{
          setShouldReverse(false);
          return {x:0, y:100}
        }}/>
    </View>
  );
}

