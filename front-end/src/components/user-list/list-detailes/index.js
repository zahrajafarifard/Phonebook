import React from "react";
import Position from "../../../assets/image/1.png";

const List = ({ name, mobile, company, post, search, address }) => {
  return (
    <div
      style={{ direction: "rtl" }}
      className={`font-face-IRANSansWeb  grid  grid-cols-7 screen400:grid-cols-5 border-2 my-4  mx-auto font-bold border-[#ed1c24] text-white rounded-lg py-2 
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
      <div className="mx-auto screen400:hidden">
        <img src={Position} className="w-9 " />
      </div>
      <div className="pt-2">{name}</div>
      <div className="pt-2">{mobile}</div>
      <div className="pt-2">{company}</div>
      <div className="pt-2">{post}</div>
      <div className="pt-2 col-start-6 col-span-2 screen400:col-span-1 screen400:text-[9px]">{address}</div>
    </div>
  );
};

export default List;
