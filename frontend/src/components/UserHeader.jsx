/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtoms";
import { Link, Link as RouterLink } from "react-router-dom";
import { useState } from "react";

const UserHeader = ({ user }) => {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom);
  const [updating, setUpdating] = useState(false);

  const [following, setFollowing] = useState(
    user && user.followers.includes(currentUser._id)
  );

  // handeling follow and unfollow
  const handleFollowChange = async () => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "Please Login to follow",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (following) {
        user.followers.pop();
      } else user.followers.push(currentUser._id);

      toast({
        title: data.message,
        status: following ? "error" : "success",
        duration: 3000,
        isClosable: true,
      });
      setFollowing(!following);
    } catch (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  // copy url component
  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: "Profile link copied.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <VStack
      alignItems={"start"}
      gap={4}
      bg={useColorModeValue("gray.200", "gray.dark")}
      px={5}
      py={8}
      borderRadius={10}
      mb={5}
    >
      <Flex w={"full"} justifyContent={"space-between"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user ? user.name : "Mark Zuckerberg"}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>
              {user ? user.username : "markzuckerberg"}
            </Text>
            <Text
              fontSize={"xs"}
              bg={"grey.dark"}
              color={"grey.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.next
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            name="Mark Zuckerberg"
            src={user.profilepic}
            size={{
              base: "md",
              md: "xl",
            }}
          />
        </Box>
      </Flex>
      <Text fontWeight={"bold"}>
        {user ? user.bio : "CEO and Founder of Facebook"}
      </Text>

      {currentUser && user && currentUser._id === user._id && (
        <Link as={RouterLink} to={"/update"}>
          <Button>Update Profile</Button>
        </Link>
      )}

      {currentUser && user && currentUser._id !== user._id && (
        <Button onClick={handleFollowChange} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}

      <Flex justifyContent={"space-between"} w={"full"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"grey.light"}>
            {user ? user.followers.length + " followers" : "3.2 k followers"}
          </Text>
          <Box w={1} h={1} bg={"grey.light"} borderRadius={"full"}></Box>
          <Text color={"grey.light"}>instagram.com</Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"grey.dark"}>
                  <MenuItem bg={"grey.dark"} onClick={copyUrl}>
                    COPY LINK
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          justifyContent={"center"}
          borderBottom={"1.5px solid white"}
          pb={3}
          cursor={"pointer"}
          fontWeight={"bold"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          justifyContent={"center"}
          borderBottom={"1px solid grey"}
          pb={3}
          cursor={"pointer"}
          fontWeight={"bold"}
          color={"grey.light"}
        >
          <Text>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
