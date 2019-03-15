import React from 'react'

import {
  StyleSheet,
  View,
  Text,
  Slider,
  Image
} from 'react-native'

const ThumbImage = require('../assets/Oval.png')
const PinImage = require('../assets/mask.png')

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  sliderContainer: {
    height: 65,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  pinContainer: {
    flex: 1,
    paddingRight: 32,
    marginLeft: 0,
    marginRight: 0
  },
  value: {
    zIndex: 1,
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5 
  },
  pin: {
    marginBottom: 30,
    position: 'absolute',
    paddingBottom: 40
  },
  sliderView: {
    paddingHorizontal: 12
  }
})

class MaterialSlider extends React.Component {

  state = {
    opacity: 0,
  }

  componentWillMount() {
    const { stickyPin } = this.props
    this.setState({ opacity: stickyPin ? 1 : 0 })
  }

  componentWillReceiveProps() {
    const { stickyPin } = this.props
    if(stickyPin) {
      this.setState({ opacity: 1 })
    }
  }

  onSlidingComplete = () => {
    const { stickyPin } = this.props

    this.setState({ opacity: stickyPin ? 1 : 0 })

    const { onSlidingComplete } = this.props

    if(onSlidingComplete) {
      onSlidingComplete()
    }
  }

  onValueChange = value => {
    this.setState({ opacity: 1 })

    const { onValueChange } = this.props

    if(onValueChange) {
      onValueChange(value)
    }
  }
  
  render() {

    const {
      value,
      minimumValue = 0,
      maximumValue = 100,
      step = 1,
      thumbTintColor = "transparent",
      minimumTrackTintColor = "#8ec95d",
      maximumTrackTintColor = "#d6d9db",
      thumbImage = ThumbImage,
      pinImage = PinImage
    } = this.props

    const { opacity } = this.state

    const sliderThumb = {
      position: 'absolute',
      left: `${value}%`,
      top: -10,
      flex: 1,
      width: 32,
      height: 70,
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
  
          <View style={[styles.pinContainer, { opacity }]}>
            <View style={sliderThumb}>
              <Text style={styles.value}>{value}</Text>
              <View style={styles.pin}>
                <Image source={pinImage} />
              </View>
            </View>
          </View>
  
          <View style={styles.sliderView}>
            <Slider
              value={value}
              minimumValue={minimumValue}
              maximumValue={maximumValue}
              step={step}
              thumbTintColor={thumbTintColor}
              minimumTrackTintColor={minimumTrackTintColor}
              maximumTrackTintColor={maximumTrackTintColor}
              onValueChange={this.onValueChange}
              onSlidingComplete={this.onSlidingComplete}
              thumbImage={thumbImage}
            />
          </View>

        </View>
      </View>
    )
  }

}


export default MaterialSlider