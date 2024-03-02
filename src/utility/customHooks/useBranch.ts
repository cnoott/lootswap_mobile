import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import branch from 'react-native-branch';
import {saveInstallParams} from '../../redux/modules';

//import {Alert} from 'react-native';

const useBranch = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    branch.subscribe(async ({ error, params }) => {
      if (error) {
        console.error('Error from Branch: ' + error)
        return
      }
      // params will never be null if error is null
      let installParams = await branch.getFirstReferringParams();
      console.log('Branch IO Install Params', installParams);

      //Alert.alert(`${JSON.stringify(installParams)}`);
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
