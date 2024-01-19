import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";

import LogoCampus from "../assets/logoCampus.png"
import AvatarUser from "../assets/avatar.svg"

export const Navbar = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("")

  // variables
  const navigate = useNavigate()

  // function
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("id_kampus");
    localStorage.removeItem("name");

    navigate("/login")
  }

  // use effect
  useEffect(() => {
    setUsername(localStorage.getItem("name"));
    setRole(localStorage.getItem("role"))
  }, []);

  return (
    <Disclosure as="nav" className="bg-gray-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <NavLink to={"/"}>
                    <img
                      className="h-12 w-auto cursor-pointer"
                      src={LogoCampus}
                      alt="Campus Banner"
                    />
                  </NavLink>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <NavLink
                      to="/"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                            ? "rounded-md bg-gray-500 px-3 py-2 text-sm font-medium text-white"
                            : "px-3 py-2 text-sm font-medium text-white"
                      }
                    >
                      Dashboard
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center">
                  <Menu as="div" className="relative ml-3">
                    <div className="flex items-center gap-2">
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={AvatarUser}
                          alt=""
                        />
                      </Menu.Button>
                      <div>
                        <p className="text-xs font-medium text-white">{username}</p>
                        <p className="text-xs font-medium text-gray-400">{role}</p>
                      </div>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={`block px-4 py-2 text-sm text-gray-700 ${active && "bg-gray-100"}`}
                              onClick={() => handleLogout()}
                            >
                              Sign out
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <NavLink to={"/"}>
                <Disclosure.Button
                  as="div"
                  className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                >
                  Dashboard
                </Disclosure.Button>
              </NavLink>
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={AvatarUser}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {username}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {role}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Disclosure.Button
                  onClick={() => handleLogout()}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
