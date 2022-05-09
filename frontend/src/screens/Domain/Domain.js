import React from "react";
import { Button } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";


function Domain({ history, search }) {
  const [selectedRadioBtn, setSelectedRadioBtn] = React.useState("male");
  const [selectedRange, setSelectedRange] = React.useState(5);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const isRadioSelected = (value) => selectedRadioBtn === value;

  const handleRadioClick = (e) => setSelectedRadioBtn(e.target.value);

  const handleRange = (e) => setSelectedRange(e.target.value);

  const startGettingNames = async () => {
    await axios.post("/api/names/", {
      classification: selectedRadioBtn,
      iteractions: selectedRange
    }).then(res => {
      console.log(res.data);
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  return (
    <MainScreen title={`Bem vindo(a) de volta ${userInfo && userInfo.name}..`}>

      <h3>Selecione o sexo</h3>
      <input
        type="radio"
        value="M"
        name="male"
        checked={isRadioSelected('M')}
        onChange={handleRadioClick}
        style={{ marginBottom: "1rem" }}
      /> Masculino
      <br />
      <input
        type="radio"
        value="F"
        name="female"
        checked={isRadioSelected('F')}
        onChange={handleRadioClick}
        style={{ marginBottom: "1rem" }} /> Feminino
      <h3>Selecione a quantidade de interações</h3>
      <label for="interactions">Mínimo 5 e máximo 10</label> <br />
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <input
          type="range"
          id="interactions"
          name="interactions"
          min="5"
          max="10"
          defaultValue="5"
          onChange={handleRange}
          style={{ margin: "0 2rem 2rem 0" }}
        />
        <h4>{selectedRange}</h4>
      </div>
      <br />
      <Link to="/names">
        <Button
          style={{ marginLeft: 10, marginBottom: 6 }}
          size="lg"
          onClick={startGettingNames}
        >
          Iniciar
        </Button>
      </Link>

    </MainScreen >
  );
}

export default Domain;
