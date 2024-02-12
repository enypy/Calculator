import React from 'react'
import type { PropsWithChildren } from 'react'
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native'
import Login from './App/Screens/LoginScreen/Login'


type SectionProps = PropsWithChildren<{
    title: string
}>


function App(): React.JSX.Element {

    return (
        <View>
            <Login/>
        </View>
    )
}


export default App
