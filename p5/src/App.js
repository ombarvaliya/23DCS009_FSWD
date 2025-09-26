import React, { useState } from "react";
import "./App.css";

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        const evalResult = eval(expression); // For demo only; use safer parsing for production
        setResult(`= ${evalResult}`);
      } catch {
        setResult("Error");
      }
    } else if (value === "DEL") {
      setExpression(expression.slice(0, -1));
      setResult("");
    } else {
      setExpression(expression + value);
    }
  };

  const buttons = [
    ["/", "*", "+", "-", "DEL"],
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", ".", "="],
  ];

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">
          <div className="result">{result}</div>
          <div className="expression">{expression}</div>
        </div>

        <div className="row operator-row">
          {buttons[0].map((btn, i) => (
            <button
              key={i}
              className={btn === "DEL" ? "del-btn" : ""}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

        {buttons.slice(1).map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((btn, i) => (
              <button
                key={i}
                className={btn === "=" ? "equals-btn" : ""}
                onClick={() => handleButtonClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
