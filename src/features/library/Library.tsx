import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Masonry, useInfiniteLoader } from "masonic";
import { MasonryCard } from "../../components/MasonryCard/MasonryCard";
import { fetchAssets, selectAssets } from "./assetsSlice";
import { LibraryStyled } from "./Library.styled";

export const Library: React.ComponentType = () => {
  const assets = useSelector(selectAssets);
  const dispatch = useDispatch();

  const fetchMore = useCallback(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  const loadMore = useInfiniteLoader(fetchMore);

  useEffect(() => {
    fetchMore();
  }, [fetchMore]);

  return (
    <LibraryStyled>
      <Masonry
        items={assets.data}
        itemKey={(item) => item.id}
        render={MasonryCard}
        onRender={loadMore}
        columnGutter={20}
      />
    </LibraryStyled>
  );
};
