import { Box } from '@chakra-ui/react';
import React, { useContext, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import icon from "./Images/pin-icon.png";
import iconGreen from "./Images/user-pin-icon.png";
import L from "leaflet";
import UserContext from './UserContext';
import { useQuery } from '@tanstack/react-query';
import fetchBins from './fetchBins';

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const { userLocation } = useContext(UserContext);
    const userIcon = new L.Icon({
        iconUrl: iconGreen,
        iconSize: [35, 35],
        iconAnchor: [17, 30]
    });
    const map = useMap();
    
    useEffect(() => {
        if (userLocation.length) {
            const latlng = {
                lat: userLocation[0],
                lng: userLocation[1]
            }
            setPosition(latlng);
            map.flyTo(latlng, map.getZoom())
        } else {
            const position = [51.505, -0.09];
            const latlng = {
                lat: position[0],
                lng: position[1]
            }
            setPosition(null);
            map.flyTo(latlng, map.getZoom())
        }
    }, [userLocation]);
  
    return position === null ? null : (
      <Marker icon={userIcon} position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
}

function Map () {
    const center = [51.505, -0.09];
    const results = useQuery(["map"], fetchBins);
   
    if (results.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">🌀</h2>
            </div>
        )
    }
    const markers = results.data;
    
    const customIcon = new L.Icon({
        iconUrl: icon,
        iconSize: [35, 35],
        iconAnchor: [17, 30]
    });

    return (
        <Box h={'100vh'}>
            <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers && markers.map( ( marker, key ) => {
                    const pos = [marker.data().lat, marker.data().long] ;
                    return (
                        <Marker icon={customIcon} key={key} position={pos}>
                            <Popup>
                                {marker.data().name}
                            </Popup>
                        </Marker>
                    )
                })}

                <LocationMarker />
            </MapContainer>
        </Box>
    )
}

export default Map;