import { useState } from "react";
import "./Report.css";

function Report({ title, value, bg }) {
  const [bgh, setBgh] = useState(true);
  const [bgc, setBgc] = useState("white");

  function toggleHover() {
    setBgh(!bgh);
    if (bgh) {
      setBgc(`${bg}`);
    } else {
      setBgc("white");
    }
  }
  const style = "white";
  return (
    <div className="report">
      <div
        className="report__block"
        style={{ backgroundColor: `${bgc}` }}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        <h1 className="report__title">{title}</h1>
        <span className="report__data">{value}</span>
      </div>
    </div>
  );
}

export default Report;
