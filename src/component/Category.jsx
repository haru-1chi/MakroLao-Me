import React from "react";

function category({ data }) {
  return (
    <div className="block">
      <img
        src={data.imgURL}
        alt=""
        className="border-circle "
        width={60}
        height={60}
      />
      <div className="category-title">{data.title}</div>
    </div>
  );
}

export default category;
