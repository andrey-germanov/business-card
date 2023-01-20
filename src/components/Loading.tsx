import React from "react";

export const Loading = () => {
  return (
    <div
      style={{
        height: "100vh",
        background: "#444472bd",
        position: "absolute",
        top: "0",
        right: "0",
        left: "0",
        bottom: "0",
        zIndex: "1001",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '44px',
        color: '#fff'
      }}
    >
      loading...
    </div>
  );
};
