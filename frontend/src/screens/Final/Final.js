import React from "react";
import MainScreen from "../../components/MainScreen";

function Domain() {

    const [finalNames, setFinalNames] = React.useState(() => {
        const names = localStorage.getItem("names");
        if (names) {
            console.log('final', JSON.parse(names))
            let finalNames = JSON.parse(names);
            let list = finalNames.list.filter((value, index, self) => {
                return self.indexOf(value) === index;
            })
            finalNames.list = list;
            return finalNames;
        } else {
            return [];
        }
    });
    return (
        <MainScreen title={"Chegamos ao fim :)"}>
            <div style={{ display: "flex", marginBottom: "1rem" }}>
                <h3>O resultado final foi: <strong>{finalNames.names.name}</strong></h3>
                <br />
            </div>
            <h5><strong>O significado é: </strong>{finalNames.names.meaning}</h5>

            <h4 style={{ marginTop: "2rem" }}>A lista de nomes escolhidos para gerar esse resultado foi:</h4>
            <ul style={{ marginTop: "1rem" }}>
                {finalNames.list.map((item) => {
                    return <li key={item.id}>{item}</li>
                })}
            </ul>
        </MainScreen >
    );
}

export default Domain;
