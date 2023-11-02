import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const usePreviewingImg = () => {
  let [imgUrl, setImgUrl] = useState(null);
  const toast = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        status: "error",
      });
      setImgUrl(null);
    }
  };
  // console.log(imgUrl);
  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewingImg;
