import { useRecoilValue } from "recoil";
import SignupCard from "./SignUpCard";
import LoginPage from "./loginPage";
import authScreenAtom from "../atoms/authAtoms.js";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  return (
    <div>{authScreenState === "login" ? <LoginPage /> : <SignupCard />}</div>
  );
};

export default AuthPage;
