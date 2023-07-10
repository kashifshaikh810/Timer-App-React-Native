import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, Pressable, Platform} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const App = () => {
  const [secondsLeft, setSecondsLeft] = useState(3601);
  const [timerOn, setTimerOn] = useState(false);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };

  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };

  useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);

  useEffect(() => {
    if (secondsLeft === 0) BackgroundTimer.stopBackgroundTimer();
  }, [secondsLeft]);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View
        style={{
          width: '100%',
          maxHeight: 50,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#b3b3b3',
          paddingTop: Platform.OS === 'ios' ? 20 : 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 20,
            fontWeight: '500',
          }}>
          Timer App
        </Text>
      </View>

      {/* content */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            width: '90%',
            height: 300,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'gray',
            backgroundColor: '#b3b3b3',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <View>
            <Text
              style={{
                fontSize: 70,
                textAlign: 'center',
                color: '#fff',
                fontWeight: '400',
              }}>
              {clockify().displayHours} Hours
            </Text>
            <Text
              style={{
                fontSize: 70,
                textAlign: 'center',
                color: '#fff',
                fontWeight: '400',
              }}>
              {clockify().displayMins} Mins
            </Text>
            <Text
              style={{
                fontSize: 70,
                textAlign: 'center',
                color: '#fff',
                fontWeight: '400',
              }}>
              {clockify().displaySecs} Secs
            </Text>
          </View>
        </View>
        <View>
          <Pressable
            onPress={() => setTimerOn(timerOn => !timerOn)}
            style={({pressed}) => ({
              padding: 15,
              paddingHorizontal: 50,
              marginVertical: 20,
              backgroundColor: pressed ? 'gray' : '#b3b3b3',
              borderRadius: 7,
              borderWidth: 2,
              borderColor: 'gray',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            })}>
            {({pressed}) => (
              <Text style={{color: pressed ? 'black' : '#fff'}}>
                Start/Stop
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default App;
