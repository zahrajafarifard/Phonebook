import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import List from "./list-detailes";
import { Logout } from "../../store/action";
import { submitFunction } from "../../shared/submit";
import { fetchFunction } from "../../shared/fetch";

const Main = () => {
  const [phoneBook, setPhoneBook] = useState([]);
  const [search, setSearch] = useState("");

  let _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState(_token);

  const [orderField, setOrderField] = useState("name");
  const [order, setOrder] = useState("ASC");

  let _addContact = useSelector((state) => state.reducer.addContact);
  // const [addContact, setAddContact] = useState(_addContact);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token]);

  const logOutHandler = async (e) => {
    e.preventDefault();
    return dispatch(Logout());
  };
  const addContactHandler = async (e) => {
    e.preventDefault();
    navigate("/add-contact");
  };

  useEffect(() => {
    let res;
    const func = async () => {
      // res = await fetchFunction(`/member/getContacts`, token);    /////for related post
      res = await fetchFunction("/member", token);
      setPhoneBook(res);
    };
    func();
    console.log(res);
    // }
  }, [token]);

  const searchHandler = async (event) => {
    setSearch(event.target.value);

    let res;
    try {
      const _body = JSON.stringify({
        search: event.target.value,
      });

      res = await submitFunction(`/user/search`, "POST", _body, token);
    } catch (error) {
      console.log(error);
    }

    setPhoneBook(res);
  };

  const orderHandler = async (event) => {
    setOrder(event);
    let res;
    try {
      const _body = JSON.stringify({
        order: event,
        orderField: orderField,
      });

      res = await submitFunction(`/user/order`, "POST", _body, token);
    } catch (error) {
      console.log(error);
    }
    setPhoneBook(res);
  };

  const fieldHandler = async (event) => {
    setOrderField(event);
    let res;
    try {
      const _body = JSON.stringify({
        order: order,
        orderField: event,
      });

      res = await submitFunction(`/user/order`, "POST", _body, token);
    } catch (error) {
      console.log(error);
    }
    setPhoneBook(res);
  };

  return (
    <div className="container mx-auto my-12 font-face-IRANSansWeb caret-transparent screen800:text-[12px] screen500:text-[10px] ">
      <div className="">
        <div className="App text-center">
          <div className="text-left">
            <div className="relative ">
              <div className="flex absolute inset-y-0 left-0  items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-[#ed1c24]"
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
                className="w-52 p-2 text-sm text-[#ed1c24] bg-white rounded-2xl border-2 border-[#ed1c24] text-right
                 outline-none screen500:text-[10px] screen800:text-[10px]
             focus:ring-[#ed1c24] focus:border-[#ed1c24] placeholder-black focus:placeholder-white screen500:w-32 screen500:py-1 caret-black
              "
                placeholder="جستجو"
                value={search}
                // onChange={(event) => {
                //   setSearch(event.target.value);
                // }}
                onChange={(e) => searchHandler(e)}
              />
              <br />

              {_addContact && (
                <div
                  className="float-right py-1 px-3 font-bold bg-[#ed1c24] border-2 border-[#ed1c24] text-white pb-1 screen500:my-2
                rounded-lg cursor-pointer "
                >
                  <button onClick={addContactHandler}>افزودن مخاطب جدید</button>
                </div>
              )}

             

              <div className="float-right flex flex-row-reverse ">
                <div className="mx-3">
                  <select
                    className="border-2 px-2 rounded-md py-1 font-bold   text-[#ed1c24] screen500:my-2
              border-[#ed1c24] screen500:text-[9px]  bg-white focus:outline-none "
                    name="orderField"
                    onChange={(e) => fieldHandler(e.target.value)}
                  >
                    <option value="name">نام</option>
                    {/* <option value="mobile">موبایل</option> */}
                    <option value="Company">شرکت</option>
                    <option value="Post">سِمت</option>
                  </select>
                </div>
                <div>
                  <select
                    name="order"
                    onChange={(e) => orderHandler(e.target.value)}
                    className="border-2 px-2 rounded-md py-1 font-bold   text-[#ed1c24] screen500:my-2
              border-[#ed1c24] screen500:text-[9px]  bg-white focus:outline-none"
                  >
                    <option value="ASC">صعودی</option>
                    <option value="DESC">نزولی</option>
                  </select>
                </div>
              </div>

              <div
                className="float-right py-1 px-3 font-bold bg-[#ed1c24] border-2 border-[#ed1c24] text-white pb-1  screen500:my-2
              rounded-lg cursor-pointer mr-3"
              >
                <button onClick={logOutHandler}>خروج</button>
              </div>

            </div>
          </div>

          <div
            style={{ direction: "rtl" }}
            className="grid  grid-cols-7 screen400:grid-cols-5 my-4 font-bold mx-auto mb-12 screen500:mb-8  bg-[#ed1c24] text-white rounded-lg py-2 mt-16"
          >
            <div className="screen400:hidden">{}</div>
            <div>نام </div>
            <div>موبایل</div>
            <div>شرکت</div>
            <div>سِمت</div>

            <div className="col-start-6 col-span-2 screen400:col-span-1">
              آدرس
            </div>
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
                  search={search}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
