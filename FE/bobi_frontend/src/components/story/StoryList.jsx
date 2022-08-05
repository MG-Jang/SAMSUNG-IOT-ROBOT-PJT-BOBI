import React, { useEffect, useState } from "react";

function StoryList() {
  const [ stories, setStories ] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/stories")
      .then(res => {
        return res.json();
    })
      .then((data) => {
        console.log(data[0]);
        setStories(data);
    });
  }, []);

  return (
    <div>
      { stories.map(story => (
        <ul key={story.story_id}>
          <h4>{story.title}</h4>
          <p>{story.content}</p>
        </ul>
      ))}
    </div>
  )
};

export default StoryList;