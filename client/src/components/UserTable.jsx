import {
  Avatar,
  Box,
  Flex,
  Icon,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
export const UserTable = (props) => {
  const {
    isLoading,
    data,
    onLike,
    onPrevious,
    onNext,
    currentPage,
    totalPage,
  } = props;

  return (
    <Box>
      <TableContainer mt="32px" border="1px solid #EDF2F7" borderRadius="10px">
        <Table size="sm" variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Login</Th>
              <Th>Avartar</Th>
              <Th>Html URL</Th>
              <Th>Followers</Th>
              <Th>Public Repos</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody position="relative" w="100%" h="max-content">
            <Flex
              alignItems="center"
              justifyContent="center"
              w="100%"
              h="100%"
              top="0"
              left="0"
              position="absolute"
              zIndex={100}
              background="rgba(0,0,0,0.3)"
              transition="0.3s"
              opacity={isLoading ? 1 : 0}
              visibility={isLoading ? "visible" : "hidden"}
            >
              <Spinner />
            </Flex>
            {data?.map((ele) => {
              return (
                <Tr key={ele?.id}>
                  <Td>{ele?.id}</Td>
                  <Td>{ele?.login}</Td>
                  <Td>
                    <Avatar name={ele?.login} src={ele?.avatar_url} />
                  </Td>
                  <Td>
                    <Link color="blue.500" href={ele?.html_url}>
                      {ele?.html_url}
                    </Link>
                  </Td>
                  <Td>{ele?.followers}</Td>
                  <Td>{ele?.public_repos}</Td>
                  <Td>
                    <Icon
                      onClick={() => onLike(ele?.id)}
                      as={ele?.isLiked ? AiTwotoneLike : AiOutlineLike}
                      w={6}
                      h={6}
                      color={ele?.isLiked ? "blue.500" : "black.500"}
                      transition="0.3s"
                      cursor="pointer"
                      _hover={{ transform: "scale(1.2)" }}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {data && data.length == 0 ? (
        <Text textAlign="center">Empty data</Text>
      ) : (
        ""
      )}
      {data && data.length > 0 && (
        <Flex
          justifyContent="flex-end"
          my="16px"
          gap="10px"
          alignItems="center"
        >
          <Icon
            as={MdOutlineArrowBackIos}
            w={6}
            h={6}
            color="black.500"
            transition="0.3s"
            cursor="pointer"
            _hover={{ transform: "scale(1.2)" }}
            onClick={onPrevious}
          />
          <Text fontSize="18px">{`${currentPage}/${totalPage}`}</Text>
          <Icon
            as={MdOutlineArrowForwardIos}
            w={6}
            h={6}
            color="black.500"
            transition="0.3s"
            cursor="pointer"
            _hover={{ transform: "scale(1.2)" }}
            onClick={onNext}
          />
        </Flex>
      )}
    </Box>
  );
};
