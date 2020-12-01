import React from "react";
import { AppHeaderStyled, AppStyled } from "./App.styled";
import { Library } from "./features/library/Library";

function App() {
  return (
    <AppStyled>
      <AppHeaderStyled>
        Library
      </AppHeaderStyled>
      <Library />
    </AppStyled>
  );
}

export default App;
