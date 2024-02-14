import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { authLoginUser, authLogoutUser } from "../../Appwrite/AppwriteAuth";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/Slices/AuthSlice";


function Navbar() {
  const authStatus = useSelector((state) => state.AuthSlice.status);

  console.log("printing authStratus  ", authStatus);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    authLogoutUser().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "SignUp", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header>
      <nav className=" flex justify-between  w-[99%] lg:w-[88%] mx-auto mt-4 p-3 px-4 border-2 border-black/40 shadow-lg items-center rounded-lg">
        <div>
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        <div>
          <ul className="text-black flex gap-3 justify-center items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="font-semibold text-lg"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <button className="font-semibold text-lg" onClick={handleLogout}>logout</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
