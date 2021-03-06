import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ }) => {

    const position = [35, -40]
    const zoom = 2

    return <div className="map" id="mapId">
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    </div>
}

export default Map