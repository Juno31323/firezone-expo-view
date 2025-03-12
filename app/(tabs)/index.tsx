import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      const storedUsername = await AsyncStorage.getItem('username');
      if (token) {
        setIsLoggedIn(true);
        setUserName(storedUsername || '');
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    router.push('./LoginScreen');
  };

  const handleSignUp = () => {
    console.log('Sign Up pressed');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
    setIsLoggedIn(false);
    router.replace('./(tabs)/index'); // 로그아웃 후 다시 "index" 화면으로 돌아가기
  };

  const handleNavigateToMap = () => {
    router.replace('./(tabs)/MapScreen'); // 지도 화면으로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>소방차전용구역 안내서비스</Text>
      </View>
      <View style={styles.buttonContainer}>
        {isLoggedIn ? (
          // 로그인된 경우
          <View style={styles.loggedInContainer}>
            <Text style={styles.welcomeText}>환영합니다, {userName}님!</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleNavigateToMap}>
              <Text style={styles.buttonText}>지도 화면으로</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // 로그인되지 않은 경우
          <View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    backgroundColor: '#f44336', // 기존 색상 유지
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#f44336', // 기존 색상 유지
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 10,
    width: 190,
    height: 60,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  loggedInContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50', // 환영 메시지 색상
    marginBottom: 20,
  },
});

export default HomeScreen;
