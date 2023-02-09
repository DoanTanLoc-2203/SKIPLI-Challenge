import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import React, { useMemo, useRef, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos
} from "react-icons/md";
import { Get } from "../services/axios.service";

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [option, setOption] = useState({
    q: "",
    per_page: 10,
    page: 1,
  });
  const refSearch = useRef(option?.q);

  const handleChangeSearch = (event) => {
    setOption({ ...option, q: event.target.value });
  };

  const onSearch = async () => {
    setIsLoading(true);
    if (option?.q?.length > 0) {
      refSearch.current = option?.q;
      setOption({ ...option, page: 1 });
      const response = await Get("/github", option);
      if (response) setData(response?.data);
    } else setData([]);

    setIsLoading(false);
  };

  const pageNumber = useMemo(() => {
    if (data?.total_count)
      return Math.ceil(Number(data?.total_count) / option.per_page);
    else return 0;
  }, [data?.total_count, option.per_page]);

  const rowData = useMemo(() => {
    if (data?.items) {
      return data?.items?.map((ele) => {
        return {
          id: ele?.id,
          login: ele?.login,
          avatar_url: ele?.avatar_url,
          html_url: ele?.html_url,
        };
      });
    } else return [];
  }, [data]);

  const handleNextPage = async () => {
    if (isLoadingPage) return;
    setIsLoadingPage(true);
    setOption({
      ...option,
      page: option.page + 1 > pageNumber ? pageNumber : option.page + 1,
    });
    if (option.page !== pageNumber) {
      const response = await Get("/github", {
        ...option,
        page: option.page + 1,
        q: refSearch.current,
      });
      if (response) setData(response?.data);
    }

    setIsLoadingPage(false);
  };

  const handlePreviousPage = async () => {
    if (isLoadingPage) return;
    setIsLoadingPage(true);
    setOption({
      ...option,
      page: option.page - 1 <= 0 ? 1 : option.page - 1,
    });
    if (option.page !== 1) {
      const response = await Get("/github", {
        ...option,
        page: option.page - 1,
        q: refSearch.current,
      });
      if (response) setData(response?.data);
    }

    setIsLoadingPage(false);
  };

  return (
    <Box>
      <Box w="100%" position="relative">
        <InputGroup colorScheme="blue.500" maxW="500px" m="auto">
          <InputLeftAddon
            children={<Icon as={IoSearchSharp} w="30px" h="30px" />}
          />
          <Input
            placeholder="username"
            onChange={handleChangeSearch}
            values={option?.q}
            isDisabled={isLoading}
          />
          <Button
            ml="16px"
            cursor="pointer"
            colorScheme="blue"
            children="Search"
            onClick={onSearch}
            isLoading={isLoading}
            minW="150px"
            loadingText="Searching..."
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
      <Box>
        <TableContainer
          mt="32px"
          border="1px solid #EDF2F7"
          borderRadius="10px"
          p="5px">
          <Table
            size="sm"
            variant="striped"
            colorScheme="gray"
            isLoading={isLoading}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Login</Th>
                <Th>Avartar</Th>
                <Th>Html URL</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {rowData?.map((ele) => {
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
                    <Td>
                      <Icon
                        as={AiOutlineLike}
                        w={6}
                        h={6}
                        color="black.500"
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
        {rowData && rowData.length == 0 ? (
          <Text textAlign="center">Empty data</Text>
        ) : (
          ""
        )}
        {rowData && rowData.length > 0 && (
          <Flex
            justifyContent="flex-end"
            my="16px"
            gap="10px"
            alignItems="center">
            <Icon
              as={MdOutlineArrowBackIos}
              w={6}
              h={6}
              color="black.500"
              transition="0.3s"
              cursor="pointer"
              _hover={{ transform: "scale(1.2)" }}
              onClick={handlePreviousPage}
            />
            <Text fontSize="18px">{`${option.page}/${pageNumber}`}</Text>
            <Icon
              as={MdOutlineArrowForwardIos}
              w={6}
              h={6}
              color="black.500"
              transition="0.3s"
              cursor="pointer"
              _hover={{ transform: "scale(1.2)" }}
              onClick={handleNextPage}
            />
          </Flex>
        )}
      </Box>
    </Box>
  );
}
