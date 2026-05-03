import React, { Fragment, useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import closeBtn from "./assets/image/close.svg";
import MainLayout from "./mainLayout";
import LoginLayout from "./loginLayout";
import { Logout } from "./store/action";

function App() {
  const [confirmBoxMsg, setConfirmBoxMsg] = useState("");

  const _isAdmin = useSelector((state) => state.reducer.isAdmin);
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth) {
      navigate(-1);
      dispatch(Logout());
    }
  }, [auth]);

  useEffect(() => {
    setTimeout(() => {
      if (confirmBoxMsg) {
        setConfirmBoxMsg("");
      }
    }, 3000);
  }, [confirmBoxMsg]);

  const confirmHandler = () => {
    setConfirmBoxMsg("");
  };

  const constantMock = window.fetch;
  window.fetch = function () {
    let response;

    return new Promise((resolve, reject) => {
      constantMock
        .apply(this, arguments)
        .then((response) => {
          if (response.status === 403) {
            setConfirmBoxMsg("موبایل یا کلمه ی عبور صحیح نیست");
            navigate("/", { replace: true });
          }
          if (response.status === 401) {
            setAuth(true);
          }

          return resolve(response);
        })
        .catch((error) => {
          reject(response);
        });
    });
  };

  return (
    <Fragment>
      {confirmBoxMsg && (
        <div
          className={` font-face-IRANSansWeb w-[260px]  fixed top-8 left-10 bg-[#ed1c24] rounded-2xl text-white
        `}
        >
          <div
            style={{ direction: "rtl" }}
            className="text-right p-5 font-bold text-[14px] caret-transparent mb-2 "
          >
            {confirmBoxMsg}
          </div>
          <span
            onClick={confirmHandler}
            className="absolute  ml-4 bottom-1 font-bold cursor-pointer text-[16px]"
          >
            <img src={closeBtn} width={13} className="mb-1" alt="close" />
          </span>
        </div>
      )}

      <Routes>
        <Route
          path="/*"
          element={<LoginLayout render={(props) => ({ ...props })} />}
        />
        {_isAdmin && (
          <Route
            exact
            path="/admin/*"
            element={<MainLayout render={(props) => ({ ...props })} />}
          />
        )}
      </Routes>
    </Fragment>
  );
}

export default App;
