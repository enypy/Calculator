import { SafeAreaView, StyleSheet } from 'react-native'
import Input from './Components/Input'
import Output from './Components/Output'
import Colors from './Libs/Colors'
import { AlgebraicExpProvider } from './Context/AlgebraicExpContext'



export default function App() {

  console.log(Number('-05.564'))


  return (
    <AlgebraicExpProvider>
      <SafeAreaView style={styles.container}>
        <Input />
        <Output />
      </SafeAreaView>
    </AlgebraicExpProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    display: 'flex',
    flexDirection: 'column-reverse'
  }
})
