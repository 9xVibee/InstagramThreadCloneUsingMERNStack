/* eslint-disable no-unused-vars */
import {
  Avatar,
  Divider,
  Flex,
  Image,
  Link,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtoms";
import { useNavigate } from "react-router-dom";

const MessageContainer = () => {
  const toast = useToast();
  const [selectedConversation, setSeletedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();

  // getting all the messages
  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessage(true);
      setMessages([]);
      try {
        if (selectedConversation.mock) return;
        const res = await fetch(`/api/messages/${selectedConversation.userId}`);
        const data = await res.json();

        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
          });
          return;
        }
        setLoadingMessage(false);
        console.log(data);
        setMessages(data);
      } catch (err) {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
        });
        console.log(err.message);
      } finally {
        setLoadingMessage(false);
      }
    };

    getMessages();
  }, [selectedConversation, toast]);

  const handleNavigate = () => {
    navigate(`/${selectedConversation.username}`);
  };
  return (
    <Flex
      flex={70}
      bg={useColorModeValue("gray.200", "gray.dark")}
      borderRadius={"md"}
      flexDirection={"column"}
    >
      {/* Message Header */}
      <Flex w={"full"} alignItems={"center"} gap={2} p={3} h={"60px"}>
        <Avatar src={selectedConversation.profilepic} size={"sm"} />
        <Text
          display={"flex"}
          alignItems={"center"}
          onClick={handleNavigate}
          _hover={{
            cursor: "pointer",
          }}
        >
          {selectedConversation.username}{" "}
          <Image src="./verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>
      <Divider />

      {/* Messages */}
      <Flex
        flexDir={"column"}
        gap={4}
        height={"420px"}
        overflowY={"scroll"}
        mt={2}
      >
        {loadingMessage &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
              alignSelf={i % 2 == 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 == 0 && <SkeletonCircle size={7} />}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
              </Flex>
              {i % 2 != 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}

        {!loadingMessage &&
          messages.map((msg, idx) => {
            return (
              <Message
                key={idx}
                message={msg}
                ownMessage={msg.sender === currentUser._id}
              />
            );
          })}
      </Flex>
      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;
