import { Flex, Image, useColorMode } from "@chakra-ui/react";
import { Link, Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtoms";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { BsFillChatQuoteFill } from "react-icons/bs";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);

  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>
      {user && (
        <Link as={RouterLink} to={"/"}>
          <AiFillHome size={24} />
        </Link>
      )}
      <Image
        cursor={"pointer"}
        alt="logo"
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
        w={6}
      />
      {user && (
        <Flex gap={5}>
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <BsFillChatQuoteFill size={24} />
          </Link>
          {user && <LogoutButton />}
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
