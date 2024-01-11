/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import { Flex, Heading, Spinner, useToast } from "@chakra-ui/react";
import Posts from "../components/Posts";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [fetchingPost, setFetchingPost] = useState(false);

  const { username } = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        console.log("How many times!");
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();

        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          getPost();
          setUser(data);
        }
      } catch (err) {
        console.log("Error in user Headers " + err.message);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const getPost = async () => {
    setFetchingPost(true);
    try {
      const res = await fetch(`/api/posts/user/${username}`);
      const data = await res.json();

      if (data.error) {
        return toast({
          title: "Error",
          description: "Post not found",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setPosts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
      return;
    } finally {
      setFetchingPost(false);
    }
  };

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!user && !loading) return <h1>User not Found!</h1>;
  return (
    <>
      <UserHeader user={user} />
      {posts.length === 0 && !fetchingPost && (
        <Heading>User have no posts.</Heading>
      )}

      {fetchingPost && (
        <Flex justifyContent={"center"} alignItems={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {posts.map((data) => {
        return (
          <>
            <Posts key={data._id} post={data} postedBy={data.postedBy} />
          </>
        );
      })}
    </>
  );
};

export default UserPage;
