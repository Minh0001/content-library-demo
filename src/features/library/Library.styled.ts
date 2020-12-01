import styled from "styled-components";

export const LibraryStyled = styled.div`
  padding: 20px;
`;

export const FilterContainerStyled = styled.div`
  padding-bottom: 20px;
`;

export const FilterButtonStyled = styled.button<{ active: boolean }>`
  margin-right: 20px;
  border: none;
  border-radius: 15px;
  color: ${(props) => (props.active ? "#FFF" : "#279AF1")};
  padding: 5px 20px;
  background: ${(props) => (props.active ? "#279AF1" : "#FFF")};
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const FilterQueryStyled = styled.input`
  border: 1px solid #279af1;
  color: #279AF1;
  border-radius: 15px;
  padding: 5px 20px;

  &:focus {
    outline: none;
  }
`;
