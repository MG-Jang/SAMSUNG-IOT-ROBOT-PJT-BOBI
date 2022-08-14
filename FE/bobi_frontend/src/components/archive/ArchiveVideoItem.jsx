import React from "react";
import { NavLink } from "react-router-dom";

function ArchiveVideoItem({item}) {
  
  return (
    <div>
      <iframe title="VideoItem" src={item.video_url} width="560" height="315" frameBorder="0"/>
      <br />
      <br />
      <NavLink to={`/archiveVideo/${item.id}`} style={{textDecoration: "none", color: "#000000"}}>
        <h2>{item.title}</h2>
      </NavLink>
      {/* <p>{item.contents}</p> */}
      <br />
    </div>
  )
};

export default ArchiveVideoItem;
