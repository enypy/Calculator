import { Text, TouchableHighlight, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../Libs/Colors'
import { AlgebraicExpContext } from '../Context/AlgebraicExpContext'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Button({ text, btnColor, txtColor, isBig = false, icon=false }: ButtonParams): React.JSX.Element {
    const buttonSize = Dimensions.get('window').width * 0.20

    const { dispatch } = useContext(AlgebraicExpContext)

    const styles = StyleSheet.create({
        btn: {
            width: isBig ? buttonSize * 2.2 : buttonSize,
            height: buttonSize,
            borderRadius: buttonSize / 2,
            backgroundColor: btnColor ?? Colors.GRAY,
            marginBottom: buttonSize / 20 * 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: isBig ? 'row' : 'column'
        },
        txt: {
            color: txtColor ?? Colors.WHITE,
            fontSize: buttonSize / 2.2,
        }
    })


    return (
        <TouchableOpacity onPress={() => { dispatch({ payload: text }) }}>
            <View style={styles.btn}>
                {icon ?  <MaterialCommunityIcons name={icon} color={txtColor ?? Colors.WHITE} size={styles.txt.fontSize / 1.3} /> : <Text style={styles.txt}>{text}</Text>}
                {isBig && <Text style={{ ...styles.txt, color: 'transparent' }}>{text}</Text>}
            </View>
        </TouchableOpacity>
    )
}
