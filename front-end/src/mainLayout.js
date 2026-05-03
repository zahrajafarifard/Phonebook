import * as React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import Main from "./components/main";
import Company from "./components/company";
import Post from "./components/post";
import { useDispatch } from "react-redux";
import { Logout } from "./store/action";
import { useNavigate } from "react-router-dom";

import User from "./components/user";
// import LogIn from "./components/logIn";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    navigate("/", { replace: true });
    return dispatch(Logout());
  };
  return (
    <React.Fragment>
      <div className="text-white font-bold mb-12 font-face-IRANSansWeb caret-transparent screen800:text-[12px] screen500:text-[9px] ">
        <header className=" flex flex-row-reverse  m-2 p-4 ">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-white"
            }
            to="/admin/company"
          >
            <div
              className={` text-center  my-2 px-3 screen500:px-1 border-l-2  border-[#ed1c24] border-dotted`}
            >
              تنظیمات شرکت
            </div>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-white"
            }
            to="/admin/post"
          >
            <div className=" text-center my-2 px-3 screen500:px-1 border-l-2 border-[#ed1c24] border-dotted ">
              تنظیمات سمت شغلی
            </div>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-white"
            }
            to="/admin/contacts"
          >
            <div className=" text-center  my-2 px-3 screen500:px-1 border-l-2 border-[#ed1c24] border-dotted ">
              اضافه کردن مخاطبین
            </div>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-white"
            }
            to="/admin/user"
          >
            <div className=" text-center my-2 px-3 screen500:px-1 border-l-2 border-[#ed1c24] border-dotted">
              تعریف کاربر
            </div>
          </NavLink>

          <NavLink to="/">
            <div
              onClick={logOutHandler}
              className="text-[#ed1c24]  text-center  my-2 px-3 screen500:px-1 "
            >
              خروج
            </div>
          </NavLink>
        </header>
      </div>

      <main className="opacity-80">
        <Routes>
          <Route exact path="/contacts" element={<Main />} />
          <Route path="/post" element={<Post />} />
          <Route path="/company" element={<Company />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </main>
      <footer className="font-face-IRANSansWeb" />
    </React.Fragment>
  );
}

export default App;
