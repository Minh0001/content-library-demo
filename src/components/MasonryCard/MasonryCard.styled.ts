import styled from "styled-components";

export const MasonryCardStyled = styled.div`
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  cursor: pointer;
`;

export const MasonryCardImageStyled = styled.img`
  border-radius: 5px 5px 0 0;
`;

export const MasonryCardDescStyled = styled.div<{ width: number }>`
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${(props) => props.width}px;
  white-space: nowrap;
  padding: 5px;
  color: #070600;
  text-align: center;
`;
