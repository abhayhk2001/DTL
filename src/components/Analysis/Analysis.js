import { useState } from "react";
import "./Analysis.css";

function Analysis() {
  const [state, setState] = useState("-");
  const [percent, setPercent] = useState("-");
  const [pred, setPred] = useState(-1);

  const submitHandler = (e) => {
    e.preventDefault();

    if (state === "-" || percent === "-") {
      return;
    } else {
      const api = `https://0073485d98c9.ngrok.io/predictpercentage?state=${state}&percent=${percent.substring(
        0,
        2
      )}`;

      fetch(api)
        .then((res) => res.json())
        .then((data) => setPred(data.days));
    }

    console.log(pred);
    setState("-");
    setPercent("-");
  };

  return (
    <div className="analysis">
      <h1 className="analysis__title">Vaccination Statistics</h1>
      <div className="analysis__content">
        <label className="analysis__label">State</label>
        <select
          className="analysis__input"
          type="text"
          name="state"
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option>-</option>
          <option>Andaman and Nicobar Islands</option>
          <option>Andhra Pradesh</option>
          <option>Arunachal Pradesh</option>
          <option>Assam</option>
          <option>Bihar</option>
          <option>Chandigarh</option>
          <option>Chhattisgarh</option>
          <option>Dadra and Nagar Haveli and Daman and Diu</option>
          <option>Delhi</option>
          <option>Goa</option>
          <option>Gujarat</option>
          <option>Haryana</option>
          <option>Himachal Pradesh</option>
          <option>Jammu and Kashmir</option>
          <option>Jharkhand</option>
          <option>Karnataka</option>
          <option>Kerala</option>
          <option>Ladakh</option>
          <option>Lakshadweep</option>
          <option>Madhya Pradesh</option>
          <option>Maharashtra</option>
          <option>Manipur</option>
          <option>Meghalaya</option>
          <option>Mizoram</option>
          <option>Nagaland</option>
          <option>Odisha</option>
          <option>Puducherry</option>
          <option>Punjab</option>
          <option>Rajasthan</option>
          <option>Sikkim</option>
          <option>Tamil Nadu</option>
          <option>Telangana</option>
          <option>Tripura</option>
          <option>Uttar Pradesh</option>
          <option>Uttarakhand</option>
          <option>West Bengal</option>
        </select>
      </div>
      <div className="analysis__content">
        <label className="analysis__label">Percentage %</label>
        <select
          className="analysis__input"
          type="text"
          name="percent"
          required
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
        >
          <option>-</option>
          <option>25%</option>
          <option>40%</option>
          <option>50%</option>
          <option>60%</option>
          <option>75%</option>
          <option>85%</option>
        </select>
      </div>
      <div className="analysis__buttons">
        <div>
          <button
            className="analysis__button"
            type="submit"
            onClick={submitHandler}
          >
            Predict
          </button>
        </div>
        {pred > 0 && <div className="analysis__buttons_ans">{pred}</div>}
      </div>
    </div>
  );
}

export default Analysis;
