import { SafeAreaView, StyleSheet } from 'react-native'
import Input from './Components/Input'
import Output from './Components/Output'
import Colors from './Libs/Colors'
import { AlgebraicExpProvider } from './Context/AlgebraicExpContext'
import { RootSiblingParent } from 'react-native-root-siblings';



export default function App() {
  const makePercentCalc = () => {

    let test = "-33*-33/-0.550%-88+*66%+99.5+0%-0%-0-20-80-60%"
    const expArr = test.split(/([\%])/)
    if(!test.includes('%')) {
      return test
    }

    const exp = []

    for(let i = 1; i < expArr.length; i += 2) {
      const expToEval = expArr[i-1].split(/([\+\-\*\/])/).reverse()

      if(!expToEval.includes('-') || !expToEval.includes('+')) {
        
      }

    }

    exp.push(expArr[expArr.length - 1])
    console.log(expArr)
}

makePercentCalc() 
  return (
    <RootSiblingParent>
      <AlgebraicExpProvider>
        <SafeAreaView style={styles.container}>
          <Input />
          <Output />
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
  }
})
