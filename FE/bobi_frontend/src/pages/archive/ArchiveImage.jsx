import React, { useEffect, useState } from "react";
import ArchiveImageItem from "../../components/archive/ArchiveImageItem";

function ArchiveImage() {
  const [imageArchives, setImageArchives] = useState([]);
  useEffect(() => {
    fetch("https://i7a208.p.ssafy.io/api/v1/archiveimages/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setImageArchives(data);
      });
  });
  // console.log(imageArchives)

  return (
    <div>
      <br />
      <br />
      <h1
        style={{
          textDecoration: "underline",
          textDecorationColor: "#a6eae2",
          textDecorationThickness: 5,
        }}
      >
        사진 아카이브
      </h1>
      <br />
      {imageArchives.map((imageArchive) => (
        <ArchiveImageItem key={imageArchive.id} item={imageArchive} />
      ))}
    </div>
  );
}

export default ArchiveImage;
