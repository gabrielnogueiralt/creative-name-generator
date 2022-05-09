import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import axios from "axios";


function Names() {

  const [names, setNames] = React.useState([]);

  const URL = "http://localhost:5000";

  const startGettingNames = () => {
    axios.post(`${URL}/api/names/`, {
      classification: "M",
      iteractions: 5
    }).then(res => {
      console.log(res.data);
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  const handleChange = (e) => {
    countChecked()
  };

  const countChecked = () => {
    let count = 0;
    let checkboxes = document.getElementsByTagName('input');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        count++;
      }
    }
    if (count >= 2) {
      for (let i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
          checkboxes[i].disabled = true;
        }
      }
    } else {
      for (let i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
          checkboxes[i].disabled = false;
        }
      }
    }
  }

  return (
    <MainScreen>
      <h3>Selecione dois nomes</h3>

      {names.map((item) =>
        <React.Fragment>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              value={item}
              style={{ margin: "0 1rem 1rem 0" }}
              onChange={() => {
                handleChange(item)
              }}
            />
            <h3 style={{ width: "40%" }}>{item}</h3>
            <br />
          </div>
        </React.Fragment>
      )}
      <Link to="/names">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Próximo
        </Button>
      </Link>
    </MainScreen>
  );
}

export default Names;
