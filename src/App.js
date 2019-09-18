import React, { Component } from 'react';

import { Map, TileLayer, Marker, Tooltip, Polyline } from 'react-leaflet';
import L from 'leaflet';
import './App.css';

import tower0 from './resources/tower0.png';
import tower1 from './resources/tower1.png';
import tower2 from './resources/tower2.png';
import tower3 from './resources/tower3.png';
import tower4 from './resources/tower4.png';
import towerS from './resources/towerS.png';

import lab0 from './resources/lab0.png';
import lab1 from './resources/lab1.png';
import lab2 from './resources/lab2.png';
import lab3 from './resources/lab3.png';
import lab4 from './resources/lab4.png';
import labS from './resources/labS.png';

delete L.Icon.Default.prototype._getIconUrl;

function getInfectionLevelString(number) {
  number += 1;

  return {
    0: "Cured",
    1: "No Risk",
    2: "Low Risk",
    3: "High Risk",
    4: "Outbreak",
    5: "Cured Lab",
    6: "No Risk Lab",
    7: "Low Risk Lab",
    8: "High Risk Lab",
    9: "Outbreak Lab",
    10: "Safe",
    11: "Safe Lab",
  }[number]
}

function getAirportIcon(number) {
  number +=1;

  return L.icon({
    iconUrl: ((level) => {
      switch (level) {
        case 0: return tower0;
        case 1: return tower1;
        case 2: return tower2;
        case 3: return tower3;
        case 4: return tower4;
        case 5: return lab0;
        case 6: return lab1;
        case 7: return lab2;
        case 8: return lab3;
        case 9: return lab4;
        case 10: return towerS;
        case 11: return labS
        default: return null;
      }
    })(number),
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, 0]
  });
}

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function getAirports() {
  return fetch(process.env.API_URL + "/api/airports/allAirports")
    .then(res => res.json())
    .catch(err => console.error(err));
}

function getLines() {
  return fetch(process.env.API_URL + "/api/airports/getLines")
    .then(res => res.json())
    .catch(err => console.error(err));
}


class App extends Component {

  state = {
    lat: 45.258903771066355,
    lng: 11.242709547379991,
    zoom: 7,
    airports: [],
    lines: [],
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(() => this.tick(), 120000);
  }

  componentDidUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    getAirports()
      .then(airports => {
        this.setState({
          airports: airports,
        });
      });

    getLines()
      .then(lines => {
        this.setState({
          lines: lines,
        });
      });
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <Map className="map" center={position} zoom={this.state.zoom} ref={(ref) => { this.map = ref; }} onZoomEnd={(event) => {this.setState((prevState) => ({...prevState}));}}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${process.env.MAP_KEY}`}
          opacity={0.5}
        />
        {
          //Put in airport Markers and popups
          this.state.airports.map(airport => (
            <Marker
              icon={getAirportIcon(airport.infectionLevel)}
              key={airport.icao}
              position={[airport.latitude, airport.longitude]}>
              { this.map.leafletElement.getZoom() > 6 ? <Tooltip
                offset={[0, 15]}
                permanent={true}
                direction="bottom">
                <b>{airport.icao}: </b>{getInfectionLevelString(airport.infectionLevel)}
              </Tooltip> : ''}
              {/* <Popup>
                <b>{airport.icao}: </b>{getInfectionLevelString(airport.infectionLevel)}
              </Popup> */}
            </Marker>
          ))
        }
        {
          //Put in lines
          this.state.lines.map(lines => (
            <Polyline
              positions={[lines.from, lines.to]}
            >
            </Polyline>
          ))
        }
      </Map>
    );
  }
}

export default App;
