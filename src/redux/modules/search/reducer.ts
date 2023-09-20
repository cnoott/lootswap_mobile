// @flow

import {
  SELECT_CATEGORY_FILTER,
} from '../../../constants/actions';


export interface SearchProps {
  categories: Array<string>;
}

export const InitialState: SearchProps = {
  categories: [],
};

type ActionProps = {
  type: string;
  filter: string;
}

export default function loading(state = InitialState, action: ActionProps) {
  const {type, filter} = action;

  switch (type) {
    case SELECT_CATEGORY_FILTER.UPDATE:
      let newSelectedCategories = state.categories;
      if (state.categories.includes(filter)) {
        newSelectedCategories = newSelectedCategories.filter(cat => cat !== filter);
      } else {
        newSelectedCategories.push(filter);
      }
      return {
        ...state,
        categories: newSelectedCategories,
      };

    default:
      return state;
  }
}
