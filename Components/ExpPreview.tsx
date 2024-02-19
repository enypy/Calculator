import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../Libs/Colors'
import { AlgebraicExpContext } from '../Context/AlgebraicExpContext'


export default function ExpPreview() {
    const { algebraicExp } = useContext(AlgebraicExpContext)

    const prettierExp = algebraicExp.exp.replace('/', '÷').replace('*', '×').replace('-', '−')

    const screenWidth = Dimensions.get('window').width

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            minWidth: screenWidth,
            borderBottomWidth: 0.4,
            borderColor: Colors.BLACK
        },
        txt: {
            color: Colors.LIGHT_GRAY,
            fontSize: 60,
            paddingHorizontal: screenWidth * 0.04,

        }
    })

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <Text numberOfLines={1} style={styles.txt}>{prettierExp}</Text>
            </View>
        </ScrollView>
    )
}