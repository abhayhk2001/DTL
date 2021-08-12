import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034", // color in hexadecimal
    rgb: "rgb(204, 16, 52)", // rgb color
    half_op: "rgba(204, 16, 52, 0.5)", //opacity for the border
    multiplier: 100, // size of circle
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

// DRAW CIRCLES on MAP with Interctive tootltop
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((state) => (
    <Circle
      center={[state.countryInfo.lat, state.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      // the bigger the circle the more are the cases
      radius={
        Math.sqrt(state[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${state.countryInfo.flag})` }}
          />
          <div className="info-name">{state.country}</div>
          <div className="info-confirmed">Cases: {state.cases}</div>
          <div className="info-recovered">Recovered: {state.recovered}</div>
          <div className="info-deaths">Deaths: {state.deaths}</div>
        </div>
      </Popup>
    </Circle>
  ));
