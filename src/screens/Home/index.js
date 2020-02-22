import React, { Component } from 'react'
import {
  View,
  Text,
  Button } from 'react-native'
import { BleManager } from 'react-native-ble-plx'
import { FlatList } from 'react-native-gesture-handler'
import { get } from 'lodash'
// I changed this to export default App
class BluetoothScanner extends Component {
  constructor() {
    super()
    this.manager = new BleManager()
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    const subscription = this.manager.onStateChange((state) => {
      // console.tron.log('state', state)
      if (state === 'PoweredOn') {
        this.scanAndConnect()
        subscription.remove()
      }
    }, true)
  }

  onScan = () => {
    this.setState({ list: [] })
    const subscription = this.manager.onStateChange((state) => {
      // console.tron.log('state', state)
      if (state === 'PoweredOn') {
        this.scanAndConnect()
        subscription.remove()
      }
    }, true)
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      console.tron.log('device name', device)
      const { list } = this.state
      const dif = list ? list.find((item) => get(item, 'id') === get(device, 'id')) : false
      if (!dif) {
        const data = list
        data.push(device)
        this.setState({ list: data })
      }
    })
  }

renderItem = ({ item }) => (
  <View style={{ borderBottomWidth: 1, borderBottomColor: 'red' }}>
    <Text>{item.name}</Text>
    <Text>{item.id}</Text>
  </View>
)

render() {
  const { list } = this.state
  return (
    <View style={{ padding: 50 }}>
      <Text>Bluetooth scanner</Text>
      <Button onPress={this.onScan} title="Start scanning" />
      <Button onPress={() => {}} title="Stop scanning" />
      <FlatList
        data={list}
        keyExtractor={(item, index) => `${index}`}
        renderItem={this.renderItem}
      />
    </View>
  )
}
}
export default BluetoothScanner
