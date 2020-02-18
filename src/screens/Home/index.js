import React, { Component } from 'react'
import {
  View,
  Text,
  Button } from 'react-native'
// I changed this to export default App
class BluetoothScanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={{ padding: 50 }}>
        <Text>Bluetooth scanner</Text>
        <Button onPress={() => {}} title="Start scanning" />
        <Button onPress={() => {}} title="Stop scanning" />
      </View>
    )
  }
}
export default BluetoothScanner
