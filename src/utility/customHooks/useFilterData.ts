import {useRefinementList, useRange} from 'react-instantsearch-hooks';
import {configureBrandListForDropdown, configureSizeList} from '../utility';

export const useFilterData = () => {
  const {
    range,
    canRefine,
    refine: priceRefine,
  } = useRange({attribute: 'price'});

  const {items: categoriesItems, refine: categoriesRefine} = useRefinementList({
    attribute: 'category',
  });

  const {items: brandItems, refine: brandRefine} = useRefinementList({
    attribute: 'brand',
  });

  const {items: sizeItems, refine: sezeRefine} = useRefinementList({
    attribute: 'size',
  });

  let hasData =
    categoriesItems?.length > 0 &&
    sizeItems?.length > 0 &&
    brandItems?.length > 0 &&
    range;
  const sizeData = configureSizeList(sizeItems);
  const brandsData = configureBrandListForDropdown(brandItems);
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
      data: brandsData?.unSelectedBrandList,
      selectedBrandData: brandsData?.selectedBrandList,
      refineFunction: label => brandRefine(label),
      id: 2,
      isCategorySelected: false,
    },
    {
      FilterTitle: 'Product Type',
      data: [1, 2],
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
      refineFunction: rangeArr => priceRefine(rangeArr),
      id: 6,
      isCategorySelected: false,
      range: range,
      canRefine: canRefine,
    },
  ];
  return {filterData, hasData};
};
