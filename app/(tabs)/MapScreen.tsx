import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useMarkers } from '../../hooks/useMarkers';
import MapComponent from '../../components/MapComponent';
import { Marker } from '../../components/marker';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MapScreen: React.FC = () => {
  const { markers, loading, error } = useMarkers();
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // 로그인 상태 확인 (AsyncStorage에서 token 확인)
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        // 로그인되지 않으면 로그인 화면으로 이동
        router.replace('/LoginScreen');
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (error) {
        setNotice(`마커 데이터를 불러오는 데 실패했습니다: ${error}`);
      } else if (markers.length === 0) {
        setNotice('표시할 마커 데이터가 없습니다.');
      }
    }
  }, [loading, error, markers]);

  const handleMarkerPress = (marker: Marker) => {
    setSelectedMarker(marker);
  };

  const closeNotice = () => {
    setNotice(null);
  };

  return (
    <View style={styles.container}>
      <MapComponent markers={markers} onMarkerPress={handleMarkerPress} />
      {loading && (
        <View style={styles.loadingOverlay}>
          <Text>Loading...</Text>
        </View>
      )}
      {notice && (
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>{notice}</Text>
          <TouchableOpacity onPress={closeNotice} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedMarker && (
        <View style={styles.markerInfo}>
          <Text style={styles.title}>{selectedMarker.road_nm_addr}</Text>
          <Text>{selectedMarker.bldg_num_addr}</Text>
          <Text>시/도: {selectedMarker.si_nm}</Text>
          <Text>구: {selectedMarker.sig_nm}</Text>
          <Text>주차 공간: {selectedMarker.fz_pk_unit}대</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  noticeContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  noticeText: {
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  markerInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default MapScreen;
