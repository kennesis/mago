/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const 달력 = '마고력';
let 한기 = 4;
let 육십갑자 = '계묘';
let 단기 = 4356;
let 서기 = 2023;
let 개천 = 5920;

function 한달을세다() {
  let 한달 = [];
  for(let 하늘 = 0; 하늘 < 소력().기.수; 하늘++) {

    let 한주 = [];

    for(let 땅 = 1; 땅 <= 소력().요.수; 땅++) {

      let 하루 = (하늘 * 소력().요.수) + 땅;

      한주.push(하루);
    }

    한달.push(한주);

  }
  return 한달;
}

function 소력() {
  const 사 = {
    이름: '년',
    호칭: '해',
    수: 13
  };
  const 기 = {
    이름: '월',
    호칭: '달',
    수: 4
  };
  const 요 = {
    이름: '일',
    호칭: '별',
    수: 7,
    요일: [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  };
  const 복 = {
    호칭: '요의 끝'
  }

  return {
    사,
    기,
    요,
    복
  };
}

function 한달을그리다(한달) {
  // console.log(한달);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column'
      }}
    >
      {한달.map((한주) => 한주를그리다(한주))}
    </View>    
  );
}

function 한주를그리다(한주) {
  // console.log(한주);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {한주.map((하루) => 하루를그리다(하루))}
    </View>
  );
}

function 하루를그리다(하루) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        height: 100,
      }}>
      <Text style={{ color: 'black' }} key={하루}>{하루}</Text>
    </View>
  );
}

function 요일(날짜) {
  let 요일 = '';
  switch (날짜) {
    case 0:
      요일 = '토';
      break;
    case 1:
      요일 = '일';
      break;
    case 2:
      요일 = '월';
      break;
    case 3:
      요일 = '화';
      break;
    case 4:
      요일 = '수';
      break;
    case 5:
      요일 = '목';
      break;
    case 6:
      요일 = '금';
      break;
  
    default:
      break;
  }
  return 요일;
}

// 오늘을 어떻게 알 것인가?

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: isDarkMode ? 'black' : 'white',
          }}>
            <Text style={{ alignSelf: 'center', color: 'blue' }}>
              {달력}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: 10
              }}>
              { 소력().요.요일.map((날짜, 순서) => <Text key={순서}>{요일(날짜)}</Text>) }
            </View>

            { 한달을그리다(한달을세다()) }

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   textColor: 'black',
// });

export default App;
