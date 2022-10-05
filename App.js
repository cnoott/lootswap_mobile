import NavBar from './shared/NavBar';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './shared/UserContext';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
      'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
      'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
      'Inter-Light': require('./assets/fonts/Inter-Light.otf')
  });

  return (
      <UserProvider>
          <NavigationContainer>
              <NavBar/>
          </NavigationContainer>
      </UserProvider>
  );
}

