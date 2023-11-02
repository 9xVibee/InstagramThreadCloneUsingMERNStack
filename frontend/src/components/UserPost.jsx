import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { useState } from "react";

const UserPost = () => {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={"/mark/post/1"}>
      {/* Dividing into sections */}
      <Flex gap={4} mt={4} mb={10}>
        {/* First section of profile and bar*/}
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar src="/zuck-avatar.png" size={"md"} />
          <Box w={"1px"} h={"full"} bg={"grey.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="John Doe"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="John Doe"
              src="https://bit.ly/ryan-florence"
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="John Doe"
              src="https://bit.ly/kent-c-dodds"
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}
            />
          </Box>
        </Flex>
        {/* second section of information */}
        <Flex flex={1} flexDirection={"column"} gap={"2"}>
          {/* 1st */}
          <Flex w={"full"} justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
              <Text fontWeight={"bold"} fontSize={"sm"}>
                markzuckerberg
              </Text>
              <Image mt={1} src="/verified.png" w={4} h={4} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"grey.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          {/* 1 end */}

          <Text fontWeight={"semibold"} fontSize={"sm"}>
            This is my first post.
          </Text>
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"grey.light"}
          >
            <Image src="/post1.png" w={"full"} h={"full"} />
          </Box>
          <Actions liked={liked} setLiked={setLiked} />
          <Flex alignItems={"center"} gap={2}>
            <Text color={"grey.light"} fontSize={"sm"}>
              238 replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"grey.light"}></Box>
            <Text color={"grey.light"} fontSize={"sm"}>
              1200 likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
