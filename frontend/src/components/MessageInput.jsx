/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";

const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");

  const toast = useToast();

  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const [conversation, setConversations] = useRecoilState(conversationsAtom);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          receiverId: selectedConversation.userId,
        }),
      });

      const data = await res.json();
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
        });
        return;
      }

      setMessages((prev) => [...prev, data]);
      setConversations((prevConvo) => {
        const updatedConversations = prevConvo.map((conversation) => {
          if (conversation._id === selectedConversation._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: data.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
      setMessageText("");
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
      });
      console.log(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmitMessage}>
      <InputGroup>
        <Input
          w={"full"}
          placeholder="Type a message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <InputRightElement onClick={handleSubmitMessage}>
          <IoSendSharp />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
