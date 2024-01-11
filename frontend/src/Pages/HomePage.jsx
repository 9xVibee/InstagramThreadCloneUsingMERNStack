import { Box, Flex, Heading, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import SuggestedUsers from "../components/SuggestedUsers";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toast = useToast();

  useEffect(() => {
    const getFeedPost = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if (data.error) navigate("/auth");

        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getFeedPost();
  }, [toast]);

  return (
    <Flex gap={10} alignItems={"flex-start"}>
      {/* Post side */}
      <Box flex={70}>
        {loading && (
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Spinner size={"xl"} />
          </Flex>
        )}

        {!loading && posts.length === 0 && (
          <Flex justifyContent={"center"} alignItems={"center"} h={"70vh"}>
            <Heading>Follow some users to see Posts</Heading>
          </Flex>
        )}

        {posts.length &&
          posts.map((data, idx) => {
            return (
              <>
                <Posts key={idx} post={data} postedBy={data.postedBy} />
              </>
            );
          })}
      </Box>

      {/* Suggested user side */}
      <Box
        flex={30}
        display={{
          base: "none",
          md: "block",
        }}
      >
        <SuggestedUsers />
      </Box>
    </Flex>
  );
};

export default HomePage;
