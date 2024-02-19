import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../Libs/Colors'
import { AlgebraicExpContext } from '../Context/AlgebraicExpContext'

export default function Output(): React.JSX.Element {

    const { algebraicExp } = useContext<any>(AlgebraicExpContext)

    const screenWidth = Dimensions.get('window').width

    const styles = StyleSheet.create({
        container: {
            flex: 3,
            justifyContent: 'center',

        },
        txt: {
            color: Colors.WHITE,
            textAlign: 'right',
            fontSize: 333,
            paddingHorizontal: screenWidth * 0.04,
        }
    })


    return (
        <View style={styles.container}>
        <Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.txt}>{(algebraicExp.currentExp === '') ? '0' : algebraicExp.currentExp}</Text>
        </View>
    )
}
