/* eslint-disable react/prop-types */
import { Avatar, Flex, Text } from "@chakra-ui/react";

const Message = ({ ownMessage }) => {
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores,
            architecto. Impedit, qui iusto officiis illo repellendus beatae
            natus ipsa min!
          </Text>
          <Avatar src="" w={7} h={7} />
        </Flex>
      ) : (
        <>
          <Flex paddingLeft={2} gap={2} alignSelf={"flex-start"}>
            <Avatar src="" w={7} h={7} />
            <Text
              maxW={"350px"}
              bg={"gray.400"}
              p={1}
              borderRadius={"md"}
              color={"black"}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores,
              architecto. Impedit, qui iusto officiis
            </Text>
          </Flex>
        </>
      )}
    </>
  );
};

export default Message;
