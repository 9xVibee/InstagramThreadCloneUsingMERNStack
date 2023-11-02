import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import Actions from "../components/Actions";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { DeleteIcon } from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";

import userAtom from "../atoms/userAtoms";
// import { formatDistanceToNow } from "date-fns";

const PostPage = () => {
  const { username, pid } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);

  const currentUser = useRecoilValue(userAtom);

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const handleDeletePost = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure want to delete this post?")) return;

    try {
      const res = await fetch(`/api/posts/delete/${post?._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      toast({
        title: data.message + " REFRESH THE PAGE!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(`/${username}`);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  useEffect(() => {
    // getting user info
    const getUser = async () => {
      setLoading(true);
      try {
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
          return;
        }

        setUser(data);
      } catch (err) {
        console.log("Error in user Headers " + err.message);
      } finally {
        setLoading(false);
      }
    };
    getUser();

    // const user post
    const getPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();

        // console.log(data);
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
        console.log(data);
        setPost(data);
      } catch (error) {
        toast({
          title: "Error",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [pid, toast, username]);

  {
    loading && (
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!post) return;
  return (
    <>
      <Flex flexDirection={"column"} gap={2}>
        <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems={"center"} gap={3}>
            <Avatar src={user?.profilepic} />
            <Flex alignItems={"center"} gap={1}>
              <Text fontWeight={"bold"}>{user?.username}</Text>
              <Image src="/public/verified.png" w={4} h={4} />
            </Flex>
          </Flex>
          <Flex gap={4} alignItems={"center"}>
            <Text fontSize={"sm"} color={"grey.light"}>
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </Text>
            {currentUser?._id === user?._id && (
              <DeleteIcon onClick={handleDeletePost} cursor={"pointer"} />
            )}
          </Flex>
        </Flex>
        <Text fontWeight={"semibold"}>{post?.text}</Text>
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"grey.light"}
        >
          <Image src={post?.img} w={"full"} h={"full"} />
        </Box>
        <Actions post={post} />
      </Flex>

      <Divider my={4} />
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex alignItems={"center"} gap={2}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"grey.light"}> Get the app to like, reply and post</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      {post.replies.map((reply) => {
        return <Comment key={reply.userId} reply={reply} />;
      })}
    </>
  );
};

export default PostPage;
