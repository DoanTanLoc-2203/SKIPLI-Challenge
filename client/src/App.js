import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Router from "./Router";

export const GlobalState = React.createContext();

function App() {
  return (
    <Box maxW="1000px" m="auto" h="max-content">
      <Text fontSize="28px" fontWeight="bold" textAlign="center">
        {/* SKIPLI CHALLENGE */}
      </Text>
      <Box my="50px">
        <GlobalState.Provider value="Reed">
          <Router />
        </GlobalState.Provider>
      </Box>
    </Box>
  );
}

export default App;
