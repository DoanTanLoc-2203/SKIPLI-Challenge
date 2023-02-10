import {
  Avatar,
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Get } from "../services/axios.service";
import { FaBook, FaUser } from "react-icons/fa";

export const ProfileModal = (props) => {
  const { onClose, isOpen } = props;
  const [likedList, setLikedList] = useState([]);
  const phoneNumber = localStorage.getItem("phoneNumber");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const getData = async () => {
      setIsLoading(true);
      const response = await Get("/user", { phoneNumber });
      if (response) {
        setLikedList(response?.data?.favorite_github_users);
      }
      setIsLoading(false);
    };
    getData();
  }, [isOpen]);

  const goToGihub = (id) => {
    window.location.href = id;
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent overflow="hidden">
          <ModalHeader>User Profile {`(${phoneNumber})`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="16px" position="relative">
            <Text fontSize="18px" fontWeight="bold" h="36px">
              Favorite List
            </Text>
            <Box h="500px" overflow="auto">
              {likedList?.map((ele) => {
                return (
                  <Flex
                    key={ele?.id}
                    alignItems="center"
                    justifyContent="space-between"
                    py="10px"
                    px="10px"
                    cursor="pointer"
                    borderRadius="10px"
                    onClick={() => goToGihub(ele?.html_url)}
                    _hover={{
                      background: "rgba(0,0,0,0.2)",
                    }}
                  >
                    <Flex alignItems="center">
                      <Avatar name="abc" mr="16px" src={ele?.avatar_url} />
                      <Text>{ele?.login}</Text>
                    </Flex>
                    <Box>
                      <Flex alignItems="center" justifyContent="flex-end">
                        <span>{ele?.followers | 0}</span>
                        <Icon
                          as={FaUser}
                          w="4"
                          h="4"
                          cursor="pointer"
                          ml="5px"
                        />
                      </Flex>
                      <Flex alignItems="center" justifyContent="flex-end">
                        <span>{ele?.public_repos | 0}</span>
                        <Icon
                          as={FaBook}
                          w="4"
                          h="4"
                          cursor="pointer"
                          ml="5px"
                        />
                      </Flex>
                    </Box>
                  </Flex>
                );
              })}
              {likedList?.length === 0 && (
                <Text textAlign="center">Empty data</Text>
              )}
            </Box>
            <Flex
              alignItems="center"
              justifyContent="center"
              w="100%"
              h="100%"
              top="36px"
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
