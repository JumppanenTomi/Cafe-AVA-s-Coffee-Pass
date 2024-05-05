"use client";

import { useEffect, useState } from "react";
import { deleteCookie, getCookie, getCookies, setCookie } from "cookies-next";

/**
 * Renders a cookie compliance banner that allows users to accept or decline cookies.
 * If cookies are declined, all existing cookies are deleted and the page is reloaded.
 */
export default function CookieCompliance() {
  const cookieAllowed = getCookie("cookieAllowed");

  const [show, setShow] = useState<boolean>(false);

  /**
   * Accepts cookies and sets the "cookieAllowed" cookie with a max age of 1 year.
   * Hides the cookie compliance message.
   */
  const acceptCookies = () => {
    setCookie("cookieAllowed", "true", { maxAge: 365 * 60 * 60 * 24 });
    setShow(false);
  };

  /**
   * Function to decline cookies.
   * Deletes all cookies, resets history, and reloads the page.
   */
  const declineCookies = () => {
    // Get all cookies
    const allCookies = getCookies();

    // Check if cookies exist
    if (allCookies) {
      const resultArray = [];

      // Iterate through each cookie
      for (let key in allCookies) {
        if (allCookies.hasOwnProperty(key)) {
          resultArray.push({ key: key, value: allCookies[key] });
        }
      }

      // Delete each cookie
      resultArray.forEach((cookie) => {
        deleteCookie(cookie.key);
      });

      // Reset history and reload the page
      history.pushState({}, "", "/");
      location.reload();
    }
  };

  useEffect(() => {
    if (!cookieAllowed) {
      setShow(true);
    }
  }, [cookieAllowed]);

  return (
    show && (
      <div
        className={
          "fixed flex flex-col justify-end items-center bottom-0 top-0 w-full z-50 text-foreground bg-[#000000a9]"
        }
      >
        <div
          className={
            "flex flex-col gap-5 max-w-screen-md bg-background text-foreground p-8 rounded-t-md text-center"
          }
        >
          <p>
            This website uses cookies to ensure you get the best experience on
            our website. If you decline cookies, you are not able to use this
            website, this is because all cookies we use are essential for our
            website.
          </p>
          <div className={"flex gap-5"}>
            <button
              className={"btn-primary w-full mt-2"}
              onClick={acceptCookies}
            >
              Accept
            </button>
            <button
              className={"btn-secondary w-full mt-2"}
              onClick={declineCookies}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    )
  );
}
