import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { RenderComponentProps } from "masonic";
import { Asset, ASSET_TYPES } from "../../features/library/assetsSlice";
import {
  MasonryCardDescStyled,
  MasonryCardImageStyled,
  MasonryCardStyled,
} from "./MasonryCard.styled";

const DEMO_VIDEO =
  "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4";

export const MasonryCard: React.ComponentType<RenderComponentProps<Asset>> = ({
  index,
  data: { id, asset_type, file_name, thumbnail_url },
  width,
}) => {
  const ref = useRef<HTMLImageElement>(null);

  const [height, setHeight] = useState(0);
  const [delayHandler, setDelayHandler] = useState<number | undefined>();
  const [showVideo, setShowVideo] = useState(false);

  const handleImageOnLoad = () => {
    if (ref.current && !height) setHeight(ref.current.clientHeight);
  };

  const handleMouseEnter = () => {
    setDelayHandler(
      setTimeout(() => {
        setShowVideo(true);
      }, 500)
    );
  };

  const handleMouseLeave = () => {
    clearTimeout(delayHandler);
    setShowVideo(false);
  };

  const props =
    asset_type === ASSET_TYPES.VIDEO
      ? {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        }
      : {};

  return (
    <MasonryCardStyled {...props}>
      <MasonryCardImageStyled
        hidden={showVideo}
        ref={ref}
        src={thumbnail_url}
        alt={file_name}
        width={width}
        onLoad={handleImageOnLoad}
      />
      {showVideo && (
        <ReactPlayer width={width} height={height} playing url={DEMO_VIDEO} />
      )}
      <MasonryCardDescStyled width={width}>{file_name}</MasonryCardDescStyled>
    </MasonryCardStyled>
  );
};
