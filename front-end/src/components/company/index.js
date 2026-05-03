import React, { useEffect, useState ,useRef } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";

import { submitFunction } from "../../shared/submit";
import { fetchFunction } from "../../shared/fetch";

import Office from "../../assets/image/office2.png";
const Company = () => {
  const [name, setName] = useState("");
  const [companyList, setCompanyList] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [idState, setIdState] = useState();
  
  let _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState(_token);
  
  const [add, setAdd] = useState(false);
  const inputElementRef = useRef();

  const addHandler = async () => {
    if (name === "") {
      alert("فیلد نام را وارد کنید");
      return;
    }

    if (!editMode) {
      const _body = JSON.stringify({
        name: name.trimStart(),
      });

      try {
        await submitFunction("/company/new-company", "POST", _body, token);
      } catch (error) {
        console.log(error);
      }

    setAdd(true);
    setName("");
    } else {
      try {
        const _body = JSON.stringify({
          name: name,
        });

        await submitFunction(
          `/company/update/${idState}`,
          "PATCH",
          _body,
          token
        );
      } catch (error) {
        console.log(error);
      }
      setEditMode(false);
    setAdd(true);
    setName("");
    }
  };

  const editHandler = async (id) => {
    let response;
    inputElementRef.current.focus();
    try {
      response = await fetchFunction(`/company/fetchForUpdate/${id}`, token);
    } catch (error) {
      console.log(error);
    }
    setEditMode(true);
    setIdState(response.id);
    setName(response.name);
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
    setEditMode(false);
    setName("");
    let response;
    try {
      const _body = JSON.stringify({
        id,
      });
      response = await submitFunction(
        "/company/delete",
        "DELETE",
        _body,
        token
      );
    } catch (error) {
      console.log(error);
    }

    if (response !== undefined) {
      const _companyLists = companyList.filter((Element) => Element.id !== id);
      setCompanyList(_companyLists);
    }
  };

  const searchHandler = async (event) => {
    setName(event.target.value);
    setAdd(false)
    let res;
    const _body = JSON.stringify({
      search: event.target.value,
    });
    try {
      res = await submitFunction("/company/search", "POST", _body, token);
    } catch (error) {
      console.log(error);
    }
    // console.log("ssssss", res);
    setCompanyList(res);
  };

  useEffect(() => {
    const func = async () => {
      const res = await fetchFunction("/company", token);
      // console.log("uuu", res);
      setCompanyList(res);
    };
    func();
  }, [setCompanyList, token, add]);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        addHandler();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [name]);

  return (
    <div className="container mx-auto font-face-IRANSansWeb caret-transparent ">
      <div className="text-center ">
        <div>
          <input
           ref={inputElementRef}
            type="text"
            name="name"
            dir="rtl"
            className="border-2 my-4  bg-white text-[#ed1c24] caret-black rounded-lg px-1 py-1 screen500:text-[11px]
             placeholder-black border-[#ed1c24] focus:outline-none focus:placeholder-white"
            onChange={(e) => searchHandler(e)}
            value={name}
            placeholder="نام شرکت"
          />
        </div>

        <button
          type="button"
          // onKeyPress={(e) =>enterHandler(e)}
          // onKeyDown={(e) =>enterHandler(e)}
          className="border-2  bg-[#ed1c24] text-white font-bold border-[#ed1c24] py-1 px-4 my-2 mb-10 rounded-lg screen500:text-[11px] screen500:pt-[6px]"
          onClick={addHandler}
        >
          {editMode ? "ویرایش" : "اضافه"}
        </button>
      </div>

      <div className="text-center caret-transparent">
        {companyList &&
          companyList.map((Element) => (
            <div
              style={{ direction: "rtl" }}
              key={Element.id}
              className="grid grid-cols-4 my-4 border-2 mx-auto screen500:text-[12px] border-[#ed1c24] text-white font-bold rounded-md py-1"
            >
              <div className="mx-auto">
                <img
                  src={Office}
                  className="w-11 screen500:w-10"
                  alt="company"
                />
              </div>
              <div className="pt-2">{Element.name}</div>
              <div
                className="cursor-pointer pt-2"
                onClick={() => editHandler(Element.id)}
              >
                ویرایش
              </div>
              <div
                className="cursor-pointer text-[#ed1c24] font-bold pt-2"
                onClick={() => confirmDeleteHandler(Element.id)}
              >
                حذف
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Company;
