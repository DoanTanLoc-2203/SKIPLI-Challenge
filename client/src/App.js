import { Box, Text } from "@chakra-ui/react";
import "./App.css";
import Router from "./Router";

function App() {
  return (
    <Box maxW="1000px" m="auto" h="max-content">
      <Text fontSize="28px" fontWeight="bold" textAlign="center">
      SKIPLI CHALLENGE
      </Text>
      <Box my="50px">
        <Router />
      </Box>
    </Box>
  );
}

export default App;
