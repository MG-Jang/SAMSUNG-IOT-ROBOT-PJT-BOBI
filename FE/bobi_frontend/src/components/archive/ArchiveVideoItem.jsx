import React from "react";
import { NavLink } from "react-router-dom";

function ArchiveVideoItem({item}) {
  
  return (
    <div>
      <iframe title="VideoItem" src={item.video_url} width="60%" frameBorder="0" style={{marginBottom: "3%"}}/>
      <h2>
        <NavLink to={`/archive-video/${item.id}`} style={{textDecoration: "none", color: "#000000"}}>{item.title}</NavLink>
      </h2>
      {/* <p>{item.contents}</p> */}
      <br />
    </div>
  )
};

export default ArchiveVideoItem;
