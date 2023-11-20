import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewingImg from "../hooks/userPreviewingImg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtoms";

const MAX_CHAR = 500;

const CreatePost = () => {
  // loading
  const [loading, setLoading] = useState(false);

  // useToast
  const toast = useToast();

  // importing user
  const user = useRecoilValue(userAtom);

  // post text
  const [postText, setPostText] = useState("");

  // handeling model
  const { isOpen, onOpen, onClose } = useDisclosure();

  //handeling images
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewingImg();
  const fileRef = useRef(null);

  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);

  // all functions
  const handleTextChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  // handling new post
  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          img: imgUrl,
        }),
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

      onClose();
      setPostText("");
      setImgUrl("");
    } catch (err) {
      toast({
        title: "Error",
        description: err,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={9}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg={"gray.dark"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here.."
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                fontSize={"xs"}
                fontWeight={"bold"}
                textAlign={"right"}
                m={"1"}
                color={"gray.800"}
              >
                {remainingChar}/500
              </Text>
              <Input
                type="file"
                hidden
                ref={fileRef}
                onChange={handleImageChange}
              />
              <BsFillImageFill
                onClick={() => fileRef.current.click()}
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                size={16}
              />
              {imgUrl && (
                <Flex mt={5} w={"full"} position={"relative"}>
                  <Image src={imgUrl} alt="Selected img" />
                  <CloseButton
                    onClick={() => setImgUrl("")}
                    bg={"gray.700"}
                    position={"absolute"}
                    top={2}
                    right={2}
                  />
                </Flex>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={"gray.dark"}
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
