import {useRefinementList} from 'react-instantsearch-hooks';

export const useFilterData = props => {
  const {items: categoriesItems, refine: categoriesRefine} = useRefinementList({
    attribute: 'category',
  });
  const {items, refine} = useRefinementList({attribute: 'brand'});
  const {items: priceItems, refine: priceRefine} = useRefinementList({
    attribute: 'price',
  });
  const {items: sizeItems, refine: sezeRefine} = useRefinementList({
    attribute: 'size',
  });
  const hasData =
    categoriesItems?.length > 0 &&
    priceItems?.length > 0 &&
    sizeItems?.length > 0 &&
    items?.length > 0;
  const filterData = [
    {
      FilterTitle: 'Categories',
      data: categoriesItems,
      refineFunction: label => categoriesRefine(label),
      id: 1,
      isCategorySelected: false,
    },
    {
      FilterTitle: 'Brand',
      data: items,
      refineFunction: label => refine(label),
      id: 2,
      isCategorySelected: false,
    },
    {
      FilterTitle: 'Price Range',
      data: priceItems,
      refineFunction: label => priceRefine(label),
      id: 3,
      isCategorySelected: false,
    },
    {
      FilterTitle: 'Size',
      data: sizeItems,
      refineFunction: label => sezeRefine(label),
      id: 4,
      isCategorySelected: false,
    },
  ];
  return {filterData, hasData};
};
