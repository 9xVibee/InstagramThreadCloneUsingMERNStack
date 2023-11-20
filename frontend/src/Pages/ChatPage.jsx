/* eslint-disable no-unused-vars */
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Conversation from "../components/Conversation";

import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";

const ChatPage = () => {
  return (
    <Box
      position={"absolute"}
      left={"50%"}
      w={{
        base: "100%",
        md: "80%",
        lg: "750px",
      }}
      transform={"translateX(-50%)"}
    >
      <Flex
        gap={4}
        flexDirection={{
          base: "column",
          md: "row",
        }}
        maxW={{
          sm: "400px",
          md: "full",
        }}
        mx={"auto"}
      >
        {/* Conversations */}
        <Flex
          flex={30}
          gap={2}
          flexDirection={"column"}
          maxW={{
            sm: "250px",
            md: "full",
          }}
        >
          <Text
            fontWeight={700}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Your Conversations
          </Text>
          <form>
            <Flex alignItems={"center"} gap={2}>
              <Input placeholder="Search for a user" />
              <Button size={"sm"}>
                <SearchIcon />
              </Button>
            </Flex>
          </form>
          {!true &&
            [0, 1, 2, 3, 4].map((_, i) => {
              return (
                <Flex
                  key={i}
                  gap={4}
                  alignItems={"center"}
                  p={"1"}
                  borderRadius={"md"}
                  w={"full"}
                >
                  <Box>
                    <SkeletonCircle size={"10"} />
                  </Box>
                  <Flex w={"full"} flexDirection={"column"} gap={"3"}>
                    <Skeleton h={"10px"} w={"100px"} />
                    <Skeleton h={"8px"} w={"120px"} />
                  </Flex>
                </Flex>
              );
            })}

          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
        </Flex>

        {/* Messages */}
        {/* Select conversation */}
        {/* <Flex
          flex={70}
          borderRadius={"md"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"400px"}
        >
          <GiConversation size={100} />
          <Text fontSize={20}>Select a Conversation to start messaging</Text>
        </Flex> */}

        {/* Message Container */}
        <MessageContainer />
      </Flex>
    </Box>
  );
};

export default ChatPage;
