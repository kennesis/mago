import React from 'react';
import {
    View,
    Dimensions
} from 'react-native';
import 한주를그리다 from './Week';

const screenWidth = Dimensions.get('screen').width;

function 한달을그리다(한달, 순서, isDarkMode) {
    // console.log(한달);
    return (
        <View
            key={`month${순서}`}
            style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'column',
                width: screenWidth
            }}
        >
            {한달.한달.map((한주, 순서) => 한주를그리다(한주, 순서, isDarkMode))}
        </View>
    );
}

export default 한달을그리다;