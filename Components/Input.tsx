import React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import Button from "./Button"
import Colors from "../Libs/Colors"


export default function Input(): React.JSX.Element {

    const screenWidth = Dimensions.get('window').width


    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            padding: screenWidth * 0.02
        },

    })

    return (
        <View style={styles.container}>
            <Button text={'AC'} btnColor={Colors.LIGHT_GRAY} txtColor={Colors.BLACK} />
            <Button text={'±'} btnColor={Colors.LIGHT_GRAY} txtColor={Colors.BLACK} icon={'plus-minus-variant'}/>
            <Button text={'%'} btnColor={Colors.LIGHT_GRAY} txtColor={Colors.BLACK} />
            <Button text={'÷'} btnColor={Colors.YELLOW} />
            <Button text={7} />
            <Button text={8} />
            <Button text={9} />
            <Button text={'×'} btnColor={Colors.YELLOW} />
            <Button text={4} />
            <Button text={5} />
            <Button text={6} />
            <Button text={'−'} btnColor={Colors.YELLOW} />
            <Button text={1} />
            <Button text={2} />
            <Button text={3} />
            <Button text={'+'} btnColor={Colors.YELLOW} />
            <Button text={0}  />
            <Button text={'.'} />
            <Button text={'⌫'} icon={'backspace'} />
            <Button text={'='} btnColor={Colors.YELLOW} />
        </View>
    )
}

