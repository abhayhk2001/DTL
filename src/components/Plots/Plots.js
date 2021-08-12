import { useState } from "react";
import Chart from "../Chart/Chart";
import "./Plots.css";

function Plots({ labelp, labelsp, datap, apip }) {
  const [label, setLabel] = useState("Cummulative");
  const [labels, setLabels] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
    98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112,
    113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127,
    128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142,
    143, 144, 145,
  ]);

  const [data, setData] = useState([
    13594, 66392, 80686, 121466, 138807, 184699, 188971, 191449, 231172, 231607,
    267811, 286089, 307891, 315370, 315370, 316228, 316368, 316638, 330112,
    360592, 386186, 388769, 415403, 441692, 464485, 477005, 491552, 496159,
    496234, 512476, 534058, 565093, 582691, 629420, 654298, 655375, 693964,
    727360, 765669, 789208, 818722, 818722, 818722, 823660, 836350, 857102,
    879036, 909602, 939498, 939926, 1013195, 1071038, 1163844, 1183958, 1300162,
    1357062, 1373224, 1559531, 1676300, 1927246, 2026227, 2284199, 2481149,
    2502109, 2730456, 2846344, 3029544, 3123952, 3285829, 3400617, 3416179,
    3552038, 3669473, 3811007, 3946936, 4298094, 4488656, 4608184, 4823777,
    4997921, 5230642, 5463774, 5789180, 6067099, 6209024, 6407325, 6446477,
    6550424, 6705031, 6910399, 7192628, 7296771, 7543325, 7768994, 7958245,
    8191052, 8446922, 8592858, 8673594, 8892708, 9088473, 9277544, 9400389,
    9643472, 9782183, 9817397, 9892349, 9948331, 10111482, 10252400, 10366532,
    10487851, 10526921, 10630738, 10791698, 10905119, 10994304, 11065841,
    11169445, 11191709, 11280271, 11361234, 11443180, 11799162, 11902271,
    12014015, 12088649, 12243473, 12389189, 12589837, 12821613, 13089717,
    13342546, 13433278, 13677578, 13898558, 14141929, 14402943, 14725429,
    15051909, 15183904, 15478337, 15726831, 15978605, 16228253, 16550353,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const str = e.target.innerText.split(" ")[0];
    const api = `https://0073485d98c9.ngrok.io/${apip}/${str.toLowerCase()}`;

    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        // console.log(data.label);
        // console.log(data.labels);
        setLabel(data.label);
        setLabels(data.labels);
        setData(data.data);
      });

    // console.log(data);
    // console.log(labels);
    // console.log(label);
  };

  return (
    <div className="plots">
      <div className="plots__chart">
        <Chart label={label} labels={labels} data={data} />
      </div>
      <div className="plots__buttons">
        <button onClick={submitHandler} className="plots__button">
          First Dose Vaccination
        </button>
        <button onClick={submitHandler} className="plots__button">
          Second Dose Vaccination
        </button>
        <button onClick={submitHandler} className="plots__button">
          Cumilative Dose Vaccination
        </button>
        <button onClick={submitHandler} className="plots__button">
          Current Dose Vaccination
        </button>
      </div>
    </div>
  );
}

export default Plots;
