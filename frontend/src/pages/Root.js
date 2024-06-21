import { Outlet } from "react-router-dom";
import MainNaviagation from "../components/MainNavigation.js";

const Root = () => {
//   const navigation = useNavigation();

  return (
    <>
      <MainNaviagation />
      {/* {navigation.state === "loading" && <p>loading...</p>} */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
