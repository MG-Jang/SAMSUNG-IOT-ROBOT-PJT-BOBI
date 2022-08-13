import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ArchiveVideoItem from "../../components/archive/ArchiveVideoItem";

function ArchiveVideo() {
  const [ videoArchives, setVideoArchives ] = useState([]);
  useEffect(() => {
    fetch("https://i7a208.p.ssafy.io/api/v1/archivevideos/")
      .then(res => {
        return res.json();
      })
      .then((data) => {
        setVideoArchives(data);
      })
    }, []);
    // console.log(videoArchives);

  return (
    <div>
      <br />
      <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>영상 아카이브</h1>
      <br />
      <NavLink to="/archiveVideo/write"><button style={{margin: "0 20% 0 60%"}} >영상 올리기</button></NavLink>
      <br />
      <br />
      {videoArchives.map(videoArchive => (
        <ArchiveVideoItem key={videoArchive.id} item={videoArchive} />
      ))}
    </div>
  )
};

export default ArchiveVideo;