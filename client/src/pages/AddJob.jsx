import React, { useState, useRef, useEffect } from "react";
import Quill from "quill";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Tunis");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  // USING A TEXT EDITOR

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    // Initiate quill only once
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form action="">
      <div>
        <p>Job Title</p>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>
      <div>
        <p>Job description</p>
        <div ref={editorRef}></div>
      </div>
    </form>
  );
};

export default AddJob;
