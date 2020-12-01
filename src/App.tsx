import React from "react";
import { AppStyled } from "./App.styled";
import { Library } from "./features/library/Library";

function App() {
  return (
    <AppStyled>
      <Library />
    </AppStyled>
  );
}

export default App;
