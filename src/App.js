import { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Body from "./components/Body/Body";
import Map from "./components/Map/Map";
import Footer from "./components/Footer/Footer";
import Plots from "./components/Plots/Plots";
// import Analysis from "./components/Analysis/Analysis";
import Second from "./components/Second/Second";
import Form from "./components/Form/Form";

import "leaflet/dist/leaflet.css";

function App() {
  const [info, setInfo] = useState([4323454, 12324563, 314523]);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  const mapCenter = {
    lat: 19.943922,
    lng: 77.568443,
  };
  const mapZoom = 5;
  const [mapStates, setMapStates] = useState([]);
  const dataapi = "https://0073485d98c9.ngrok.io/popup/india";
  const statesapi = "https://disease.sh/v3/covid-19/countries";
  const labels_body = ["1st Dose", "2nd Dose", "Vac. Rate"];

  useEffect(() => {
    fetch(dataapi)
      .then((res) => res.json())
      .then((data) => {
        console.log([data.first, data.second, data.latest]);
        setInfo([data.first, data.second, data.latest]);
        setLabel(data.label);
        setData(data.data);
        setLabels(data.labels);
      });
  }, [dataapi]);

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
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <header className="App-header">
            {/* Navabar */}
            <Navbar />
            <div className="front">
              <div className="mapbod">
                <div className="mapbod__left">
                  <Map states={mapStates} center={mapCenter} zoom={mapZoom} />
                </div>
                <div className="mapbod__right">
                  <div>
                    <Body labels={labels_body} info={info} analysis={true} />
                  </div>
                </div>
              </div>
              <div className="front__analysis">
                <Plots
                  labelp={label}
                  labelsp={labels}
                  datap={data}
                  apip="graph"
                />
              </div>
            </div>

            <Footer />
          </header>
        </Route>
        <Route path="/index">
          <Redirect to="/" />
        </Route>
        <Route path="/second">
          <Second />
        </Route>
        <Route path="/require">
          <Form />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
