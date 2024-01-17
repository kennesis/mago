import React from 'react';
import {
    Text,
    View,
    Pressable,
    StyleSheet,
    Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const ITEM_WIDTH = screenWidth / 7;

function 하루를그리다(하루, 순서, isDarkMode) {
    // console.log(하루);

    let color = isDarkMode ? 'white' : 'black';
    let borderWidth = 0;

    if(순서 === 0) {
        color = 'rgba(255, 0, 0, 0.8)';
    } else if(순서 === 6) {
        color = 'cornflowerblue';
    }

    if(하루.설) {
        color = 'rgba(255, 0, 0, 0.8)';
    };

    if(하루.선택날짜) {
        borderWidth = 1;
    }

    return (
        <Pressable
            key={`day${순서}`}
            onPress={() => {}}>
            <View style={{ ...style.day, borderWidth, width: ITEM_WIDTH, paddingTop: borderWidth === 0 ? 5 : 3 }}>
                <Text style={{ color, fontSize: 15, fontWeight: '700' }}>{하루.설 && "설(旦)"}{하루.표시날짜}</Text>
                <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 10 }}>
                {
                    하루.양력날짜 ?
                    `${하루.양력날짜.getMonth() + 1}.${하루.양력날짜.getDate()}` : 
                    null
                }  
                </Text>
            </View>
        </Pressable>
    );
}

const style = StyleSheet.create({
    day: {
      borderColor: 'gray',
      borderRadius: 5,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }
  });

export default 하루를그리다;