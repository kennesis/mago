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

function 시공간을열다() {
  let 시공간 = [];
  // 중첩 for 문 고민
  for(let 하늘 = 0; 하늘 < 소력().기.수; 하늘++) {

    const 공간 = 0;

    const 사람의아름다움 = 666;

    const 땅 = 소력().요.요일.reduce((시간, 지금, 날짜) => {
      // 지금 = 시간 += 지금;

      시공간.push(
        <View style={{
          flex: 1,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: '#ffffff',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row'
        }}>
        {
          <View style={{ flexDirection: 'row' }}>
            {/* <Text style={{ color: 'white' }}>{하늘}</Text> */}
            {/* <Text style={{ color: 'white' }}>{땅}</Text> */}
            {/* <Text style={{ color: 'transparent' }}>{사람의아름다움}</Text> */}
            <Text style={{ color: 'white' }}>{날짜}</Text>
          </View>
        }
        </View>
      );

      return 지금, 하늘;
    });

  }
  return 시공간;
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
            <Text style={{ alignSelf: 'center' }}>
              {달력}
            </Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
              { 소력().요.요일.map((영원한, 순간) => {
                let 요일 = '';
                switch (순간) {
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
                return <Text key={순간}>{요일}</Text>
              }) }
            </View>
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#000000' }}>
              { 시공간을열다() }
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textColor: 'black',
});

export default App;
