// import Link from "next/link";
// import Image from "next/image";
// import styles from "./loginorder.module.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuthContext } from "../hooks/useAuthContext";

// const Loginorder = () => {
//   // dispatchUser to the authContext
//   const { user, dispatchUser } = useAuthContext();

//   // show profile / logout , or show login / signup
//   const [showProfileAndLogout, setshowProfileAndLogout] = useState(false);

//   // show Login
//   const [showLogin, setShowLogin] = useState(true);

//   // show Signup
//   const [showSignup, setShowSignup] = useState(false);

//   // Error Login
//   const [ErrorLogin, setErrorLogin] = useState(false);

//   // Error Signup
//   const [ErrorSignup, setErrorSignup] = useState(false);

//   // Successful Login
//   const [successfulLogin, setSuccessfulLogin] = useState(false);

//   // Successful Signup
//   const [successfulSignup, setSuccessfulSignup] = useState(false);

//   // Signup Function
//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();

//     const name = e.target.name.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     console.log(name);
//     console.log(email);
//     console.log(password);

//     const submission = {
//       email: e.target.email.value,
//       password: e.target.password.value,
//       name: e.target.name.value,
//       address: e.target.address.value,
//     };

//     // fetch request
//     try {
//       const datas = await axios.post(
//         "http://localhost:4000/api/users/signup/",
//         {
//           submission,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Access-Control-Allow-Credentials": "true",
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//             "Access-Control-Allow-Headers":
//               "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//           },
//           // headers: {
//           //   "Access-Control-Allow-Origin": "*",
//           //   "Content-Type": "application/json",
//           // },
//         }
//       );

//       // if (submission.message.length < 10) {
//       //   return { error: "Message must be over 10 chars long." };
//       // }

//       console.log(datas);

//       // check response if ok
//       // console.log(datas.status === 200);

//       if (datas.status === 200) {
//         setSuccessfulSignup(true);
//         setErrorSignup("");
//         setErrorLogin("");

//         setTimeout(() => {
//           setShowLogin(true);
//           setShowSignup(false);
//           setSuccessfulSignup(false);
//         }, 2000);
//       }
//     } catch (error) {
//       console.log("error");

//       // if there is an error response
//       console.log(error);

//       // if there is an error response
//       console.log(error.response.data);

//       setErrorSignup(error.response.data.error);
//     }
//   };

//   // Login Function
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     console.log(email);
//     console.log(password);

//     const submission = {
//       email: e.target.email.value,
//       password: e.target.password.value,
//     };

//     // fetch request
//     try {
//       const datas = await axios.post(
//         "http://localhost:4000/api/users/login/",
//         {
//           submission,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Access-Control-Allow-Credentials": "true",
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//             "Access-Control-Allow-Headers":
//               "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//           },
//           // headers: {
//           //   "Access-Control-Allow-Origin": "*",
//           //   "Content-Type": "application/json",
//           // },
//         }
//       );

//       // if (submission.message.length < 10) {
//       //   return { error: "Message must be over 10 chars long." };
//       // }

//       console.log(datas);

//       // check response if ok
//       // console.log(datas.status === 200);

//       if (datas.status === 200) {
//         setSuccessfulLogin(true);
//         setErrorSignup("");
//         setErrorLogin("");

//         // console.log("we are in");

//         console.log(datas.data);

//         dispatchUser({ type: "LOGIN", payload: datas.data });

//         localStorage.setItem("user", JSON.stringify(datas.data));

//         setTimeout(() => {
//           setshowProfileAndLogout(true);
//           setShowLogin(false);
//           setShowSignup(false);
//           setSuccessfulLogin(false);
//         }, 2000);
//       }
//     } catch (error) {
//       console.log("error");

//       // if there is an error response
//       console.log(error);

//       // if there is an error response
//       console.log(error.response.data);

//       setErrorLogin(error.response.data.error);
//     }
//   };

//   // Logout function
//   const LogoutFunctionHandler = async () => {
//     // fetch request and if ok the cookie will be removed
//     const datas = await axios.post(
//       "http://localhost:4000/api/users/logout",
//       {},
//       {
//         withCredentials: true,
//         headers: {
//           "Access-Control-Allow-Credentials": "true",
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//           "Access-Control-Allow-Headers":
//             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//         },
//       }
//     );

//     // then remove user from local storage and redirect , which will set the context to null automatically
//     localStorage.removeItem("user");

//     // dispatch to context just to re-renders
//     dispatchUser({ type: "LOGOUT" });

//     console.log("logged out");
//   };

