import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Body from "../Body/Body";
import Plots from "../Plots/Plots";
import Map from "../Map/Map";
import Footer from "../Footer/Footer";

import "leaflet/dist/leaflet.css";
import "./Second.css";

function Second() {
  const [mapStates, setMapStates] = useState([]);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  // const [fullData, setFullData] = useState({});
  const [labels_top_left, setLabels_top_left] = useState([]);
  const [info_top_left, setInfo_top_left] = useState([]);
  const [labels_bottom_left, setLabels_bottom_left] = useState([]);
  const [info_bottom_left, setInfo_bottom_left] = useState([]);
  const mapCenter = {
    lat: 14.830563,
    lng: 75.869886,
  };

  const statesapi = "https://disease.sh/v3/covid-19/countries";
  const api = `https://656d7d28489d.ngrok.io/map/state?state=Karnataka`;

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        // setFullData(data);
        console.log(api);
        console.log(data);
        setLabel(data.first.label);
        setData(data.first.data);
        setLabels(data.first.labels);
        setLabels_top_left(data.block1.labels);
        setInfo_top_left(data.block1.info);
        setLabels_bottom_left(data.block2.labels);
        setInfo_bottom_left(data.block2.info);
      });
  }, [api]);

  useEffect(() => {
    const getStatesData = async () => {
      await fetch(statesapi)
        .then((res) => res.json())
        .then((data) => {
          setMapStates(data);
        });
    };
    getStatesData();
  }, [statesapi]);

  return (
    <div className="second">
      <header className="App-header">
        {/* Navabar */}
        <Navbar />
        <div className="front">
          <div className="mapbod">
            <div className="mapbod__left">
              <Map states={mapStates} center={mapCenter} zoom={7} />
            </div>
            <div className="mapbod__right">
              <div className="mapbod__right-top">
                <Body
                  labels={labels_top_left}
                  info={info_top_left}
                  analysis={false}
                />
              </div>
              <div className="mapbod__right-down">
                <Body
                  labels={labels_bottom_left}
                  info={info_bottom_left}
                  analysis={false}
                />
              </div>
            </div>
          </div>
          <div className="front__analysis">
            <Plots labelp={label} labelsp={labels} datap={data} apip="graphs" />
          </div>
        </div>
        <Footer />
      </header>
    </div>
  );
}

export default Second;
