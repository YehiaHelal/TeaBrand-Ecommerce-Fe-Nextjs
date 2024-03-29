"use client";

import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import MyBag, { CartItemAlertNumberOfitems } from "../../comps/myBag";
import { useEffect, useState } from "react";
import {
  ItemsContext,
  ItemsContextProvider,
} from "../../context/ItemsContextCart";
import Login from "../../comps/login";
import Search from "../../comps/search";
import { AuthContextProvider } from "../../context/AuthContext";
import Chat from "../../comps/chat";

// const metadata = {
//   title: "E-commerece Market",
//   // description: "E-commerece Market",
// };

function RootLayout({ children }) {
  // show chat app
  // const [showingChat, setShowingChat] = useState(true);

  // show My Bag
  const [showingBag, setShowingBag] = useState(false);

  // Show and Hide Login
  const [showLogin, setShowingLogin] = useState(false);

  // Show and Hide Search Bar
  const [showSearchBar, setShowSearchBar] = useState(false);

  // ITEM FETCH
  const [itemCollection, setItemCollection] = useState([]);

  // Show Css dropDown in Mediaquery Nav
  const [showDropCss, setShowDropCss] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        "https://backend.shoponlinemarket.cloud/api/items"
      );

      const item = await response.json();

      if (response.ok) {
        // dispatcho({ type: "FETCHED-ALL", payload: json });
      }

      setItemCollection(item);
    };

    fetchItems();
    // alert("Hello!");
    // alert(
    //   "Please wait 30 seconds for the Backend/Database server to start working again (because it's a free hosting after 15min of inactivity it stops working)"
    // );
  }, []);

  if (typeof window !== "undefined") {
    // Perform localStorage action
    // const item = localStorage.getItem("key");

    const localStoragechecking = JSON.parse(localStorage.getItem("cartItems"));
    let emptyarray = [];
    if (!localStorage.getItem("cartItems")) {
      localStorage.setItem("cartItems", JSON.stringify(emptyarray));
    }
  }

  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <ItemsContextProvider>
            <div className="nav">
              <Link href="/">
                <div className="nav-each-part-one">
                  <Image
                    alt="image"
                    src={require(`./../../public/Images/icon.jpg`)}
                    className="iconImageTransparent"
                  ></Image>

                  <h3 className="TitleStyle">BRAND NAME</h3>
                </div>
              </Link>
              {/* <div className="Large-Display-nav"> */}
              <div className="nav-each-part-two">
                <Link href="/collections">TEA COLLECTIONS</Link>
                {/* <Link href="/">ACCESSORIES</Link> */}
                <Link href="/Blog">BLOG</Link>
                <Link href="/contacts">CONTACT US</Link>
                <Link href="/admin">ADMIN DASHBOARD</Link>
              </div>

              <div className="nav-each-part-three">
                <button
                  className="search-icon-button"
                  onClick={() => {
                    if (showSearchBar) {
                      setShowSearchBar(false);
                      // console.log("close search");
                    }

                    if (!showSearchBar) {
                      setShowSearchBar(true);
                      setShowingLogin(false);
                      setShowingBag(false);
                    }
                  }}
                >
                  <Image
                    className="search-icon"
                    alt="image"
                    src={require(`./../../public/Images/search.svg`)}
                    // className="iconImage"
                  ></Image>
                </button>
                <button
                  className="search-icon-button"
                  onClick={() => {
                    if (showLogin) {
                      setShowingLogin(false);
                    }

                    if (!showLogin) {
                      setShowingLogin(true);
                      setShowSearchBar(false);
                      setShowingBag(false);
                    }
                  }}
                >
                  <Image
                    className="search-icon"
                    alt="image"
                    src={require(`./../../public/Images/user.svg`)}
                    // className="iconImage"
                  ></Image>
                </button>
                <button
                  className="search-icon-button"
                  onClick={() => {
                    if (showingBag) {
                      setShowingBag(false);
                    }

                    if (!showingBag) {
                      setShowingBag(true);
                      setShowSearchBar(false);
                      setShowingLogin(false);
                    }
                  }}
                >
                  <div className="search-icon-image-and-number">
                    <Image
                      className="search-icon"
                      alt="image"
                      src={require(`./../../public/Images/shopping-cart.svg`)}
                    ></Image>

                    <CartItemAlertNumberOfitems className="cart-icon-number" />
                  </div>
                </button>
              </div>
              {/* </div> */}

              <button
                className="svgdropdown"
                onClick={() => {
                  if (showDropCss) {
                    setShowDropCss(false);
                  }
                  if (!showDropCss) {
                    setShowDropCss(true);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              {showDropCss && (
                <div className="nav-two-three-InDropDown">
                  <div className="nav-each-part-one-InDropDown">
                    <button
                      onClick={() => {
                        setShowDropCss(false);
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div className="nav-each-part-two-InDropDown">
                    <Link href="/collections">TEA COLLECTIONS</Link>
                    {/* <Link href="/">ACCESSORIES</Link> */}
                    <Link href="/Blog">BLOG</Link>
                    <Link href="/contacts">CONTACT US</Link>
                    <Link href="/admin">ADMIN DASHBOARD</Link>
                  </div>

                  <div className="nav-each-part-three-InDropDown">
                    <button
                      className="search-icon-button"
                      onClick={() => {
                        if (showSearchBar) {
                          setShowSearchBar(false);
                          // console.log("close search");
                        }

                        if (!showSearchBar) {
                          setShowSearchBar(true);
                          setShowDropCss(false);
                          setShowingLogin(false);
                          setShowingBag(false);
                        }
                      }}
                    >
                      <Image
                        alt="image"
                        className="search-icon"
                        src={require(`./../../public/Images/search.svg`)}
                        // className="iconImage"
                      ></Image>
                    </button>
                    <button
                      className="search-icon-button"
                      onClick={() => {
                        if (showLogin) {
                          setShowingLogin(false);
                        }

                        if (!showLogin) {
                          setShowingLogin(true);
                          setShowDropCss(false);
                          setShowSearchBar(false);
                          setShowingBag(false);
                        }
                      }}
                    >
                      <Image
                        alt="image"
                        className="search-icon"
                        src={require(`./../../public/Images/user.svg`)}
                        // className="iconImage"
                      ></Image>
                    </button>
                    <button
                      className="search-icon-button"
                      onClick={() => {
                        if (showingBag) {
                          setShowingBag(false);
                        }

                        if (!showingBag) {
                          setShowingBag(true);
                          setShowDropCss(false);
                          setShowSearchBar(false);
                          setShowingLogin(false);
                        }
                      }}
                    >
                      <div className="search-icon-image-and-number">
                        <Image
                          alt="image"
                          className="search-icon"
                          src={require(`./../../public/Images/shopping-cart.svg`)}
                        ></Image>

                        <CartItemAlertNumberOfitems className="cart-icon-number" />
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {showSearchBar && (
                <button
                  onClick={() => {
                    setShowSearchBar(false);
                  }}
                  className="ButtonCloseSearchBar"
                >
                  X
                </button>
              )}

              {showSearchBar && <Search items={itemCollection}></Search>}

              {showLogin && (
                <button
                  onClick={() => {
                    setShowingLogin(false);
                  }}
                  className="ButtonCloseLogin"
                >
                  X
                </button>
              )}

              {showLogin && <Login></Login>}

              {showingBag && (
                <button
                  onClick={() => {
                    setShowingBag(false);
                  }}
                  className="ButtonClose"
                >
                  X
                </button>
              )}

              {showingBag && <MyBag></MyBag>}
            </div>
            <Chat></Chat>
            {children}
          </ItemsContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}

export default RootLayout;
