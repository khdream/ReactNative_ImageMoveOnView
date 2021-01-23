import React from 'react';

import {
  Dimensions,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const img = require('./assets/image.png');
const imgAreaDimensions = 0;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
    };
    this.zoom = new Animated.Value(1);
    this.x = new Animated.Value(0);
    this.y = new Animated.Value(0);
  }

  setZoom(zoom) {
    // change the zoom immediately
    this.zoom.setValue(zoom);
  }
  
  setCenter(x, y) {
    let newX = 0;
    let newY = 0;

    if (this.state.zoom > 1) {
      imgAreaDimensions = this.getImageAreaDimensions();

      if (x != 0 && y != 0) {
        newX = (imgAreaDimensions.width / 2) - x;
        newY = (imgAreaDimensions.height / 2) - y;
      }
    }

    // this make the center move directly
    this.x.setValue(newX);
    this.y.setValue(newY);
  }

  getImageAreaDimensions() {
    return {
      width: screenWidth,
      height: screenHeight / 2
    };
  }
  getDimensionsToFitArea(image, areaDimensions) {
    const verticalFactor = areaDimensions.height / image.height;
    const horizontalFactor = areaDimensions.width / image.width;

    const imageFactor = Math.min(verticalFactor, horizontalFactor);

    return {
      width: image.width * imageFactor,
      height: image.height * imageFactor,
    };
  }

  render() {
    const imgDimensions = this.getDimensionsToFitArea(img, {
      width: imgAreaDimensions.width,
      height: imgAreaDimensions.height,
    });
    return (
      <View>
        <Text>aaa</Text>
        <Animated.Image
        style={{
          width: imgDimensions.width,
          height: imgDimensions.height,
          transform: [
            { translateX: this.x },
            { translateY: this.y },
            { scaleX: this.zoom },
            { scaleY: this.zoom }
          ]
        }}
        source={img}
        />
      </View>
    );
  }
}
