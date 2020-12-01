import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MasonryScroller,
  useContainerPosition,
  useInfiniteLoader,
  usePositioner,
  useResizeObserver,
} from "masonic";
import { MasonryCard } from "../../components/MasonryCard/MasonryCard";
import { ASSET_TYPES, fetchAssets, selectAssets } from "./assetsSlice";
import {
  FilterButtonStyled,
  FilterContainerStyled,
  FilterQueryStyled,
  LibraryStyled,
} from "./Library.styled";
import { useWindowSize } from "@react-hook/window-size";

const INITIAL_START_INDEX = 0;
const INITIAL_END_INDEX = 10;

export const Library: React.ComponentType = () => {
  const assets = useSelector(selectAssets);

  const [type, setType] = useState<ASSET_TYPES | null>();
  const [query, setQuery] = useState<string>();

  const dispatch = useDispatch();

  const fetchMore = useCallback(
    (startIndex, stopIndex, refresh = false) => {
      const filters = [];
      if (type) filters.push(`asset_type=${type}`);
      dispatch(
        fetchAssets({
          start: startIndex,
          end: stopIndex,
          filter: filters.join("&"),
          query,
          refresh,
        })
      );
    },
    [dispatch, type, query]
  );

  const loadMore = useInfiniteLoader(fetchMore, { totalItems: assets.total });
  const containerRef = useRef(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
  ]);
  const positioner = usePositioner(
    { width, columnWidth: 300, columnGutter: 20 },
    [assets.data]
  );
  const resizeObserver = useResizeObserver(positioner);

  useEffect(() => {
    fetchMore(INITIAL_START_INDEX, INITIAL_END_INDEX);
  }, [fetchMore]);

  useEffect(() => {
    fetchMore(INITIAL_START_INDEX, INITIAL_END_INDEX, true);
  }, [type, query]);

  return (
    <LibraryStyled>
      <FilterContainerStyled>
        <FilterButtonStyled
          active={type === ASSET_TYPES.PRODUCT}
          onClick={() =>
            type === ASSET_TYPES.PRODUCT
              ? setType(null)
              : setType(ASSET_TYPES.PRODUCT)
          }
        >
          Product
        </FilterButtonStyled>
        <FilterButtonStyled
          active={type === ASSET_TYPES.IMAGE}
          onClick={() =>
            type === ASSET_TYPES.IMAGE
              ? setType(null)
              : setType(ASSET_TYPES.IMAGE)
          }
        >
          Image
        </FilterButtonStyled>
        <FilterButtonStyled
          active={type === ASSET_TYPES.VIDEO}
          onClick={() =>
            type === ASSET_TYPES.VIDEO
              ? setType(null)
              : setType(ASSET_TYPES.VIDEO)
          }
        >
          Video
        </FilterButtonStyled>
        <FilterQueryStyled
          onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(event.target.value);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") setQuery(event.currentTarget.value);
          }}
        />
      </FilterContainerStyled>

      <MasonryScroller
        positioner={positioner}
        resizeObserver={resizeObserver}
        containerRef={containerRef}
        items={assets.data}
        onRender={loadMore}
        height={windowHeight}
        offset={offset}
        overscanBy={6}
        render={MasonryCard}
      />
    </LibraryStyled>
  );
};
