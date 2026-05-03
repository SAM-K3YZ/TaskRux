import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { light, radius } from '@/constants/theme'
import { DotProp } from '@/types'

const Dot = ({style} :DotProp) => {
  return (
    <View style={[styles.container, style]}>
    </View>
  )
}

export default Dot

const styles = StyleSheet.create({
    container:{
        width: 5,
        height: 5, 
        borderRadius: radius.full,
        backgroundColor: light.textSecondary,
    }
})