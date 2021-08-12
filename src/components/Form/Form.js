import { useState } from "react";
import { useHistory } from "react-router";
import axios from "../../axios";
import "./Form.css";

function Form() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const [require, setRequire] = useState();
  const [gender, setGender] = useState();
  const [proof, setProof] = useState("Aadhar Card");
  const [card, setCard] = useState();
  const [date, setDate] = useState();

  const backSubmitHandler = () => {
    history.push("/index");
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    await axios.post("/require/new", {
      name: name,
      phone: number,
      gender: gender,
      proof: proof,
      card: card,
      date: date,
      require: require,
    });

    setName("");
    setNumber("");
    setRequire("");
    setGender("");
    setProof("Aadhar Card");
    setCard("");
    setDate("");

    history.replace("/index");
  };

  return (
    <div className="form__section">
      <h2 className="form__title">Let us know your requirements</h2>
      <div className="form__container">
        <form className="form" method="POST">
          <div className="form__content">
            <label className="form__label">Name</label>
            <input
              className="form__input"
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form__content">
            <label className="form__label">Phone Number</label>
            <input
              className="form__input"
              type="number"
              name="phone"
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          {/* <div className="form__content">
            <label className="form__label">Age</label>
            <input
              className="form__input"
              type="number"
              name="age"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div> */}
          <div className="form__content">
            <label className="form__label">Gender</label>
            <select
              className="form__input"
              type="text"
              name="gender"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>None</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="form__content">
            <label className="form__label">Proof</label>
            <select
              className="form__input"
              type="text"
              name="proof"
              required
              value={proof}
              onChange={(e) => setProof(e.target.value)}
            >
              <option>Aadhar Card</option>
              <option>PAN Card</option>
              <option>Ration Card</option>
              <option>Voter Id Card</option>
            </select>
          </div>
          <div className="form__content">
            <label className="form__label">Proof Card Number</label>
            <input
              className="form__input"
              type="number"
              name="card_number"
              required
              value={card}
              onChange={(e) => setCard(e.target.value)}
            />
          </div>
          <div className="form__content">
            <label className="form__label">Requirement Date</label>
            <input
              className="form__input"
              type="date"
              name="card_number"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form__content">
            <label className="form__label">Requirements</label>
            <textarea
              className="form__input"
              type="text"
              name="require"
              rows="5"
              required
              value={require}
              onChange={(e) => setRequire(e.target.value)}
            />
          </div>
          <div className="form__buttons">
            <button
              className="form__button"
              type="submit"
              onClick={backSubmitHandler}
            >
              Back
            </button>
            <button
              className="form__button"
              type="submit"
              onClick={formSubmitHandler}
            >
              Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
