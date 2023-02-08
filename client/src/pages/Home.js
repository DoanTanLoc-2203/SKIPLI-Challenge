import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon
} from "@chakra-ui/react";
import React from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";

export default function Home() {
  return (
    <Box w="100%" position="relative">
      <InputGroup colorScheme="blue.500" maxW="500px" m="auto">
        <InputLeftAddon
          children={<Icon as={IoSearchSharp} w="30px" h="30px" />}
        />
        <Input placeholder="username" />
        <InputRightAddon
          cursor="pointer"
          children="Search"
        />
      </InputGroup>

      <Icon
        as={BsFillMenuButtonWideFill}
        w="30px"
        h="30px"
        position="absolute"
        right="16px"
        top="50%"
        transform="translateY(-50%)"
      />
    </Box>
  );
}
