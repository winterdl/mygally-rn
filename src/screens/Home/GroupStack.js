import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const GroupStack = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="Index" component={Group}/>
            <Stack.Screen name="PostDetail" component={PostDetail}/> */}
        </Stack.Navigator>
    )

};

export default GroupStack;
