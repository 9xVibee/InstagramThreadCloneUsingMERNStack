/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BsCheck2All } from "react-icons/bs";
import userAtom from "./../atoms/userAtoms.js";
import { selectedConversationAtom } from "../atoms/messagesAtom.js";

const Conversation = ({ conversation, isOnline }) => {
  const currentUser = useRecoilValue(userAtom);
  const [selectedConversation, setSeletedConversation] = useRecoilState(
    selectedConversationAtom
  );

  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={"1"}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.300", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
      onClick={() => {
        setSeletedConversation({
          _id: conversation._id,
          userId: conversation.participants[0]._id,
          username: conversation.participants[0].username,
          profilepic: conversation.participants[0].profilepic,
          mock: conversation.mock,
        });
      }}
      bg={
        selectedConversation?._id === conversation?._id
          ? useColorModeValue("gray.300", "gray.dark")
          : ""
      }
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src={conversation?.participants[0].profilepic}
        >
          {isOnline && <AvatarBadge boxSize={"1em"} bg={"green.500"} />}
        </Avatar>
      </WrapItem>
      <Stack direction={"column"}>
        <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
          {conversation.participants[0].username}{" "}
          <Image src="./verified.png" w={4} h={4} ml={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser._id === conversation.lastMessage.sender ? (
            <Box color={conversation.lastMessage.seen ? "blue.400" : ""}>
              <BsCheck2All size={16} />
            </Box>
          ) : (
            ""
          )}
          {conversation.lastMessage.text?.length > 10
            ? conversation.lastMessage.text.substring(0, 10) + "..."
            : conversation.lastMessage.text}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
