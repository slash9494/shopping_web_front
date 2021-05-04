import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Button, Drawer } from "@material-ui/core";
import FilterList from "./FilterList";
import SearchProduct from "./SearchProduct";
interface Props {
  sizeFilters: (values: number[]) => void;
  categoryFilters: (values: number[]) => void;
  priceFilters: (value: string) => void;
  searchValue: (value: string) => void;
}
const FilterContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: flex-end;
  position: fixed;
  padding: 0 10vw;
  z-index: 6;
`;

function ItemFilter(props: Props) {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);
  const handleSizeFilters = useCallback(
    (value: number[]) => {
      props.sizeFilters(value);
    },
    [props.sizeFilters]
  );
  const handleCategoryFilters = useCallback(
    (value: number[]) => {
      props.categoryFilters(value);
    },
    [props.categoryFilters]
  );
  const handlePriceFilters = useCallback(
    (value: string) => {
      props.priceFilters(value);
    },
    [props.priceFilters]
  );
  const searchValue = useCallback(
    (value: string) => {
      props.searchValue(value);
    },
    [props.searchValue]
  );

  return (
    <FilterContainer>
      <SearchProduct searchValue={searchValue} />
      <Button onClick={handleDrawerOpen}>Filters</Button>
      <Drawer
        open={open}
        onClose={handleDrawerOpen}
        anchor="right"
        variant="persistent"
      >
        <FilterList
          onClose={handleDrawerOpen}
          handleSizeFilters={handleSizeFilters}
          handleCategoryFilters={handleCategoryFilters}
          handlePriceFilters={handlePriceFilters}
        />
      </Drawer>
    </FilterContainer>
  );
}

export default ItemFilter;
