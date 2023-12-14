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
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtoms";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const MessageContainer = () => {
  const messageRefEnd = useRef();
  const toast = useToast();
  const [selectedConversation, setSeletedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const { socket } = useSocket();
  const setConversations = useSetRecoilState(conversationsAtom);

  // handling seen
  useEffect(() => {
    const lastMessageIsFromOtherUser =
      messages.length &&
      messages[messages.length - 1].sender !== currentUser._id;

    if (lastMessageIsFromOtherUser) {
      socket.emit("markMessagesAsSeen", {
        conversationId: selectedConversation._id,
        userId: selectedConversation.userId,
      });
    }

    socket.on("messageSeen", ({ conversationId }) => {
      if (selectedConversation._id === conversationId) {
        setMessages((prev) => {
          const updatedMessages = prev.map((msg) => {
            if (!msg.seen) {
              return {
                ...msg,
                seen: true,
              };
            }
            return msg;
          });
          return updatedMessages;
        });
      }
    });
  }, [
    socket,
    currentUser._id,
    messages,
    selectedConversation._id,
    selectedConversation.userId,
  ]);

  // handling new message
  useEffect(() => {
    socket.on("newMessage", (message) => {
      if (selectedConversation._id === message.conversationId)
        setMessages((prevMessages) => [...prevMessages, message]);

      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === selectedConversation._id) {
            return {
              ...conversation,
              lastMessage: {
                text: message.text,
                sender: message.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
    });
    return () => socket.off("newMessage");
  }, [socket]);

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

  // scroll to new message
  useEffect(() => {
    messageRefEnd.current?.scrollIntoView({
      behavior: "smooth",
    });
  });
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
        mb={2}
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
              <Flex
                key={idx}
                flexDir={"column"}
                marginBottom={-3}
                ref={
                  messages.length - 1 === messages.indexOf(msg)
                    ? messageRefEnd
                    : null
                }
              >
                <Message
                  key={idx}
                  message={msg}
                  ownMessage={msg.sender === currentUser._id}
                />
              </Flex>
            );
          })}
      </Flex>
      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;
