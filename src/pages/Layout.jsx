import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Layout = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col col-12">
            <Navbar />
          </div>
          <div className="col col-12">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
