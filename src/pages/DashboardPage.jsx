import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      setRole("admin");
    } else {
      setRole("user");
    }
  }, []);

  const clickBook = () => {
    navigate("/book");
  };

  const clickList = () => {
    navigate("/list");
  };

  return (
    <>
      <div className="container mx-auto sm:px-6 lg:px-8">
        {/* heading */}
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="min-w-0 flex-1">
            <h2 className="m-3 mt-5 mb-0 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Booking Room Menu
            </h2>
          </div>
        </div>
        {/* heading */}
        {/* menu */}
        <div className="bg-white py-8 sm:py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="-mx-6 grid grid-cols-2 gap-4 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-2">
              <div
                className="bg-gray-400/5 p-8 sm:p-10 hover:bg-gray-800/5 col-span-full sm:col-span-1 cursor-pointer transition ease-in-out delay-150 hover:-translate-x-2 hover:scale-105 duration-300"
                onClick={clickBook}
              >
                <img
                  className="max-h-12 w-full object-contain"
                  src="https://cdn-icons-png.flaticon.com/512/55/55281.png"
                  alt="Transistor"  
                  width={158}
                  height={48}
                />
                <h3 className="text-center mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  Booking Room
                </h3>
              </div>
              <div
                className="bg-gray-400/5 p-6 sm:p-10 hover:bg-gray-800/5 col-span-full sm:col-span-1 cursor-pointer transition ease-in-out delay-150 hover:translate-x-2 hover:scale-105 duration-300"
                onClick={clickList}
              >
                <img
                  className="max-h-12 w-full object-contain"
                  src="https://www.pngkey.com/png/full/299-2992939_list-logo-vector-png.png"
                  alt="Transistor"
                  width={158}
                  height={48}
                />
                <h3 className="text-center mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  {role === "admin" ? <>List Bookings</> : <>My Bookings</>}
                </h3>
              </div>
              <div
                className="bg-gray-400/5 p-6 sm:p-10 col-span-full hover:bg-gray-800/5 cursor-pointer transition ease-in-out delay-150 hover:scale-105 duration-300"
              >
                <img
                  className="max-h-12 w-full object-contain"
                  src="https://www.clipartmax.com/png/middle/94-945959_printer-7-icons-print-icon-vector-png.png"
                  alt="Transistor"
                  width={158}
                  height={48}
                />
                <h3 className="text-center mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  Print Booking Letter
                </h3>
              </div>
            </div>
          </div>
        </div>
        {/* menu */}
      </div>
    </>
  );
};
