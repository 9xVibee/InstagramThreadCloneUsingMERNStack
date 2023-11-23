/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtoms";

const Posts = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);
  const currentUser = useRecoilValue(userAtom);

  const toast = useToast();
  const Navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${postedBy}`);
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
        setUser(data);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };
    getUser();
  }, [postedBy, toast]);

  const handleDeletePost = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure want to delete this post?")) return;

    try {
      const res = await fetch(`/api/posts/delete/${post?._id}`, {
        method: "DELETE",
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

      toast({
        title: data.message + " REFRESH THE PAGE!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  return (
    <Link to={`/${user?.username}/post/${post?._id}`}>
      {/* Dividing into sections */}
      <Flex
        gap={4}
        mt={3}
        bg={useColorModeValue("gray.200", "gray.dark")}
        py={4}
        px={3}
        pb={10}
        borderRadius={10}
      >
        {/* First section of profile and bar*/}
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            src={user?.profilepic}
            size={"md"}
            onClick={(e) => {
              e.preventDefault();
              Navigate(`/${user.username}`);
            }}
          />
          <Box w={"1px"} h={"full"} bg={"grey.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>🤔</Text>}
            {post.replies[0] && (
              <Avatar
                size={"xs"}
                name={post.replies[0]?.username}
                src={post.replies[0]?.userProfilePic}
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              />
            )}
            {post.replies[1] && (
              <Avatar
                size={"xs"}
                name={post.replies[1]?.username}
                src={post.replies[1]?.userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                right={"-5px"}
                padding={"2px"}
              />
            )}

            {post.replies[2] && (
              <Avatar
                size={"xs"}
                name={post.replies[2]?.username}
                src={post.replies[2]?.userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                left={"4px"}
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>
        {/* second section of information */}
        <Flex flex={1} flexDirection={"column"} gap={"2"}>
          {/* 1st */}
          <Flex w={"full"} justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
              <Text
                fontWeight={"bold"}
                fontSize={"sm"}
                onClick={(e) => {
                  e.preventDefault();
                  Navigate(`/${user.username}`);
                }}
              >
                {user?.username}
              </Text>
              <Image mt={1} src="/verified.png" w={4} h={4} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"grey.light"}>
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
              {currentUser?._id === user?._id && (
                <DeleteIcon onClick={handleDeletePost} cursor={"pointer"} />
              )}
            </Flex>
          </Flex>
          {/* 1 end */}

          <Text fontWeight={"semibold"} fontSize={"sm"}>
            {post.text}
          </Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"grey.light"}
            >
              <Image src={post.img} w={"full"} h={"full"} />
            </Box>
          )}
          <Actions post={post} />
        </Flex>
      </Flex>
    </Link>
  );
};

export default Posts;
