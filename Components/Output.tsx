import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../Libs/Colors'
import { AlgebraicExpContext } from '../Context/AlgebraicExpContext'

export default function Output(): React.JSX.Element {

    const { algebraicExp } = useContext(AlgebraicExpContext)

    const screenWidth = Dimensions.get('window').width

    const styles = StyleSheet.create({
        txt: {
            color: Colors.WHITE,
            textAlign: 'right',
            fontSize: screenWidth / 3.3,
            paddingHorizontal: screenWidth * 0.04,
        }
    })
    console.log(algebraicExp)
    return (
        <Text style={styles.txt}>{(algebraicExp.currentExp === '') ? '0' : algebraicExp.currentExp}</Text>
    )
}
