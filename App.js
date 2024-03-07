import { NavigationContainer } from "@react-navigation/native";
import { AuthContextProvider } from "./app/context/AuthContext";
import NavigationStack from "./app/components/main/NavigationStack";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
