import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap() {
    // const defaultProps = {
    //     center: {
    //         lat: 32.0853,
    //         lng: 34.7818
    //     },
    //     zoom: 11
    // };

    const [coordinates, setCoordinates] = useState({
        lat: 32.0853,
        lng: 34.7818
    })

    function handleClick({ lat, lng }) {
        setCoordinates({ lat, lng })
    }

    const zoom = 11
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyA5YAKbctMWmj2etXv-KY7MSXDMGaWr0qs" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
                onClick={handleClick}
            >
                <AnyReactComponent
                    {...coordinates}
                    text="🍎🍎🍎🍎"
                />
            </GoogleMapReact>
        </div>
    );
}