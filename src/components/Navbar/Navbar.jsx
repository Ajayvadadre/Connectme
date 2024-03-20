import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { existingUserData } from "../../../redux/action/Auth";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import { useRouter } from "next/router";
import Image from "next/image";

const Navbar = () => {
  const state = useSelector((state) => state.AuthRedu);
  const authData = state?.authData;
  const dispacth = useDispatch();
  const router = useRouter();

  const logout = () => {
    dispacth({ type: "LOGOUT" });
    router.push("/");
  };
  useEffect(() => {
    const data = localStorage.getItem("UserAuth");
    dispacth(existingUserData(JSON.parse(data)));

    // const token=authData?.token

    // if(token){
    //     const decodeToken=decode(token)
    //     if(decodeToken.exp * 1000 < new Date().getTime())
    //     return logout()

    // }
  }, [dispacth]);
  const { signup } = router.query;

  const SignOutHandler = () => {
    dispacth({ type: "LOGOUT" });
  };

  return (
    <header className="connectme__header">
      <div className="connectme__header-icon">
        {/* <h1>ConnectMe</h1> */}
        {/* <Image src={"https://res.cloudinary.com/redwine/image/upload/v1648287707/Linkedin-Logo_zimkn0.png"} width={100} height={100} layout="responsive" objectFit="contain" /> */}
        <img src="/main.png" alt="logo" />
      </div>
      <div className="connectme__header-signup">
        {!authData ? (
          <Link href={`/login${signup ? "" : "?signup=true"}`}>
            <motion.div
              className="box"
              whileHover={{ scale: 1.1, border: "1px solid #3080C0" }}
            >
              <p>{signup ? "Login" : "Sign Up"}</p>
            </motion.div>
          </Link>
        ) : (
          <>
            <motion.div
              className="box"
              whileHover={{ scale: 1.1 }}
              onClick={SignOutHandler}
            >
              <p>Sign Out</p>
            </motion.div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
