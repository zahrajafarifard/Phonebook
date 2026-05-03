import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserList from "../user-list";
import AdminList from "../main";
import { login } from "../../store/action";
import Telmis from "../../assets/image/telmis.svg";

const LogIn = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState();

  const _isAdmin = useSelector((state) => state.reducer.isAdmin);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAdmin(_isAdmin);
    setToken(_token);
  }, [token, setToken, _token, isAdmin]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(mobile.trim(), password.trim()));
    setMobile("");
    setPassword("");
  };
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        loginHandler(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [mobile, password, loginHandler]);

  if (token) {
    if (isAdmin) {
      navigate("/admin");
      return <AdminList />;
    } else {
      return <UserList />;
    }
  }
  return (
    <div className="font-face-IRANSansWeb  mx-auto  pt-10  bg-black">
      <div className="screen700:flex flex-col w-[1000px] mx-auto caret-transparent screen1100:w-[800px] screen800:w-[700px] screen700:w-full ">
        <div className="float-right mb-10 bg-white p-[2px] rounded-md screen700:w-[150px] screen700:mr-10 screen500:mx-auto">
          <img src={Telmis} width={200} className="" />
        </div>

        <div className=" screen700:flex  hidden  mx-auto text-[#ec1b31]">
          دفترچه تلفن شرکت داده پردازان تلمیس
        </div>

        <div className="flex flex-row  justify-between  mt-12 clear-both px-8 screen1100:px-1 w-full screen700:justify-center screen500:mt-2 ">
          <form
            className="bg-gradient-to-t from-[#b01117] via-red-600 to-[#ec1b31] mt-8 rounded-xl py-8  w-[350px]
            text-center  text-[15px]   place-items-center font-bold
            screen700:w-[290px] screen400:w-[270px]
            "
          >
            <br />
            <input
              style={{ direction: "rtl" }}
              className="my-4 w-[80%] bg-white text-[#ed1c24] rounded-xl px-2 py-2 border-[#ed1c24]0 placeholder-gray-500
             focus:outline-none focus:placeholder-white "
              type="text"
              name="mobile"
              placeholder="موبایل"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
            <br />

            <input
              style={{ direction: "rtl" }}
              className="my-4 w-[80%] bg-white text-[#ed1c24] rounded-xl px-2 py-2 placeholder-gray-500
             focus:outline-none focus:placeholder-white"
              type="password"
              name="password"
              placeholder="کلمه عبور"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <div style={{ textAlign: "center", margin: "7px 0 " }}>
              <button
                onClick={loginHandler}
                className=" rounded-xl px-10 text-center  pb-2 py-1 bg-white mt-36 font-extrabold  text-[#ed1c24] hover:cursor-pointer
                screen430:px-6 screen430:text-[13px]
                screen430:mb-28 screen700:mt-28 
                "
              >
                ورود
              </button>

              <br />
            </div>
            <small style={{ direction: "rtl" }} className="text-red-900 ">
              01/9/19 - نسخه 1.0.2
            </small>
          </form>

          <div
            style={{ direction: "rtl" }}
            className=" pl-12 mt-8 text-justify font-extrabold w-[500px]
              text-[#ed1c24] leading-tight text-lg
              screen700:hidden
              "
          >
            کاربر گرامی :
            <br />
            <span className="text-sm">
              برای دسترسی به دفترچه تلفن شرکت داده پردازان تلمیس نام کاربری و
              کلمه ی عبور خود را وارد کنید .
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
