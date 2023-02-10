import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { ProfileModal } from "../components/ProfileModal";
import { UserTable } from "../components/UserTable";
import { handleShowMessage } from "../helpers/showMessage";
import { Get, Post } from "../services/axios.service";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [likedListId, setLikedListId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const phoneNumber = localStorage.getItem("phoneNumber");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [option, setOption] = useState({
    q: "", // search string
    per_page: 10, // number record per page
    page: 1, // current page
  });
  const refSearch = useRef(option?.q);
  const toast = useToast();
  const navigate = useNavigate();

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

  const totalPage = useMemo(() => {
    if (data?.total_count)
      return Math.ceil(Number(data?.total_count) / option.per_page);
    else return 0;
  }, [data?.total_count, option.per_page]);

  const rowData = useMemo(() => {
    if (data?.items) {
      return data?.items?.map((ele) => {
        const isLiked = likedListId?.find((id) => id === ele?.id)
          ? true
          : false;

        return {
          id: ele?.id,
          login: ele?.login,
          avatar_url: ele?.avatar_url,
          html_url: ele?.html_url,
          followers: ele?.followers,
          public_repos: ele?.public_repos,
          isLiked: isLiked,
        };
      });
    } else return [];
  }, [data, likedListId]);

  const handleNextPage = async () => {
    if (isLoadingPage) return;
    setIsLoadingPage(true);
    setOption({
      ...option,
      page: option.page + 1 > totalPage ? totalPage : option.page + 1,
    });
    if (option.page !== totalPage) {
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

  const onLikeUser = async (github_user_id) => {
    setIsLoadingPage(true);
    const response = await Post(
      "/github/like",
      { phoneNumber, github_user_id },
      handleShowMessage(toast)
    );
    if (response) {
      const newLikedList = [...likedListId];
      const likedUser = newLikedList?.find((id) => id === github_user_id);
      if (likedUser) {
        setLikedListId(newLikedList.filter((id) => id !== github_user_id));
      } else {
        newLikedList.push(github_user_id);
        setLikedListId(newLikedList);
      }
    }
    setIsLoadingPage(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("phoneNumber");
    navigate("/login");
  };

  useEffect(() => {
    if (phoneNumber) {
      const getData = async () => {
        const response = await Get("/user", { phoneNumber });
        if (response) {
          setLikedListId(
            response?.data?.favorite_github_users?.map((ele) => ele?.id)
          );
        }
      };
      getData();
    } else navigate("/login");
  }, []);

  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        position="relative"
      >
        <Icon
          as={RiLogoutBoxFill}
          w="30px"
          h="30px"
          color="red.500"
          cursor="pointer"
          transition="0.3s"
          _hover={{ transform: "scale(1.2)" }}
          onClick={handleLogout}
        />
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
          transition="0.3s"
          cursor="pointer"
          _hover={{ transform: "scale(1.2)" }}
          onClick={onOpen}
        />
      </Flex>
      <UserTable
        isLoading={isLoadingPage}
        data={rowData}
        onLike={onLikeUser}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
        currentPage={option?.page}
        totalPage={totalPage}
      />
      <ProfileModal
        phoneNumber={phoneNumber}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
}
