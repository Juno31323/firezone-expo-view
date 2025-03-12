import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Marker } from './marker';

interface MarkerInfoProps {
  marker: Marker | null;
}

const MarkerInfo: React.FC<MarkerInfoProps> = ({ marker }) => {
  if (!marker) return null;

  return (
    <View style={styles.infoBox}>
      <Text style={styles.title}>{marker.road_nm_addr}</Text>
      <Text>{marker.bldg_num_addr}</Text>
      <Text>시/도: {marker.si_nm}</Text>
      <Text>구: {marker.sig_nm}</Text>
      <Text>주차 공간: {marker.fz_pk_unit}대</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {
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

export default MarkerInfo;