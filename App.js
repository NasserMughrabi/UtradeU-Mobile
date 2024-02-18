import { NavigationContainer } from "@react-navigation/native";
import { AuthContextProvider } from "./app/context/AuthContext.js";
import NavigationStack from "./app/components/main/NavigationStack.js";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
