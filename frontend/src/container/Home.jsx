import axios from "axios";
import L from "leaflet";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import markerDepot from "../asset/marker-depot.svg";
import marker from "../asset/marker.svg";

function Home() {
  const [map, setMap] = useState(null);
  const [data, setData] = useState([]);
  const [selectedDepot, setSelectedDepot] = useState({});
  let mapPointer = L.icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
  });
  let depotPointer = L.icon({
    iconUrl: markerDepot,
    iconRetinaUrl: markerDepot,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
  })
  const fetchData = () => {
    axios
      .get("http://127.0.0.1:5000/api/depot")
      .then((response) => {
        console.log("SUCCESS", response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (!map) return;
    if (isEmpty(data)) return;
    const markers = [];
    data.forEach((depot) => {
      const marker = L.marker(
        { lat: depot.latitude, lng: depot.longitude },
        { icon: depot.type === "depot" ? mapPointer : depotPointer }
      ).bindPopup(
        `<div>Type: ${depot.type}<br/> Name: <span>${depot.name}<span><div>`
      ).addEventListener("click", (e) => {
        console.log(depot)
        setSelectedDepot(depot);
      });
      markers.push(marker);
    });
    var group = L.featureGroup(markers).addTo(map);
    map.fitBounds(group.getBounds());
  }, [map]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {isEmpty(data) && (
        <div
          className="w-screen flex items-center justify-center"
          style={{ height: "calc(100vh - 100px)" }}
        >
          No Records to Show
        </div>
      )}
      {!isEmpty(data) && (
        <MapContainer whenCreated={setMap} center={[51.505, -0.09]} zoom={14}>
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          />
        </MapContainer>
      )}
    </div>
  );
}

export default Home;
