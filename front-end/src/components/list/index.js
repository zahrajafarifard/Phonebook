import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";

import { submitFunction } from "../../shared/submit";
import { fetchFunction } from "../../shared/fetch";
import Icon from "../../assets/image/1.png";

const List = ({
  name,
  mobile,
  company,
  post,
  address,
  id,
  IdFuncHandler,
  setEditMode,
  filteredDeletedRow,
  search,
  setShowForm,
}) => {
  let _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState(_token);

  const editHandler = async (id) => {
    let res;
    await setShowForm(true);

    try {
      res = await fetchFunction(`/member/fetchForUpdate/${id}`, token);
    } catch (error) {
      console.log(error);
    }
    await setEditMode(true);
    await IdFuncHandler(
      res.id,
      res.name,
      res.mobile,
      res.address,
      res.CompanyId,
      res.PostId
    );
  };

  const confirmDeleteHandler = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="w-[310px] border-2 font-face-IRANSansWeb border-red-500 bg-black p-4 rounded-lg absolute top-16 right-[38%] text-sm font-bold ">
            <h1 className="text-red-400 ">{}</h1>
            <p className="text-white text-right py-3 "> حذف شود ؟ </p>

            <button
              onClick={() => {
                onClose();
              }}
              className="bg-white text-red-500 rounded-md p-2 mx-2 mt-4 w-14 text-sm"
            >
              خیر
            </button>
            <button
              onClick={() => {
                deleteHandler(id);
                onClose();
              }}
              className="bg-red-500 text-white rounded-md p-2 mx-2 mt-4 w-14  text-sm"
            >
              بله
            </button>
          </div>
        );
      },
    });
  };

  const deleteHandler = async (id) => {
    const _body = JSON.stringify({
      id: id,
    });
    await submitFunction("/member/delete", "DELETE", _body, token);
    filteredDeletedRow(id);
  };

  return (
    <div
      style={{ direction: "rtl" }}
      className={`font-face-IRANSansWeb  grid  grid-cols-9 border-2 my-4 mx-auto font-bold border-[#ed1c24] text-white rounded-lg py-2 
        caret-transparent screen800:text-[14px] screen700:text-[12px] screen500:grid-cols-8 screen500:text-[8px]
        ${
          ((mobile.includes(search) && search !== "") ||
            (name.includes(search) && search !== "") ||
            (company.includes(search) && search !== "") ||
            (address.includes(search) && search !== "") ||
            (post.includes(search) && search !== "")) &&
          "bg-white text-black "
        }
      `}
    >
      <div className="mx-auto screen500:hidden">
        <img src={Icon} className="w-9 " />
      </div>
      <div className="pt-2">{name}</div>
      <div className="pt-2">{mobile}</div>
      <div className="pt-2">{company}</div>
      <div className="pt-2">{post}</div>
      <div className="pt-2 col-start-6 col-span-2 screen500:col-span-2 screen700:text-[9px] screen400:text-[6px]">
        {address}
      </div>

      <div
        className="cursor-pointer font-bold  pt-2 screen700:text-[9px] screen400:text-[6px]"
        onClick={() => editHandler(id)}
      >
        ویرایش
      </div>
      <div
        className="cursor-pointer font-bold pt-2 text-[#ed1c24] screen700:text-[9px] screen400:text-[6px]"
        onClick={() => confirmDeleteHandler(id)}
      >
        حذف
      </div>
    </div>
  );
};

export default List;
