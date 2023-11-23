import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./Pages/UserPage";
import PostPage from "./Pages/PostPage";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtoms";
import UpdateProfilePage from "./Pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./Pages/ChatPage";

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Box
      position={"relative"}
      w={"full"}
    >
      <Container borderRadius={5} maxW={"620px"} p={2} px={5} mt={2}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/update"
            element={user ? <UpdateProfilePage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/:username"
            element={user ? <UserPage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/:username/post/:pid"
            element={user ? <PostPage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to={"/auth"} />}
          />
        </Routes>

        {user && <CreatePost />}
      </Container>
    </Box>
  );
}

export default App;
