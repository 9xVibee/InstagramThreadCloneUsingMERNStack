import { Button, useToast } from "@chakra-ui/react";
import userAtom from "../atoms/userAtoms";
import { useSetRecoilState } from "recoil";
import { FiLogOut } from "react-icons/fi";
const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
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
      } else {
        toast({
          title: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      localStorage.removeItem("user-threads");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button size={["sm"]} marginTop={-1} onClick={handleLogout}>
      <FiLogOut size={"20px"} />
    </Button>
  );
};

export default LogoutButton;
