import { SafeAreaView, StyleSheet, View } from 'react-native'
import ExpPreview from './Components/ExpPreview'
import Input from './Components/Input'
import Output from './Components/Output'
import Colors from './Libs/Colors'
import { AlgebraicExpProvider } from './Context/AlgebraicExpContext'
import { RootSiblingParent } from 'react-native-root-siblings';



export default function App() {

  return (

    <RootSiblingParent>
      <AlgebraicExpProvider>
        <SafeAreaView style={styles.container}>
          <Input />
          <View style={{...styles.container, ...styles.displayContainer}}>
            <Output />
            <ExpPreview />
          </View>
        </SafeAreaView>
      </AlgebraicExpProvider>
    </RootSiblingParent>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  displayContainer: {
    backgroundColor: Colors.GRAY,
    borderBottomLeftRadius : 45,
    borderBottomRightRadius : 45,
    marginBottom: 10
  }
})
