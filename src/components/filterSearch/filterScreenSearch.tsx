import React, {FC, useState} from 'react';
import LSInput from '../commonComponents/LSInput';
import {useSearchBox} from 'react-instantsearch-hooks';
import {SEARCH_INPUT_ICON} from 'localsvgimages';

interface LSFilterScreenSearchProps {
  onRightIconPress?: Function;
}

const LSFilterScreenSearch: FC<LSFilterScreenSearchProps> = React.memo(
  props => {
    const {onRightIconPress = () => {}} = props;

    const {query, refine} = useSearchBox(props);
    const [inputValue, setInputValue] = useState(query);

    function setQuery(newQuery: any) {
      setInputValue(newQuery);
      refine(newQuery);
    }

    return (
      <LSInput
        value={inputValue}
        onChangeText={setQuery}
        placeholder={'Search brand'}
        rightIcon={SEARCH_INPUT_ICON}
        onRightIconPress={onRightIconPress}
        filterSearch={true}
      />
    );
  },
);

export default LSFilterScreenSearch;
