import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./styles.css";
export const MSG = (props) => {
  const dispatch = useDispatch();

  const [msg, setMsg] = useState(props.message);
  useEffect(() => {
    let timer = setTimeout(() => {
      setMsg("");
      dispatch({
        type: "postMessage",
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [msg, dispatch]);
  return <div>{msg}</div>;
};
