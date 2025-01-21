import React, { useState } from "react";
import { assets } from "../assets/assets";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setisTextDataSubmited] = useState(false);

  return (
    <div>
      <form action="">
        <h1> Recruiter {state}</h1>
        <p>Welcome back ! please qign in to continue</p>
        <>
          <div>
            <img src={assets.person_icon} alt="" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Company Name"
              required
            />
          </div>
          <div>
            <img src={assets.email_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Id"
              required
            />
          </div>
          <div>
            <img src={assets.person_icon} alt="" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Company Name"
              required
            />
          </div>
        </>
      </form>
    </div>
  );
};

export default RecruiterLogin;
