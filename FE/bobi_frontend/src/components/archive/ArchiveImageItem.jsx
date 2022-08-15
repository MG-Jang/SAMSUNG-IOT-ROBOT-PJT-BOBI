import React from "react";
import { NavLink } from "react-router-dom";

function ArchiveImageItem({item}) {
  
  return (
    <div>
      <img src={item.img_url} alt="archiveImage" width="60%" style={{marginBottom: "3%"}}/>
      <h2>
        <NavLink to={`/archive-image/${item.id}`} style={{textDecoration: "none", color: "#000000"}}>
          {item.title}
        </NavLink>
      </h2>
      {/* <p>{item.contents}</p> */}
      <br />
    </div>
  )
};

export default ArchiveImageItem;
