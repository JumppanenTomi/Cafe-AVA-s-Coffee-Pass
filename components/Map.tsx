"use client";

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Link from "next/link";

/**
 * Renders a map component.
 *
 * @param {number} height - The height of the map component.
 * @param {string} width - The width of the map component.
 * @returns {JSX.Element} The map component.
 */
export default function Map({height = 300, width = "maxContent"}: {height?: number, width?: any}) {
	const lat = 60.1842447
	const lng = 24.948159

	return (
		<MapContainer
			className={'rounded-md shadow z-0'}
			preferCanvas={true}
			center={[lat, lng]}
			zoom={16}
			scrollWheelZoom={true}
            style={{height: height, width: width}}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[lat, lng]}>
				<Popup>
					<Link target={"_blank"} href={'https://maps.app.goo.gl/J6a6zPKVC3BUZftt9'}>Open in Google
						maps</Link>
				</Popup>
			</Marker>
		</MapContainer>
	);
}