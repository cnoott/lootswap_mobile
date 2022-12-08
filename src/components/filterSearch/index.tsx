import React, {FC, useState, useRef} from 'react';
import LSInput from '../commonComponents/LSInput';
import {useSearchBox} from 'react-instantsearch-hooks';
import {SEARCH_INPUT_ICON, HOME_FILTER_ICON} from 'localsvgimages';

interface LSSearchProps {
  onRightIconPress?: Function;
}

const LSSearch: FC<LSSearchProps> = React.memo(props => {
  const {onRightIconPress = () => {}} = props;

  const {query, refine} = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  function setQuery(newQuery: any) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  return (
    <LSInput
      ref={inputRef}
      value={inputValue}
      onChangeText={setQuery}
      placeholder={'Search'}
      leftIcon={SEARCH_INPUT_ICON}
      homeSearch={true}
      rightIcon={HOME_FILTER_ICON}
      onRightIconPress={onRightIconPress}
    />
  );
});

export default LSSearch;
