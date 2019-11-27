import React, { Component } from 'react';

import { Map, TileLayer, Marker, Tooltip, Polyline } from 'react-leaflet';
import L from 'leaflet';
import './App.css';
import io from 'socket.io-client';

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
let YX = "pk.eyJ1IjoiMXJldmVuZ2VyMSIsImEiOiJjazBvbXR2NjMwNXR0M2pteGV3aG5taWsxIn0.RUgSeKpXf66ahA-_0uZthg";

function getInfectionLevelString(number) {
  number += 1;

  return {
    0: "Cured",
    1: "Level 0",
    2: "Level 1",
    3: "Level 2",
    4: "Level 3",
    5: "Cured (Lab)",
    6: "Level 0 (Lab)",
    7: "Level 1 (Lab)",
    8: "Level 2 (Lab)",
    9: "Level 3 (Lab)",
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
  return fetch(process.env.REACT_APP_API_URL + "/api/airports/allAirports")
    .then(res => res.json())
    .catch(err => console.error(err));
}

function getLines() {
  return fetch(process.env.REACT_APP_API_URL + "/api/airports/getLines")
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
    flights: [],
  }


  componentDidMount() {
    this.setState({
      airports: [{icao:"LSGG", latitude: 46.238335, longitude: 6.109445, infectionLevel: 5},
                 {icao:"LFML", latitude: 43.436668, longitude: 5.215,    infectionLevel: 1}],
      lines:    [{from:{lat:46.238335, lng:6.109445}, to:{lat:43.436668, lng:5.215}}],
      flights:  [{callsign:"IHS1503", pos:{lat: 45, lng: 6}, from:{lat:46.238335, lng:6.109445, icao:"LSGG"}, to:{lat:43.436668, lng:5.215, icao:"LFML"}}]
    });

    try {
      this.socket = io(process.env.REACT_APP_API_URL);
      this.socket.on('connect', (data) => {
        // authenticate by emiting
        this.socket.emit();

        this.socket.on("eventLog", (data) => {
        
          // do something
    
        });
      });

    } catch (err) {
      console.error("Oops, could not connect...oh well, use debug data");

    }



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
          url={`https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${process.env.REACT_APP_MAP_KEY || YX}`}
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
        {
          this.state.flights.map(flight => (
            <Marker
              position={flight.pos}
              key={flight.callsign}
              onmouseover={(event) => {
                flight.visible = true;
                this.setState((prevState => ({...prevState})));
              }}
              onmouseout={(event) => {
                flight.visible = false;
                this.setState((prevState => ({...prevState})));
              }}
            >
              { // From line
              flight.visible ? 
                <Polyline
                  color="#ff4f1f"
                  weight={2}
                  positions={[flight.from, flight.pos]}>
                </Polyline> : ''
              }
              { // To line 
              flight.visible ?
                <Polyline
                  className=".toairport-polyline"
                  positions={[flight.pos, flight.to]}>  
                </Polyline> : ''
              }
              <Tooltip
                direction="top">
                <b>Callsign</b>: {flight.callsign}<br></br>
                {flight.from.icao} - {flight.to.icao}
              </Tooltip>
            </Marker>
          )) 
        }
      </Map>
    );
  }
}

export default App;
