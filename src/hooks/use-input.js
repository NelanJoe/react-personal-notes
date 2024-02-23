import { useState } from "react";

export const useInput = (defaultValue = "") => {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (e) => {
    setValue(e.target.value);
  };

  return [value, onValueChangeHandler];
};
