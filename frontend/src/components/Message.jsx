/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtoms";
import { BsCheck2All } from "react-icons/bs";

const Message = ({ ownMessage, message }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);

  console.log(message.seen, "Chekcing");
  return (
    <>
      {ownMessage ? (
        <Flex paddingRight={2} gap={2} alignSelf={"flex-end"}>
          <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
            <Text color={"white"}>{message.text}</Text>
            <Box
              alignSelf={"flex-end"}
              ml={1}
              color={message.seen ? "blue.400" : ""}
              fontWeight={"bold"}
            >
              <BsCheck2All size={16} />
            </Box>
          </Flex>
          <Avatar src={user.profilepic} w={7} h={7} />
        </Flex>
      ) : (
        <>
          <Flex paddingLeft={2} gap={2} alignSelf={"flex-start"}>
            <Avatar src={selectedConversation.profilepic} w={7} h={7} />
            <Text
              maxW={"350px"}
              bg={"gray.400"}
              p={1}
              borderRadius={"md"}
              color={"black"}
            >
              {message.text}
            </Text>
          </Flex>
        </>
      )}
    </>
  );
};

export default Message;
