/* eslint-disable no-unused-vars */
import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
  const [loading, setLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/users/suggested");
        const data = await res.json();

        if (data.error) {
          return toast({
            title: "Error",
            description: data.error.message,
            status: "error",
          });
        }

        setLoading(false);
        setSuggestedUsers(data);
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast({
          title: "Error",
          description: err.message,
          status: "error",
        });
      }
    };
    getSuggestedUsers();
  }, [toast]);

  return (
    <>
      <Text mb={4} fontWeight={"bold"}>
        Suggested User
      </Text>
      <Flex direction={"column"} gap={4}>
        {!loading &&
          suggestedUsers.map((user) => (
            <SuggestedUser key={user._id} user={user} />
          ))}
        {loading &&
          [0, 1, 2, 3, 5].map((_, idx) => {
            return (
              <Flex
                key={idx}
                gap={2}
                alignItems={"center"}
                p={"1"}
                borderRadius={"md"}
              >
                {/* Avatar skeleton */}
                <Box>
                  <SkeletonCircle size={"10"} />
                </Box>
                {/* Username and fullname skeleton */}
                <Flex w={"full"} flexDirection={"column"} gap={2}>
                  <Skeleton h={"8px"} w={"80px"} />
                  <Skeleton h={"8px"} w={"90px"} />
                </Flex>
                {/* Follow button */}
                <Flex>
                  <Skeleton h={"20px"} w={"60px"} />
                </Flex>
              </Flex>
            );
          })}
      </Flex>
    </>
  );
};

export default SuggestedUsers;
