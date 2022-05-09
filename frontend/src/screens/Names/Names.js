import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import axios from "axios";


function Names() {

  const [names, setNames] = React.useState([]);

  const [initialNames, setInitialNames] = React.useState(() => {
    const names = localStorage.getItem("names");
    if (names) {
      return JSON.parse(names);
    } else {
      return [];
    }
  });

  const history = useHistory();

  const startGettingNames = async () => {
    if (names.length < 2) {
      alert("Escolha dois nomes");
    } else if (initialNames.iterations > 1) {
      let query = [], list = [];
      if (initialNames.query) {
        query = initialNames.query;
        list = initialNames.list;
      }
      const payload = {
        classification: initialNames.classification,
        iterations: initialNames.iterations,
        query: query,
        list: list,
        names: [...names]
      }
      await axios.post("/api/names/next", payload).then(res => {
        setInitialNames(res.data);
        uncheckAll();
      }
      ).catch(err => {
        console.log(err);
      }
      );
    } else {
      const payload = {
        classification: initialNames.classification,
        iterations: initialNames.iterations,
        query: initialNames.query,
        list: initialNames.list,
        names: [...names]
      }
      await axios.post("/api/names/final", payload).then(res => {
        console.log(res.data);
        localStorage.setItem("names", JSON.stringify(res.data));
        history.push("/final");
      }
      ).catch(err => {
        console.log(err);
      }
      );
    }
  }

  const handleClick = (e) => {
    countChecked()
    let item = JSON.parse(e.target.value);
    if (e.target.checked) {
      setNames([...names, item]);
    } else {
      setNames(names.filter(name => name._id !== item._id));
    }
  };

  const uncheckAll = () => {
    let checkboxes = document.getElementsByTagName('input');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  }

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
      <h4>Iteração número: {initialNames.iterations}</h4>
      {initialNames.names.map((item) =>
        <React.Fragment>
          <div
            style={{ display: "flex", alignItems: "center" }}
            key={item.id}
          >
            <input
              type="checkbox"
              value={JSON.stringify(item)}
              style={{ margin: "0 1rem 1rem 0" }}
              onClick={handleClick}
            />
            <h3>{item.name}</h3>
          </div>
          <p>Significado: {item.meaning}</p>
          <br />
        </React.Fragment>
      )
      }
      <Link to="/names">
        <Button
          style={{ marginLeft: 10, marginBottom: 6 }}
          size="lg"
          onClick={startGettingNames}
        >
          Próximo
        </Button>
      </Link>
    </MainScreen >
  );
}

export default Names;
