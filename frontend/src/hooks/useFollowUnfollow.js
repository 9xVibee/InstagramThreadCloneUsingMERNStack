import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtoms";

const useFollowUnfollow = (user) => {
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser._id)
  );
  const [updating, setUpdating] = useState(false);
  const toast = useToast();

  // handeling follow and unfollow
  const handleFollowChange = async () => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "Please Login to follow",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      if (following) {
        user.followers.pop();
      } else user.followers.push(currentUser._id);

      toast({
        title: data.message,
        status: following ? "error" : "success",
        duration: 3000,
        isClosable: true,
      });
      setFollowing(!following);
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
      setUpdating(false);
    }
  };
  return { handleFollowChange, updating, following };
};

export default useFollowUnfollow;
