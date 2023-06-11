import { useState } from "react";
import "./App.css";

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const newButtonColor = buttonColor === "red" ? "blue" : "red";
  return (
    <div className='App'>
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={btnDisabled}
      >
        Change to {newButtonColor}
      </button>
      <input
        type='checkbox'
        onChange={(e) => {
          setBtnDisabled(e.target.checked);
        }}
      />
    </div>
  );
}

export default App;
