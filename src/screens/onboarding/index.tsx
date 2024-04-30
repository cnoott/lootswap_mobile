import React, {FC, useRef, useState} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {
  Container,
  ProgressBar,
  SwiperComponent,
  CloseTouchable,
  LabelText,
  InnerContainer,
  SelectionsContainer,
  ListContainer,
  ButtonContainer,
  Spacer,
  CheckboxContainer,
  ScrollView,
} from './styles';
import LSDropDown from '../../components/commonComponents/LSDropDown';
import {
  shoesSizeList,
  lowerClothingSize,
  upperClothingSize,
} from '../../utility/utility';
import {SvgXml} from 'react-native-svg';
import {TRADE_MODAL_CLOSE_BUTTON} from 'localsvgimages';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {goBack} from '../../navigation/navigationHelper';
import {
  FilterButton,
  FilterButtonText,
  AnimatedCheckBox,
} from '../search/filtersScreenStyles';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {loggingService} from '../../services/loggingService';
import {useSelector, useDispatch} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {updateUser} from '../../redux/modules';

const brands = [
  'Sp5der',
  'Travis Scott',
  'Gucci',
  'Prada',
  'Nike',
  'Adidas',
  'Jordan',
  'Fear of God',
  'Supreme',
  'Balenciaga',
  'Chrome Hearts',
  'Denim Tears',
  'New Balance',
  'Vans',
  'Off-White',
  'Puma',
  'Bape',
  'ASICS',
];

const tops = ['S', 'M', 'L', 'XXL'];

const bottoms = ['S', 'M', 'L', 'XXL'];

export const OnboardingScreen: FC<{}> = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const navigation: NavigationProp<any, any> = useNavigation();
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;

  const [data, setData] = useState({
    shoeSize: '',
    topsSizes: [],
    bottomsSizes: [],
    favoriteBrands: [],
    conditionInterest: [],
  });

  const handleShoeSizeChange = ({value}) => {
    setData({...data, shoeSize: value});
  };

  const handleChange = name => value => {
    setData(prevData => {
      const newArray = prevData[name];
      // Check if the value is already included in the array
      if (newArray.includes(value)) {
        // Filter out the value from the array
        return {
          ...prevData,
          [name]: newArray.filter(item => item !== value),
        };
      } else {
        // Add the value to the array
        return {
          ...prevData,
          [name]: [...newArray, value],
        };
      }
    });
  };

  const handleSaveData = () => {
    loggingService().logEvent('complete_onboarding');
    dispatch(
      updateUser({
        userId: userData?._id,
        userData: {onboardingData: data},
        noLoad: true,
      }),
    );
  };

  const handleNext = () => {
    if (currIndex === 1) {
      goBack();
      goBack();
      handleSaveData();
      return;
    }

    swiperRef?.current?.scrollTo(currIndex + 1);
  };

  const handleSkip = () => {
    loggingService().logEvent('skip_onboarding');
    goBack();
    goBack(); // I call it twice so it can collapse the signup navigation modal as well
  };

  const renderButtons = () => {
    return (
      <ButtonContainer>
        <LSButton
          title={'Skip'}
          size={Size.Fit_To_Width}
          type={Type.Grey}
          radius={20}
          onPress={() => handleSkip()}
          marginBottom={20}
        />
        <LSButton
          title={'Next'}
          size={Size.Fit_To_Width}
          type={Type.Primary}
          radius={20}
          onPress={() => handleNext()}
        />
      </ButtonContainer>
    );
  };

  const filterIsSelected = (option, type) => {
    return data[type].includes(selectedData);
  };

  const renderFilter = ({item}, type) => {
    return (
      <FilterButton
        onPress={() => handleChange(type)(item)}
        isSelected={data[type].includes(item)}
        key={item}
        horizontalPadding={9}>
        <FilterButtonText isSelected={data[type].includes(item)}>
          {item}
        </FilterButtonText>
      </FilterButton>
    );
  };

  const RenderListFilter = ({data, title, type}) => {
    return (
      <ListContainer>
        <LabelText>{title}</LabelText>
        <SelectionsContainer>
          {data.map((item, index) => renderFilter({item}, type))}
        </SelectionsContainer>
      </ListContainer>
    );
  };
  const RenderStepOne = () => {
    return (
      <InnerContainer>
        <ScrollView>
          <LabelText>Select Your Shoe Size</LabelText>
          <LSDropDown
            isSearch={true}
            itemsList={shoesSizeList}
            dropdownLabel={'Size'}
            onSelectItem={handleShoeSizeChange}
            selectedValue={{label: data.shoeSize, value: data.shoeSize}}
          />
          <RenderListFilter
            data={upperClothingSize.map(size => size.value)}
            title={'Select Your Tops Size'}
            type={'topsSizes'}
          />
          <RenderListFilter
            data={lowerClothingSize.map(size => size.value)}
            title={'Select Your Bottoms Size'}
            type={'bottomsSizes'}
          />
        </ScrollView>
      </InnerContainer>
    );
  };

  const RenderStepTwo = () => {
    return (
      <InnerContainer>
        <ScrollView>
          <RenderListFilter
            data={brands}
            title={'Select Your Favorite Brands'}
            type={'favoriteBrands'}
          />
          <Spacer space={20} />
          <LabelText>Product Condition You're Interested In</LabelText>
          <Spacer space={10} />
          <CheckboxContainer>
            <AnimatedCheckBox
              isChecked={data['conditionInterest'].includes('Both')}
              selected={data['conditionInterest'].includes('Both')}
              disableBuiltInState={true}
              text="Both New & Pre-owned"
              onPress={() => handleChange('conditionInterest')('Both')}
            />
            <AnimatedCheckBox
              isChecked={data['conditionInterest'].includes('New')}
              selected={data['conditionInterest'].includes('New')}
              disableBuiltInState={true}
              text="New"
              onPress={() => handleChange('conditionInterest')('New')}
            />
            <AnimatedCheckBox
              isChecked={data['conditionInterest'].includes('Pre-owned')}
              selected={data['conditionInterest'].includes('Pre-owned')}
              disableBuiltInState={true}
              text="Pre-owned"
              onPress={() => handleChange('conditionInterest')('Pre-owned')}
            />
          </CheckboxContainer>
        </ScrollView>
      </InnerContainer>
    );
  };

  const renderSteps = () => {
    return [1, 2].map(page => {
      switch (page) {
        case 1:
          return <RenderStepOne key="step1" />;
        case 2:
          return <RenderStepTwo key="step2" />;
        default:
          break;
      }
    });
  };

  return (
    <Container>
      <InStackHeader back={false} title={`Finish Your Profile`} />
      <CloseTouchable onPress={handleSkip}>
        <SvgXml xml={TRADE_MODAL_CLOSE_BUTTON} />
      </CloseTouchable>
      <ProgressBar progress={(currIndex + 1) / 2} />

      <SwiperComponent
        ref={swiperRef}
        onIndexChanged={setCurrIndex}
        removeClippedSubviews={false}
        loop={false}>
        {renderSteps()}
      </SwiperComponent>
      {renderButtons()}
    </Container>
  );
};

export default OnboardingScreen;
