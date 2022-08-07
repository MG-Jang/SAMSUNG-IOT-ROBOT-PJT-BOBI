import React from "react";
import StoryList from "../components/story/StoryList";
import ModalsProvider from "../components/modal/ModalsProvider";

function Story() {
  return (
    <div>
      <ModalsProvider>
        <StoryList />
      </ModalsProvider>
    </div>
  )
};

export default Story;