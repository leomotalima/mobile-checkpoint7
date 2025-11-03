import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Tabs from "./Tabs";
import Auth from "./Auth";

const Index = () => {
  const { user } = useContext(AuthContext);
  return user ? <Tabs /> : <Auth />;
};

export default Index;
