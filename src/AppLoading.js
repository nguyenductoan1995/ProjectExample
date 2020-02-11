import React from 'react'
import { View, StatusBar } from 'react-native'
import App from 'navgation'

class LoadingAsync extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <App />
      </View>
    )
  }
}

export default LoadingAsync

LoadingAsync.propTypes = {}

LoadingAsync.defaultProps = {}
