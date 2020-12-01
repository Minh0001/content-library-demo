import React from "react";
import { render } from "@testing-library/react";
import { MasonryCard } from "./MasonryCard";
import { ASSET_TYPES } from "../../features/library/assetsSlice";

test("renders masonry card", () => {
  const { container, getByTestId } = render(
    <MasonryCard
      index={0}
      data={{
        asset_type: ASSET_TYPES.VIDEO,
        id: 1,
        user_id: 0,
        client_id: 0,
        file_name: "fileName",
        thumbnail_url: "thumbnailUrl",
        created_at: new Date(),
        updated_at: new Date(),
      }}
      width={200}
    />
  );

  expect(container).toBeTruthy();
  expect(container).toHaveTextContent("fileName");
  expect(getByTestId("card-image")).toHaveAttribute("src", "thumbnailUrl");
  expect(getByTestId("card-video")).toBeFalsy();
});
