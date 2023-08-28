"use client";

const isSafariBrowser = () => {
  if (typeof window === "undefined" || !window) {
    return false;
  }
  return (
    window?.navigator?.userAgent.indexOf("Safari") > -1 &&
    window?.navigator?.userAgent.indexOf("Chrome") <= -1
  );
};

export default isSafariBrowser;
