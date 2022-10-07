import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Dimensions, TextInput, FlatList } from 'react-native';
import HeroCarousel from './HeroCarousel';
import HitCard from './HitCard';
import { InstantSearch, useSearchBox, useInfiniteHits, } from 'react-instantsearch-hooks';
import algoliasearch from 'algoliasearch/lite';

const appId = 'O616IHS8SQ';
const apiKey = '1a61d9059fcc3f918576c7aa95279846';
const ALGOLIA_INDEX_NAME = 'dev_lootswap';
const searchClient = algoliasearch(appId, apiKey);

const HomeScreen = ({ navigation }) => {
    const width = Dimensions.get('window').width;

    const SearchBox = (props) => {
        const { query, refine } = useSearchBox(props);
        const [inputValue, setInputValue] = useState(query);
        const inputRef = useRef(null);

        function setQuery(newQuery) {
            setInputValue(newQuery);
            refine(newQuery);
        }

        // Track when the InstantSearch query changes to synchronize it with
        // the React state.
        // We bypass the state update if the input is focused to avoid concurrent
        // updates when typing.
        if (query !== inputValue && !inputRef.current?.isFocused()) {
            setInputValue(query);
        }

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.search}
                    ref={inputRef}
                    value={inputValue}
                    onChangeText={setQuery}
                    clearButtonMode='while-editing'
                    autoCapitalize='none'
                    autoCorrect={false}
                    spellCheck={false}
                    autoCompleteType='off'
                    placeholder='Search Sneakers, Clothes, Hats, and more...'
                />
            </View>
        );
    };

    const Hit = ({ hit }) => (
        <Text> {hit.name}</Text>
    );
    const InfiniteHits = ({ hitComponent: Hit, ...props }) => {
        const { hits, isLastPage, showMore } = useInfiniteHits(props);

        return (
            <View style={styles.productsContainer}>
            { hits.map((hit, i) => (
                <HitCard hit={hit} key={i} style={styles.product}/>
            ))}
            </View>
        );
    };

    return(
        <View style={{ backgroundColor: 'white' }}>
            <InstantSearch
                indexName={ALGOLIA_INDEX_NAME}
                searchClient={searchClient}
            >
                <ScrollView stickyHeaderIndices={[0]} >
                    <SearchBox/>
                    <HeroCarousel/>
                    <InfiniteHits hitComponent={Hit}/>
                </ScrollView>
            </InstantSearch>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    productsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: 15,
    },
    product: {
        width: '50%'
    },
    search: {
        backgroundColor: 'white',
        height: 31,
        marginTop: 8,
        marginBottom: 8,
        width: '80%',
        borderWidth: 1,
        borderColor: 'darkgrey',
        borderRadius: 8,
        padding: 4,
    },
});

export default HomeScreen;

