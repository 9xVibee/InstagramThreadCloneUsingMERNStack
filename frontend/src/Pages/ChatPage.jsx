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
  useToast,
} from "@chakra-ui/react";
import Conversation from "../components/Conversation";

import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtoms";

const ChatPage = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const [search, setSearch] = useState("");
  const [searchLoading, SetSearchLoading] = useState(false);
  const [selectedConvo, setSelectedConvo] = useRecoilState(
    selectedConversationAtom
  );
  const currentUser = useRecoilValue(userAtom);

  // getting conversations!
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();

        if (data.error) {
          return toast({
            title: "Error",
            description: data.error.message,
            status: "error",
          });
        }

        console.log(data);
        setConversations(data);
      } catch (err) {
        toast({
          title: err.message,
          status: "error",
        });
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  // handeling the search bar!
  const hanldeConversationSearch = async (e) => {
    e.preventDefault();
    SetSearchLoading(true);
    try {
      const res = await fetch(`/api/users/profile/${search}`);
      const data = await res.json();

      if (data.error) {
        return toast({
          title: "Error",
          description: data.error,
          status: "error",
        });
      }

      // if user trying to search itself or try to message!
      if (currentUser._id === data._id) {
        return toast({
          title: "You can't message or search yourself!",
          status: "error",
        });
      }

      // if user is already in a conversation with the searchedUser
      if (
        conversations.find(
          (conversation) => conversation.participants[0]._id === data._id
        )
      ) {
        setSelectedConvo({
          _id: conversations.find(
            (conversation) => conversation.participants[0]._id === data._id
          ),
          userId: data._id,
          username: data.username,
          profilepic: data.profilepic,
        });
        return;
      }

      const mockConversation = {
        mock: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants: [
          {
            _id: data._id,
            username: data.username,
            profilepic: data.profilepic,
          },
        ],
      };

      setConversations((prevConvo) => [...prevConvo, mockConversation]);
      SetSearchLoading(false);
      console.log(data);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
      });
      console.log(err);
    } finally {
      SetSearchLoading(false);
    }
  };

  return (
    <Box
      position={"absolute"}
      left={"50%"}
      w={{
        base: "100%",
        md: "80%",
        lg: "720px",
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
          <form onSubmit={hanldeConversationSearch}>
            <Flex alignItems={"center"} gap={2}>
              <Input
                placeholder="Search for a user"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <Button
                size={"sm"}
                onClick={hanldeConversationSearch}
                isLoading={searchLoading}
              >
                <SearchIcon />
              </Button>
            </Flex>
          </form>
          {loading &&
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

          {!loading &&
            conversations.map((convo, idx) => {
              return <Conversation key={idx} conversation={convo} />;
            })}
        </Flex>

        {/* Messages */}
        {/* Select conversation */}
        {selectedConvo._id === "" ? (
          <Flex
            flex={70}
            borderRadius={"md"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"400px"}
          >
            <GiConversation size={100} />
            <Text fontSize={20}>Select a Conversation to start messaging</Text>
          </Flex>
        ) : (
          <>
            {/* Message Container */}
            <MessageContainer />
          </>
        )}
      </Flex>
    </Box>
  );
};

export default ChatPage;
