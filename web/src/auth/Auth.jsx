import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import jwt from "jsonwebtoken";
const Auth = ({ children, accessList }) => {
  const [isFind, setIsFind] = useState(false);
  let token;
  if (localStorage.getItem("token")) {
    token = jwt.decode(localStorage.getItem("token"), {
      complete: true,
    }).payload;
  }
  const [access] = useState(token ? token.finalAccessList : []);

  useEffect(() => {
    handleHide();
  }, [token, access]);

  const handleHide = () => {
    for (let i = 0; i < access.length; i++) {
      const item = access[i];
      if (accessList.includes(item)) setIsFind(true);
    }
  };
  return <>{isFind && <>{children}</>}</>;
};
export default Auth;
