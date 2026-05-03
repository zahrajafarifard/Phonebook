import React, { useEffect, useState } from "react";

import { submitFunction } from "../../shared/submit";
import { fetchFunction } from "../../shared/fetch";

import { useSelector } from "react-redux";

import List from "../list";

const Main = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [post, setPost] = useState("");
  const [postList, setPostList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [phoneBook, setPhoneBook] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [idState, setIdState] = useState();
  const [search, setSearch] = useState("");

  let _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState(_token);

  useEffect(() => {}, [phoneBook, phoneBook.length]);

  const searchHandler = async (event) => {
    setSearch(event.target.value);

    let res;
    const _body = JSON.stringify({
      search: event.target.value,
    });
    try {
      res = await submitFunction("/member/search", "POST", _body, token);
    } catch (error) {
      console.log(error);
    }
    // setSearch(event.target.value);
    return setPhoneBook(res);
  };

  useEffect(() => {
    let res;
    const func = async () => {
      res = await fetchFunction("/member", token);

      setPhoneBook(res);
    };
    func();
  }, [name]);

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
    if (!editMode) {
      try {
        const _body = JSON.stringify({
          companyName: company,
          name: name.trim(),
          post: post,
          mobile: mobile.trim(),
          address: address.trim(),
        });

        await submitFunction("/member/new-member", "POST", _body, token);
      } catch (error) {
        console.log(error);
      }
      setName("");
      setMobile("");
      setAddress("");
      setCompany("");
      setPost("");
    } else {
      try {
        const _body = JSON.stringify({
          companyName: company,
          name: name,
          post: post,
          mobile: mobile,
          address: address,
        });
        await submitFunction(
          `/member/update/${idState}`,
          "PATCH",
          _body,
          token
        );
      } catch (error) {
        console.log(error);
      }

      setEditMode(false);
      setName("");
      setMobile("");
      setAddress("");
      setCompany("");
      setPost("");
    }
  };

  const toggleShowForm = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  const IdFuncHandler = (id, name, mobile, address, companyId, postId) => {
    setIdState(id);
    setName(name);
    setMobile(mobile);
    setAddress(address);
    setCompany(companyId);
    setPost(postId);
  };
  const filteredDeletedRow = (id) => {
    const deletedRow = phoneBook.filter((e) => e.id !== id);
    setPhoneBook(deletedRow);
    setName(" ");
    setMobile(" ");
    setAddress(" ");
  };

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
  }, [name, mobile, company, post]);

  let form = "";
  if (showForm) {
    form = (
      <div className="container font-face-IRANSansWeb  ">
        <form className="">
          <div className="m-2">
            <select
              className="border-2 px-2 rounded-md py-1  text-[#ed1c24]   border-[#ed1c24] bg-white font-bold focus:outline-none screen500:text-[9px] "
              name="company"
              id="company"
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
          <div className="m-2">
            <input
              type="text"
              name="name"
              dir="rtl"
              className="border-2 px-2 rounded-md py-1  text-black   border-[#ed1c24] bg-white placeholder-black screen500:text-[9px]
               focus:outline-none focus:placeholder-white"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="نام و نام خانوادگی"
            />
          </div>
          <div className="m-2">
            <input
              type="text"
              name="mobile"
              className="border-2 px-2 rounded-md py-1  text-black  border-[#ed1c24] bg-white screen500:text-[9px]
               placeholder-black focus:outline-none focus:placeholder-white"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              placeholder="موبایل"
            />
          </div>

          <div className="m-2">
            <textarea
              name="address"
              rows="2"
              cols="30"
              dir="rtl"
              className="border-2 px-2 rounded-md py-1  text-black  border-[#ed1c24] bg-white screen500:text-[8px]
               placeholder-black focus:outline-none focus:placeholder-white"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="آدرس ..."
            />
          </div>

          <div className="m-2 mb-4">
            <select
              className="border-2 px-2 rounded-md py-1 font-bold   text-[#ed1c24]  border-[#ed1c24] screen500:text-[9px]  bg-white focus:outline-none "
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
            className="  w-20 px-2 rounded-md py-1 font-bold border-2  bg-[#ed1c24]  border-[#ed1c24] text-white screen500:text-[10px]  "
            onClick={addContact}
          >
            {editMode ? "ویرایش" : "اضافه "}
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className="container mx-auto font-face-IRANSansWeb ">
      <div className="">
        <div className="App text-center">
          <span
            style={{
              cursor: "pointer",
              textDecoration: "none",
              padding: "8px",
              caretColor: "transparent",
            }}
            className={`bg-[#ed1c24]  text-white rounded-md font-extrabold screen500:text-[8px] ${
              showForm && "text-black"
            } `}
            onClick={(e) => toggleShowForm(e)}
          >
            ایجاد مخاطب جدید
          </span>

          <div className="m-10">{form}</div>

          <div className="relative text-left  caret-transparent">
            <div className="flex absolute inset-y-0 left-0  items-center pl-3 pointer-events-none ">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-[#ed1c24] dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              name="search"
              className="w-52 p-2 text-sm text-[#ed1c24] bg-white rounded-2xl border-2 border-[#ed1c24] text-right caret-black
               screen500:text-[9px] screen500:w-40 screen500:px-2 screen500:py-1
             focus:ring-red-500 focus:border-[#ed1c24] placeholder-black screen600:w-40 focus:outline-none focus:placeholder-white
              "
              placeholder="جستجو"
              value={search}
              onChange={(e) => searchHandler(e)}
            />
          </div>
          <div className="">
            {phoneBook &&
              phoneBook.map((contact) => (
                <List
                  key={contact.id}
                  id={contact.id}
                  name={contact.name}
                  mobile={contact.mobile}
                  address={contact.address}
                  company={contact.Company.name}
                  post={contact.Post.name}
                  IdFuncHandler={IdFuncHandler}
                  setEditMode={setEditMode}
                  filteredDeletedRow={filteredDeletedRow}
                  search={search}
                  setShowForm={setShowForm}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
