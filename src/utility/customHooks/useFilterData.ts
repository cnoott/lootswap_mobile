import {useRefinementList} from 'react-instantsearch-hooks';

export const useFilterData = () => {
  const {items: categoriesItems, refine: categoriesRefine} = useRefinementList({
    attribute: 'category',
  });

  const {items: brandItems, refine: brandRefine} = useRefinementList({
    attribute: 'brand',
  });

  const {items: priceItems, refine: priceRefine} = useRefinementList({
    attribute: 'price',
  });

  const {items: sizeItems, refine: sezeRefine} = useRefinementList({
    attribute: 'size',
  });

  let hasData =
    categoriesItems?.length > 0 &&
    priceItems?.length > 0 &&
    sizeItems?.length > 0 &&
    brandItems?.length > 0;

  let filterData = [
    {
      FilterTitle: 'Categories',
      data: categoriesItems,
      refineFunction: label => categoriesRefine(label),
      id: 1,
      isCategorySelected: false,
    },
    {
      FilterTitle: 'Brand',
      data: brandItems,
      refineFunction: label => brandRefine(label),
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
