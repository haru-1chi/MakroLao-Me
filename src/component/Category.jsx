import React from "react";

function category({ data }) {
  return (
    <div className="block">
      <img
        src={data.imgURL}
        alt=""
        className="border-circle "
        width={80}
        height={80}
      />
      <p>{data.title}</p>
    </div>
  );
}

export default category;
