import React from "react";

export const auth = () => {
  const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return header;
};
