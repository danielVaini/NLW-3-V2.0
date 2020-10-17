import React, { useEffect, useState } from 'react';


import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import mapMarker from '../images/map-marker.png'
import { useNavigation,  useFocusEffect } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

const AnimatableIcon = Animatable.createAnimatableComponent(Marker);

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  })

  function handleNavigateToDetails(id: number) {
    navigation.navigate('OrphanagesDetails', { id });
  }
  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (

    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
         
          latitude:  -23.5678213,
          longitude: -46.7188515,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >

        {orphanages.map(orphanage => {
          return (
            <AnimatableIcon
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}

              animation="tada"
              iterationCount={5}
              
              
              delay={2000}
              useNativeDriver



            >
              <Callout tooltip={true} onPress={() => handleNavigateToDetails(orphanage.id)} >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText} >{orphanage.name}</Text>
                </View>
              </Callout>

            </AnimatableIcon>
          );
        })}

      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}> {orphanages.length} orfanatos encontrados</Text>

        <RectButton style={styles.createOrphanagesButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',

  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,

  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3'
  },
  createOrphanagesButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  }
});
