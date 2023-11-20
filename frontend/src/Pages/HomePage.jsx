import { Flex, Heading, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Posts from "../components/Posts";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const getFeedPost = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        console.log(data);
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
    <>
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

      {posts.map((data) => {
        return <Posts key={data._id} post={data} postedBy={data.postedBy} />;
      })}
    </>
  );
};

export default HomePage;
