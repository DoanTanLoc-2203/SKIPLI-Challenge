import { Button, HStack, Input, PinInput, PinInputField, VStack } from "@chakra-ui/react";
import React from "react";

export default function Login() {
  return (
    <VStack spacing="16px" w="100%" textAlign="center">
      <Input placeholder="Phone number" maxW="300px" w="100%" m="auto" />
      <HStack justifyContent="center">
        <PinInput>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <Button colorScheme="blue">Login</Button>
    </VStack>
  );
}
