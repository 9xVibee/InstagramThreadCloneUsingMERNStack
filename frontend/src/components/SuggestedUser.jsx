/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const SuggestedUser = ({ user }) => {
  const { handleFollowChange, updating, following } = useFollowUnfollow(user);

  return (
    <Flex gap={2} justifyContent={"space-between"} alignItems={"center"}>
      {/* Left side avatar and username */}
      <Flex gap={2} as={Link} to={`${user.username}`}>
        <Avatar src={user.profilepic} />
        <Box>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {user.username}
          </Text>
          <Text color={"gray.light"} fontSize={"sm"}>
            {user.name}
          </Text>
        </Box>
      </Flex>
      {/* Right side button */}
      <Button
        size={"sm"}
        color={following ? "black" : "white"}
        bg={following ? "white" : "blue.400"}
        onClick={handleFollowChange}
        isLoading={updating}
        _hover={{
          color: following ? "black" : "white",
          opacity: ".8",
        }}
      >
        {following ? "unfollow" : "follow"}
      </Button>
    </Flex>
  );
};

export default SuggestedUser;
