import React, { useState, useRef, useCallback } from 'react';

import {
  SafeAreaView,
  StatusBar,
  Text,
  Button,
  useColorScheme,
  View,
  FlatList,
  Dimensions
} from 'react-native';
import { addDays } from 'date-fns';

import 한달을그리다 from './src/Month';

const screenWidth = Dimensions.get('screen').width;

const 사 = 13;
const 기 = 4;
const 요 = 7;

const 서기 = new Date().getFullYear();
const 단기 = 서기 + 2333;
let 양력 = new Date();
// 양력.setFullYear(서기 - 72);
양력.setFullYear(서기 - 3);
양력.setMonth(10);
양력.setDate(21);

function 시작요일(하늘, 땅) {
  let 요일 = 0;

  for(let i = 1; i <= 하늘; i++) {
    if(i % 4 === 1) {
      요일 += 2;
    }
    else 요일 += 1;
  }

  if(하늘 % 4 === 1) {
    if(땅 > 0) 요일 += 1;
  } else {
    요일 += 1;
  }

  return (요일 + 2) % 요;
}

function 초기화(오늘) {
  let 모든날 = [];

  // for(let 하늘 = 단기 - 71; 하늘 < 단기 + 15; 하늘++) {
  for(let 하늘 = 단기 - 2; 하늘 < 단기 + 2; 하늘++) {
    모든날.push(한해를세다(하늘, 오늘));
  }

  // console.log(모든날);

  return 모든날;
}

function 한해를세다(하늘, 오늘) {
  let 한해 = [];

  for(let 땅 = 0; 땅 < 사; 땅++) {
    한해.push(한달을세다(하늘, 땅, 오늘));
  }

  return 한해;
}

function 한달을세다(하늘, 땅, 오늘) {
  let 한달 = [];
  let 판 = 0;
  let 날 = 0;
  let 시작 = false;  

  if(하늘 % 4 === 1 && 땅 === 0) {
    판 = 1;
  }

  let 추가열 = 시작요일(하늘, 땅) === 6 && 판 === 1 ? true : false;

  for(let 해 = 0; 해 <= 4 + 추가열; 해++) {
    let 한주 = [];

    for(let 달 = 0; 달 < 요; 달++) {
      if(해 === 0 && !시작) {
        if(달 === 시작요일(하늘, 땅)) {
          시작 = true;
        } else {
          한주.push(하루를세다(하늘, 땅, 해, 달, 날, 판, 오늘));
          continue;
        }
      }

      한주.push(하루를세다(하늘, 땅, 해, 달, 날, 판, 오늘));
      날++;

    }

    한달.push(한주);
  }

  return {
    한달,
    날짜: {
      해: 하늘,
      달: 땅
    }
  };
}

function 하루를세다(하늘, 땅, 해, 달, 날, 판, 오늘) {
  const 하루 = {};
  
  if(땅 === 0 && 해 === 0 && 달 === 시작요일(하늘, 땅) && 날 === 0) {
    하루.설 = true;
    양력 = addDays(양력, 1);
  }

  if(날 <= 0 || 날 > (기 * 요) + 판) {
    날 = null;
  } else {
    양력 = addDays(양력, 1);
  }

  if(양력.getFullYear() === 오늘.getFullYear() && 양력.getMonth() === 오늘.getMonth() && 양력.getDate() === 오늘.getDate()) {
    하루.선택날짜 = true;
  }

  하루.표시날짜 = 날;
  하루.양력날짜 = 하루.설 || 날 > 0 ? 양력 : null;

  return 하루;
}

function App() {

  console.log(new Date());
  
  const [ data, setData ] = useState(() => {
    return 초기화(new Date()).flat();
  });

  const findToday = useCallback(e => {
    const 오늘 = new Date();
    const 년 = 오늘.getFullYear();
    const 월 = 오늘.getMonth();
    const 일 = 오늘.getDate();
    const today = data?.find(element => {
        const today2 = element.한달.flat().find(item => {
          if(item.양력날짜) {
            return item.양력날짜.getFullYear() === 년 && item.양력날짜.getMonth() === 월 && item.양력날짜.getDate() === 일;
          }
          else return null;
        })
        return today2;
      }
    );
    return today;
  }, [data]);

  const [ 해, 해설정 ] = useState(findToday().날짜.해);
  const [ 달, 달설정 ] = useState(findToday().날짜.달);
  const listRef = useRef();

  const isDarkMode = useColorScheme() === 'dark';

  const renderItem = ({ item, index }) => {
    return 한달을그리다(item, index, isDarkMode);
  };

  const onViewCallBack = useCallback((viewableItems)=> {
    // console.log(viewableItems);
    const item = viewableItems.changed[0].item;
    해설정(item.날짜.해);
    달설정(item.날짜.달);
  }, [data]); // any dependencies that require the function to be "redeclared"

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const getTodayIndex = useCallback(e => {
    const 오늘 = new Date();
    const 년 = 오늘.getFullYear();
    const 월 = 오늘.getMonth();
    const 일 = 오늘.getDate();
    const index = data?.findIndex(element => {
        const index2 = element.한달.flat().findIndex(item => {
          if(item.양력날짜) {
            // console.log(item.양력날짜);
            return item.양력날짜.getFullYear() === 년 && item.양력날짜.getMonth() === 월 && item.양력날짜.getDate() === 일;
          }
          else return false;
        })
        return index2 >= 0;
      }
    );  
    return index;
  }, [data]);

  return (
    <SafeAreaView style={{
      backgroundColor: isDarkMode ? 'black' : 'white',
      flex: 1
    }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? 'black' : 'white'}
      />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: isDarkMode ? 'black' : 'white'
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                title="메뉴"
                onPress={() => console.log('메뉴 오픈')}
              >

              </Button>
              <Text
                style={{
                  alignSelf: 'center',
                  color: isDarkMode ? 'white' : 'black',
                  fontSize: 18,
                  fontWeight: '700'
                }}>
                {달 === 0 ? `${해}(${해 - 1})` : 해}년 {달 === 0 ? '정한달' : 달 + '월'}
              </Text>
              <Button
                title={'오늘'}
                onPress={() => {
                  listRef.current.scrollToIndex({ animated: false, index: getTodayIndex() })
                  // setCurrentDate(new Date());
                }}>
              </Button>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: 10
              }}>
              { ['해', '달', '화성', '수성', '목성', '금성', '토성'].map((요일, 순서) => {
                  let color;

                  if(순서 === 0) color = 'rgba(255, 0, 0, 0.7)';
                  else if(순서 === 6) color = 'cornflowerblue';
                  else color = isDarkMode ? 'white' : 'black';

                  return (
                    <Text
                      key={순서}
                      style={{ flex: 1, textAlign: 'center', color }}
                    >
                      {요일}
                    </Text>
                  );
                }
              ) }
            </View>

            <FlatList
              style={{ flex: 1 }}
              data={data}
              renderItem={renderItem}
              getItemLayout={(data, index) => ({
                length: screenWidth,
                offset: screenWidth * index,
                index
              })}
              ref={listRef}
              onViewableItemsChanged={onViewCallBack}
              viewabilityConfig={viewConfigRef.current}
              keyExtractor={item => `${item.날짜.해}${item.날짜.달}`}
              removeClippedSubviews={true}
              initialNumToRender={1}
              initialScrollIndex={getTodayIndex()}
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              windowSize={3}
            />

        </View>
    </SafeAreaView>
  );
}

export default App;
