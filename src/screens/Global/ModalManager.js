// @flow
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import RNModal from 'react-native-modal'

let instance
class Modal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      formComponent: null,
      touchBackDropToHide: true,
      presentationStyle: undefined,
    }
    instance = this
  }

  onBackdropPress = () => {
    const { touchBackDropToHide } = this.state
    if (touchBackDropToHide) this.hide()
  };

  hide() {
    this.setState({
      show: false,
      formComponent: null,
    })
  }

  show(formComponent, touchBackDropToHide, presentationStyle) {
    const { show } = this.state
    if (!show) {
      this.setState({
        show: true,
        formComponent,
        touchBackDropToHide,
        presentationStyle,
      })
    }
  }

  render() {
    const { show, formComponent, presentationStyle } = this.state
    return (
      <RNModal
        presentationStyle={presentationStyle}
        isVisible={show}
        style={{ margin: 0 }}
        animationIn="fadeInUp"
        animationOut="fadeOut"
        useNativeDriver
        onBackButtonPress={this.onBackdropPress}
        onBackdropPress={this.onBackdropPress}
      >
        {formComponent || <View />}
      </RNModal>
    )
  }
}

const ModalPage = {
  Component: Modal,
  show(formComponent, touchBackDropToHide = true, presentationStyle = undefined) {
    if (instance) {
      instance.show(formComponent, touchBackDropToHide, presentationStyle)
    }
  },
  hide() {
    if (instance) {
      instance.hide()
    }
  },
}

export default ModalPage
