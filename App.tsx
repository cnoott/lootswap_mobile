import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from 'styled-components';
import ReduxStore from './src/redux/store/store';
import theme from './src/theme';
import StackNavigator from './src/navigation';
import {StatusBar} from 'react-native';
import CodePush from 'react-native-code-push';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {PUSHER_API_KEY, UXCAM_API_KEY} from '@env';
import RNUxcam from 'react-native-ux-cam';

let codePushOptions = {
  updateDialog: false,
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.ON_NEXT_SUSPEND,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSplashVisible: false,
      progress: 0,
    };

    this.codePushStatusDidChange = this.codePushStatusDidChange.bind(this);
    this.codePushDownloadDidProgress = this.codePushDownloadDidProgress.bind(this);
  }

  componentDidMount() {
    GoogleSignin.configure({
      googleServicePlistPath: __DEV__
        ? 'GoogleService-Info-Dev'
        : 'GoogleService-Info-Prod',
    });

    RNUxcam.optIntoSchematicRecordings(); // Add this line to enable iOS screen recordings
    const configuration = {
      userAppKey: UXCAM_API_KEY,
      enableAutomaticScreenNameTagging: false,
      enableAdvancedGestureRecognition: true,
      enableImprovedScreenCapture: true,
    };
    RNUxcam.startWithConfiguration(configuration);

    const initPusher = async () => {
      const pusher = Pusher.getInstance();
      await pusher.init({
        apiKey: PUSHER_API_KEY,
        cluster: 'us2',
      });

      await pusher.connect();
    };

    initPusher();

    this.checkForUpdate();
  }

  checkForUpdate() {
    console.log('Calling checkForUpdate');
    this.setState({isSplashVisible: true});
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      this.codePushStatusDidChange,
      this.codePushDownloadDidProgress
    );
  }

  codePushStatusDidChange(status) {
    console.log('CodePush status:', status); // Debugging log
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.');
        this.setState({isSplashVisible: false});
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({isSplashVisible: true});
        console.log('Downloading package.');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        this.setState({isSplashVisible: true});
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        console.log('App is up to date.');
        this.setState({isSplashVisible: false});
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        this.setState({isSplashVisible: false});
        break;
      case CodePush.SyncStatus.SYNC_IN_PROGRESS:
        console.log('Sync in progress.');
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        console.log('An unknown error occurred.');
        this.setState({isSplashVisible: false});
        break;
      default:
        this.setState({isSplashVisible: false});
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    console.log('Download progress:', progress.receivedBytes, progress.totalBytes); // Debugging log
    this.setState({ progress: (progress.receivedBytes / progress.totalBytes) * 100 });
  }

  render() {
    return (
      <Provider store={ReduxStore.store}>
        <StatusBar barStyle={'dark-content'} />
        <PersistGate loading={null} persistor={ReduxStore.persistor}>
          <ThemeProvider theme={theme}>
            <StackNavigator
              isSplashVisible={this.state.isSplashVisible}
              progress={this.state.progress}
            />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default CodePush(codePushOptions)(App);

