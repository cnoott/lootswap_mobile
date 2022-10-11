import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Sizing = ({ setValues, values, size, category}) => {
    const [open, setOpen] = useState(false);

    const handleChange = inputSize => {
        setValues({...values, 'size': inputSize.value})
    };

    const shoeSizes = [
        {label: '3.5', value: '3.5'},
        {label: '4', value: '4'},
        {label: '4.5', value: '4.5'},
        {label: '5', value: '5'},
        {label: '5.5', value: '5.5'},
        {label: '6', value: '6'},
        {label: '6.5', value: '6.5'},
        {label: '7', value: '7'},
        {label: '7.5', value: '7.5'},
        {label: '8', value: '8'},
        {label: '8.5', value: '8.5'},
        {label: '9', value: '9'},
        {label: '9.5', value: '9.5'},
        {label: '10', value: '10'},
        {label: '10.5', value: '10.5'},
        {label: '11', value: '11'},
        {label: '11.5', value: '11.5'},
        {label: '12', value: '12'},
        {label: '12.5', value: '12.5'},
        {label: '13', value: '13'},
        {label: '13.5', value: '13.5'},
        {label: '14', value: '14'}
    ];

    const shirtSizes = [
        {label: 'XS', value: 'XS'},
        {label: 'S', value: 'S'},
        {label: 'M', value: 'M'},
        {label: 'L', value: 'L'},
        {label: 'XL', value: 'XL'}
    ];

    const pantSizes = [
        {label: 'XS', value: 'XS'},
        {label: 'S', value: 'S'},
        {label: 'M', value: 'M'},
        {label: 'L', value: 'L'},
        {label: 'XL', value: 'XL'},
        {label: '26', value: '26'},
        {label: '27', value: '27'},
        {label: '28', value: '28'},
        {label: '29', value: '29'},
        {label: '30', value: '30'},
        {label: '31', value: '31'},
        {label: '32', value: '32'},
        {label: '33', value: '33'},
        {label: '34', value: '34'},
        {label: '35', value: '35'},
        {label: '36', value: '36'},
        {label: '37', value: '37'},
        {label: '38', value: '38'},
        {label: '39', value: '39'},
        {label: '40', value: '40'},
        {label: '41', value: '41'},
        {label: '42', value: '42'},
        {label: '43', value: '43'},
        {label: '44', value: '44'}
    ];

    const hatSizes = [
        {label: 'ONE SIZE', value: 'ONE SIZE'},
        {label: '6 3/4', value: '6 3/4'},
        {label: '6 7/8', value: '6 7/8'},
        {label: '7', value: '7'},
        {label: '7 1/8', value: '7 1/8'},
        {label: '7 1/4', value: '7 1/4'},
        {label: '7 3/8', value: '7 3/8'},
        {label: '7 1/2', value: '7 1/2'},
        {label: '7 5/8', value: '7 5/8'},
        {label: '7 3/4', value: '7 3/4'},
        {label: '7 7/8', value: '7 7/8'},
        {label: '8', value: '8'},
        {label: '8 1/8', value: '8 1/8'},
        {label: '8 1/4', value: '8 1/4'}
    ];

    if (category === '') {
        return (
            <View>
            <DropDownPicker
                open={open}
                value={size}
                items={
                    [{label:'Please select a category first', value: ''}]
                }
                setOpen={setOpen}
                listMode="SCROLLVIEW"
                onSelectItem={value => handleChange(value)}
            />
            </View>
        );
    }
    else if (category === 'shoes') {
        return (
            <View>
            <DropDownPicker
                open={open}
                value={size}
                items={shoeSizes}
                setOpen={setOpen}
                listMode="SCROLLVIEW"
                onSelectItem={value => handleChange(value)}
            />
            </View>
        );
    }
    else if (category === 'shirts' || category === 'jackets') {
        return (
            <View>
            <DropDownPicker
                open={open}
                value={size}
                items={shirtSizes}
                setOpen={setOpen}
                listMode="SCROLLVIEW"
                onSelectItem={value => handleChange(value)}
            />
            </View>
        );
    }
    else if  (category === 'pants' || category === 'shorts') {
        return (
            <View>
            <DropDownPicker
                open={open}
                value={size}
                items={pantSizes}
                setOpen={setOpen}
                listMode="SCROLLVIEW"
                onSelectItem={value => handleChange(value)}
            />
            </View>
        );
    }
    else if  (category === 'hats') {
        return (
            <View>
            <DropDownPicker
                open={open}
                value={size}
                items={hatSizes}
                setOpen={setOpen}
                listMode="SCROLLVIEW"
                onSelectItem={value => handleChange(value)}
            />
            </View>
        );
    }
};

export default Sizing;
