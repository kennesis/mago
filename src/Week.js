import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import 하루를그리다 from './Day';

const screenWidth = Dimensions.get('screen').width;

function 한주를그리다(한주, 순서, isDarkMode) {
    // console.log(한주);

    return (
        <View
            key={`week${순서}`}
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                borderTopWidth: StyleSheet.hairlineWidth,
                borderColor: 'lightgray',
                width: screenWidth
            }}
        >
            {한주.map((하루, 순서) => 하루를그리다(하루, 순서, isDarkMode))}
        </View>
    );
}

export default 한주를그리다;