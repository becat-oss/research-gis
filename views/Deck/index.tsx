import React from 'react';
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';
//import StaticMap from 'react-map-gl';
import Map from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2F0c3V5YWJlY2F0IiwiYSI6ImNsM3YzanN2MjA2b3QzY3BsbWNsaHptOGEifQ.q2EDY5FXn-RxupEu9OeyPA';

const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const data = [
  {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
];

// DeckGL react component
export default function Deck() {
  const layers = [
    new LineLayer({id: 'line-layer', data})
  ];

  return <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}>
        <Map
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14
          }}
          style={{width: 600, height: 400}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>;
}