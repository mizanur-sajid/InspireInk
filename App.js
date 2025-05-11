import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/utils/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import DetailScreen from './src/screens/DetailScreen';
import StatsScreen from './src/screens/StatsScreen';

const Stack = createNativeStackNavigator();

const linking = {
  enabled: Platform.OS === 'web',
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: '',
      Journal: 'write',
      History: 'history',
      Detail: 'entry',
      Stats: 'stats'
    }
  }
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer
          linking={linking}
          fallback={null}
          documentTitle={{
            formatter: (options, route) => {
              if (options?.title) return `${options.title} - InspireInk`;
              return 'InspireInk';
            }
          }}
        >
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#ffffff',
              },
              headerTintColor: '#000000',
              headerBackTitleVisible: false,
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Journal" 
              component={JournalScreen}
              options={{ 
                title: 'Write Entry',
                headerBackTitle: 'Home'
              }}
            />
            <Stack.Screen 
              name="History" 
              component={HistoryScreen}
              options={{ 
                title: 'Journal History',
                headerBackTitle: 'Home'
              }}
            />
            <Stack.Screen 
              name="Detail" 
              component={DetailScreen}
              options={{ 
                title: 'Entry Details',
                headerBackTitle: 'History'
              }}
            />
            <Stack.Screen 
              name="Stats" 
              component={StatsScreen}
              options={{ 
                title: 'Writing Stats',
                headerBackTitle: 'Home'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}