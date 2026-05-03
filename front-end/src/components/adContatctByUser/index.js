import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { submitFunction } from "../../shared/submit";
import { fetchFunction } from "../../shared/fetch";
import { Logout } from "../../store/action";

const AddNewContact = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [post, setPost] = useState("");
  const [postList, setPostList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  let _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState(_token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const logOutHandler = async (e) => {
    // e.preventDefault()
    setToken("");
    return dispatch(Logout());
  };

  const addContact = async () => {
    if (
      name === "" ||
      mobile === "" ||
      post === "" ||
      company === "" ||
      address === ""
    ) {
      alert("وارد کردن مقادیر فیلدها الزامی است");
      return;
    }
    try {
      const _body = JSON.stringify({
        companyName: company,
        name: name,
        post: post,
        mobile: mobile,
        address: address,
      });
      await submitFunction("/member/new-member", "POST", _body, token);
    } catch (error) {
      console.log(error);
    }
    setName("");
    setMobile("");
    setAddress("");
    alert("مخاطب جدید اضافه شد ...");
  };

  useEffect(() => {
    // console.log(token);
    if (!token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    const func = async () => {
      const res = await fetchFunction("/post", token);
      setPostList(res);
    };
    func();
  }, [setPostList]);

  useEffect(() => {
    const func = async () => {
      const res = await fetchFunction("/company", token);
      setCompanyList(res);
    };
    func();
  }, [setCompanyList]);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        addContact();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [name, mobile, company, post, address]);

  let form = "";
  form = (
    <div className="container font-face-IRANSansWeb screen500:text-[12px]  ">
      <form className=" w-full mx-auto">
        <div className="m-2">
          <select
            className="border-2 px-2 rounded-md py-1  text-[#ed1c24]  border-[#ed1c24] bg-white font-bold focus:outline-none"
            name="company"
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value={0}>شرکت</option>
            {companyList.map((element) => {
              return (
                <option key={element.id} value={element.id}>
                  {element.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="m-2 ">
          <input
            type="text"
            name="name"
            dir="rtl"
            className="border-2 px-2 rounded-md py-1   text-black  border-[#ed1c24] bg-white
             placeholder-black focus:outline-none focus:placeholder-white"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="نام و نام خانوادگی"
          />
        </div>
        <div className="m-2">
          <input
            type="text"
            name="mobile"
            className="border-2 px-2 rounded-md py-1  text-black  border-[#ed1c24] bg-white placeholder-black focus:outline-none focus:placeholder-white"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            placeholder="موبایل"
          />
        </div>

        <div className="">
          <textarea
            name="address"
            rows="2"
            cols="30"
            dir="rtl"
            className="border-2 px-2 rounded-md py-1  text-black  border-[#ed1c24] bg-white placeholder-black screen500:text-[9px]
            focus:outline-none focus:placeholder-white"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="آدرس ..."
          />
        </div>

        <div className="m-2 mb-4">
          <select
            className="border-2 px-2 rounded-md py-1 font-bold   text-[#ed1c24]  border-[#ed1c24] bg-white focus:outline-none "
            name="post"
            onChange={(e) => setPost(e.target.value)}
          >
            <option value={0}>سمت</option>

            {postList.map((element) => {
              return (
                <option key={element.id} value={element.id}>
                  {element.name}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="button"
          className="  w-20 px-2 rounded-md py-1 font-bold border-2  bg-[#ed1c24]  border-[#ed1c24] text-white "
          onClick={addContact}
        >
          اضافه
        </button>
      </form>
    </div>
  );
  return (
    <div className="container mx-auto font-face-IRANSansWeb mt-10  screen500:text-[12px]">
      <div className="flex justify-end mb-20 screen500:justify-center">
        <div className="float-right py-1 w-18 text-center px-3 font-bold bg-[#ed1c24] border-2 border-[#ed1c24] text-white pb-1 rounded-lg cursor-pointer ">
          <button onClick={logOutHandler}>خروج</button>
        </div>
        <div className="float-right py-1 w-18 text-center px-3 font-bold bg-[#ed1c24] border-2 border-[#ed1c24] text-white pb-1 
        rounded-lg cursor-pointer ml-4">
          <button onClick={() => navigate(-1)}>بازگشت</button>
        </div>
      </div>

      <div className="">
        <div className="App text-center">
          <span
            style={{
              cursor: "pointer",
              textDecoration: "none",
              padding: "8px",
              caretColor: "transparent",
            }}
            className={`text-[#ed1c24]   rounded-md font-bold  `}
          >
            ** برای ایجاد مخاطب جدید فیلدهای مربوطه را پر کنید **
          </span>

          <div className="mt-24">{form}</div>
        </div>
      </div>
    </div>
  );
};

export default AddNewContact;
