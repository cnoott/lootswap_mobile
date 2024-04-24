import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import branch from 'react-native-branch';
import {saveInstallParams, getProductDetails} from '../../redux/modules';
import {NavigationProp, useNavigation} from '@react-navigation/native';

//import {Alert} from 'react-native';

const useBranch = () => {
  const dispatch = useDispatch();
  const navigation: NavigationProp<any, any> = useNavigation();

  useEffect(() => {
    branch.subscribe(async ({error, params}) => {
      if (error) {
        console.error('Error from Branch: ' + error);
        return;
      }
      if (params['+clicked_branch_link'] && params['$ios_url']) {
        console.log('params', params['$ios_url']);
        const productId = params['$ios_url'].split('/').pop()
        console.log('PORUCTID', productId);
        if (productId) {
          dispatch(
            getProductDetails(productId, product => {
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
              navigation.navigate('ProductDetailsScreen', {
                productData: product,
                likedParam: false,
              });
            }),
          );

        }
      }
      // params will never be null if error is null
      let installParams = await branch.getFirstReferringParams();
      console.log('Branch IO Install Params', installParams);

      // TODO: affiliate codes
      dispatch(
        saveInstallParams({
          referringUserId: installParams?.userId,
          marketingChannel: installParams?.marketingChannel,
        }),
      );
    });
  }, []);
};

export default useBranch;