//   // to check if there is a token to log in user automatically
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (user) {
//       dispatchUser({ type: "LOGIN", payload: user });
//       setshowProfileAndLogout(true);
//       setShowLogin(false);
//       setShowSignup(false);
//     }
//   }, []);

//   // to check if the token is still valid and if not log out the user ..
//   useEffect(() => {
//     if (user) {
//       const checkToken = async () => {
//         try {
//           const datas = await axios.post(
//             "http://localhost:4000/api/users/checktoken",
//             {
//               message: "checkme",
//             },
//             {
//               withCredentials: true,
//               headers: {
//                 "Access-Control-Allow-Credentials": "true",
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Methods":
//                   "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//                 "Access-Control-Allow-Headers":
//                   "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//               },
//             }
//           );
//           console.log("checked");
//           return;
//         } catch (error) {
//           // then remove user from local storage and   which will set the context to null automatically
//           localStorage.removeItem("user");

//           // dispatch to context just to re-renders
//           dispatchUser({ type: "LOGOUT" });

//           return;
//         }
//       };
//       checkToken();
//     }
//   }, [user]);

//   return (
//     <div className={styles.component}>
//       <div className={styles.loginButtons}>
//         {showProfileAndLogout && (
//           <div>
//             {" "}
//             <button>Profile</button>
//             <button
//               onClick={() => {
//                 setTimeout(() => {
//                   setShowLogin(true);
//                   setShowSignup(false);
//                   setshowProfileAndLogout(false);
//                   LogoutFunctionHandler();
//                 }, 500);
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         )}

//         {!showProfileAndLogout && (
//           <div>
//             {" "}
//             <button
//               onClick={() => {
//                 setShowLogin(true);
//                 setShowSignup(false);
//               }}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => {
//                 setShowSignup(true);
//                 setShowLogin(false);
//               }}
//             >
//               Signup
//             </button>{" "}
//           </div>
//         )}
//       </div>

//       {showLogin && (
//         <div>
//           <form
//             onSubmit={handleLoginSubmit}
//             // action="/send-data-here"
//             // method="post"
//             className={styles.SignupLoginForm}
//           >
//             <div className={styles.FormEmail}>
//               <label for="email">Email:</label>
//               <input
//                 type="text"
//                 name="email"
//                 required
//                 minlength="5"
//                 maxlength="20"
//               />
//             </div>
//             <div className={styles.FormEmail}>
//               <label for="password">Password:</label>
//               <input
//                 type="password"
//                 name="password"
//                 required
//                 minlength="5"
//                 maxlength="20"
//               />
//             </div>
//             <button type="submit">Submit</button>
//           </form>

//           {ErrorLogin && <p className={styles.error}>{ErrorLogin}</p>}

//           {successfulLogin && (
//             <p className={styles.successRequest}>
//               Login was successful redirecting
//             </p>
//           )}
//         </div>
//       )}

//       {showProfileAndLogout && (
//         <div className={styles.ProfileComponent}>
//           {/* <Image>Image of the character</Image> */}
//           <div>Welcome Dev</div>

//           <button>Get my past orders</button>
//           <button>Edit my Information</button>
//           <button>Contact Us</button>
//         </div>
//       )}

//       {showSignup && (
//         <div>
//           <form
//             onSubmit={handleSignupSubmit}
//             // action="/send-data-here"
//             // method="post"
//             className={styles.SignupLoginForm}
//           >
//             <div className={styles.FormEmail}>
//               <label for="email">Email:</label>
//               <input
//                 type="text"
//                 // id="roll"
//                 name="email"
//                 required
//                 minlength="5"
//                 maxlength="20"
//               />
//             </div>
//             <div className={styles.FormEmail}>
//               <label for="password">Password:</label>
//               <input
//                 type="password"
//                 name="password"
//                 required
//                 minlength="5"
//                 maxlength="20"
//               />
//             </div>
//             <div className={styles.FormEmail}>
//               <label for="name">Name:</label>
//               <input
//                 type="text"
//                 // id="name"
//                 name="name"
//                 required
//                 minlength="5"
//                 maxlength="20"
//               />
//             </div>
//             <div className={styles.FormEmail}>
//               <label for="address">Address:</label>
//               <input
//                 type="text"
//                 // id="name"
//                 name="address"
//                 required
//                 minlength="5"
//                 maxlength="20"
//               />
//             </div>
//             <button type="submit">Submit</button>
//           </form>

//           {ErrorSignup && <p className={styles.error}>{ErrorSignup}</p>}

//           {successfulSignup && (
//             <p className={styles.successRequest}>
//               Signup was successful redirecting to login
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Loginorder;
