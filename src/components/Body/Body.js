import { useEffect, useState } from "react";
import React from "react";
import "./Body.css";
import Analysis from "../Analysis/Analysis";
import Report from "../Report/Report";

function Body({ labels, info, analysis }) {
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [firstdose, setFirstDose] = useState(-1);
  const [seconddose, setSeconddose] = useState(-1);
  const [latest, setLatest] = useState(-1);

  useEffect(() => {
    setTitle1(labels[0]);
    setTitle2(labels[1]);
    setTitle3(labels[2]);
    setFirstDose(info[0]);
    setSeconddose(info[1]);
    setLatest(info[2]);
  }, [labels, info]);

  return (
    <div className="body">
      <div className="body__data">
        <Report title={title1} value={firstdose} bg="#A0937D" />
        <Report title={title2} value={seconddose} bg="#F2EDD7" />
        <Report title={title3} value={latest} bg="#1EAE98" />
      </div>
      {analysis && (
        <div className="body__predict">
          <Analysis />
          {/* <img
          alt="graph"
          src="https://cdn.corporatefinanceinstitute.com/assets/line-graph.jpg"
        /> */}
        </div>
      )}
    </div>
  );
}

export default Body;
