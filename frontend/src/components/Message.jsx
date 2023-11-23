/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtoms";

const Message = ({ ownMessage, message }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);

  return (
    <>
      {ownMessage ? (
        <Flex paddingRight={2} gap={2} alignSelf={"flex-end"}>
          <Text
            maxW={"350px"}
            bg={"blue.400"}
            p={1}
            borderRadius={"md"}
            color={"black"}
          >
            {message.text}
          </Text>
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
