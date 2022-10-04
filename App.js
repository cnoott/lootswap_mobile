import NavBar from './shared/NavBar';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './shared/UserContext';

export default function App() {
  return (
      <UserProvider>
          <NavigationContainer>
              <NavBar/>
          </NavigationContainer>
      </UserProvider>
  );
}

