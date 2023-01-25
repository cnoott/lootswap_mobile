import {useRefinementList, useRange} from 'react-instantsearch-hooks';
import {configureBrandListForDropdown, configureSizeList} from '../utility';

export const useFilterData = props => {
  const {
    range,
    canRefine,
    refine: priceRefine,
  } = useRange({...props, attribute: 'price'});

  const {items: categoriesItems, refine: categoriesRefine} = useRefinementList({
    ...props,
    attribute: 'category',
  });

  const {
    items: brandItems,
    refine: brandRefine,
    searchForItems,
  } = useRefinementList({
    ...props,
    attribute: 'brand',
  });

  const {items: priceItems} = useRefinementList({
    ...props,
    attribute: 'price',
  });

  const {items: sizeItems, refine: sezeRefine} = useRefinementList({
    ...props,
    attribute: 'size',
  });

  let hasData =
    categoriesItems?.length > 0 &&
    priceItems?.length > 0 &&
    sizeItems?.length > 0 &&
    brandItems?.length > 0;
  const sizeData = configureSizeList(sizeItems);
  let filterData = [
    {
      FilterTitle: 'Category',
      data: categoriesItems,
      refineFunction: label => categoriesRefine(label),
      id: 1,
      isCategorySelected: false,
    },
    {
      FilterTitle: 'Brand',
      data: configureBrandListForDropdown(brandItems),
      refineFunction: label => brandRefine(label),
      searchFunction: (val: string) => searchForItems(val),
      id: 2,
      isCategorySelected: false,
    },
    {
      FilterTitle: 'Product Type',
      data: priceItems?.slice(0, 4),
      refineFunction: () => {},
      id: 3,
      isCategorySelected: false,
    },
    {
      FilterTitle: 'Shoe Sizes',
      data: sizeData?.shoeSize,
      refineFunction: label => sezeRefine(label),
      id: 4,
      isCategorySelected: false,
    },
    {
      FilterTitle: 'Clothing Sizes',
      data: sizeData?.clothingSize,
      refineFunction: label => sezeRefine(label),
      id: 5,
      isCategorySelected: false,
    },
    {
      FilterTitle: 'Price Range',
      data: priceItems,
      refineFunction: rangeArr => priceRefine(rangeArr),
      id: 6,
      isCategorySelected: false,
      range: range,
      canRefine: canRefine,
    },
  ];
  return {filterData, hasData};
};
