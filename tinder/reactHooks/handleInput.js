import { useState } from "react";

function HandleInput() {
  const [value, setValue] = useState("");

  function onChange(event) {
    setValue(event.target.value);
  }

  return { value, onChange, setValue };
}

export default HandleInput;
