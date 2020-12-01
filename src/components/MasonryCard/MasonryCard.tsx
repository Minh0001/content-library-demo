import React from "react";
import { RenderComponentProps } from "masonic";
import { Asset } from "../../features/library/assetsSlice";
import { MasonryCardDescStyled, MasonryCardStyled } from "./MasonryCard.styled";

export const MasonryCard: React.ComponentType<RenderComponentProps<Asset>> = ({
  index,
  data: { id, file_name, thumbnail_url },
  width,
}) => (
  <MasonryCardStyled>
    <img src={thumbnail_url} alt={file_name} width={width} />
    <MasonryCardDescStyled width={width}>{file_name}</MasonryCardDescStyled>
  </MasonryCardStyled>
);