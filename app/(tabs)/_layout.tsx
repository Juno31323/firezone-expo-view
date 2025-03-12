import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useSegments } from 'expo-router';
import { IconSymbol } from '../../components/ui/IconSymbol'; // IconSymbol import

export default function TabLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const segments: string[] = useSegments();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);

      // "MapScreen" 접근 시 로그인 확인
      if (!token && segments.includes('MapScreen')) {
        router.replace('./LoginScreen');
      }
    };
    checkLoginStatus();
  }, [segments]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f44336',
        tabBarInactiveTintColor: '#757575',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="house.fill" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="MapScreen"
        options={{
          title: '지도',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="firetruck" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (!isLoggedIn) {
              e.preventDefault(); // 기본 이동 방지
              router.push('/(auth)/LoginScreen');
            }
          },
        }}
      />
    </Tabs>
  );
}