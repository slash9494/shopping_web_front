import React, { useState } from "react";
import styled from "styled-components";
import { Button, Drawer } from "@material-ui/core";
import FilterList from "./FilterList";
import SearchProduct from "./SearchProduct";

const FilterContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: flex-end;
  position: fixed;
  padding: 0 10vw;
  z-index: 6;
`;

function ItemFilter(props: any) {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleSizeFilters = (value: any) => {
    props.sizeFilters(value);
  };
  const handleCategoryFilters = (value: any) => {
    props.categoryFilters(value);
  };
  const handlePriceFilters = (value: any) => {
    props.priceFilters(value);
  };
  const searchValue = (value: any) => {
    props.searchValue(value);
  };

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
