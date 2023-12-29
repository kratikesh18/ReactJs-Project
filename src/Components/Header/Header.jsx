import React, {useState} from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header>
      <Container className="flex justify-center">
        <nav className="flex shadow-xl shadow-black/20 bg-white rounded-md w-[95%] text-black p-[1rem] justify-between items-center">
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="">
            <ul className=" flex gap-[1rem] text-xl">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                     className="px-6 py-2 duration-200 hover:bg-gray-200  rounded-full" onClick={() => navigate(item.slug)}>
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="flex bg-red-700 text-white justify-between items-center">
                  <LogoutBtn  />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
