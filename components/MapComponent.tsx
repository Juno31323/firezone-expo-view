import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Marker as MarkerType } from './marker';

interface MapComponentProps {
  markers: MarkerType[];
  onMarkerPress: (marker: MarkerType) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ markers, onMarkerPress }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.562316,
        longitude: 126.819132,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.fz_id}
          coordinate={{
            latitude: marker.fz_geom.coordinates[1],
            longitude: marker.fz_geom.coordinates[0],
          }}
          title={marker.road_nm_addr}
          description={marker.bldg_num_addr}
          onPress={() => onMarkerPress(marker)}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;