import { Layout } from "../src/components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createProfile } from "../redux/action/Profile";
import { demoProfile } from "../src/db/demo";
import { getUserById } from "../redux/action/Auth";
import Link from "next/link";
import { motion } from "framer-motion";

import { v4 as uuid } from 'uuid'

import PopupModal from "../src/components/modal/Popup";

const Index = () => {
  const state = useSelector((state) => state);
  const authData = state?.AuthRedu?.authData;
  const dispatch = useDispatch();
  const router = useRouter();
  const { generateprofile } = router.query;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserAuth"));
    if (state?.profileReducer?.profile) {
      dispatch(getUserById(data?.existingUser?._id));
      router.push(`/edit/${data?.existingUser?.username}`);
    }
  }, [state]);

  useEffect(() => {
    if (generateprofile && authData !== null) {
      const data = JSON.parse(localStorage.getItem("UserAuth"));

      dispatch(
        createProfile({
          ...demoProfile,
          createdBy: data?.existingUser?._id,
          name: data?.existingUser?.name
        })
      );
    }
  }, [dispatch]);

  const uniqueIdForVisitor = uuid()
  useEffect(() => {
    const is_cookie_exist = localStorage.getItem("unique")
    const is_user_logged=JSON.parse(localStorage.getItem("UserAuth"))
 
    if (is_cookie_exist === null) {
      localStorage.setItem("unique", uniqueIdForVisitor)
    }

    if (authData === null) {
      router.push("/login");
    }

    if(is_user_logged!==null && is_user_logged?.existingUser?.isVerified){
      router.push(`/edit/${is_user_logged.existingUser.username}`)
    }
  }, [authData]);

  const createUserProfile = () => {
    const data = JSON.parse(localStorage.getItem("UserAuth"));

    dispatch(
      createProfile({
        ...demoProfile,
        createdBy: data?.existingUser?._id,
        name: data?.existingUser?.name
      })
    );
    dispatch(getUserById(data?._id));
  };

  
  const newData = authData !== undefined && authData?.existingUser;
  
  return (
    <Layout description={"ConnectMe Login"}>
      {!authData && (
        <PopupModal
          success={false}
          message={"Redirecting to Login Page,Please Wait"}
          title={"Not Authenticated"}
        />
      )}
      {authData?.existingUser?.isVerified ? (
        <div className="connectme__home">
          {!newData.profile ? (
            <motion.div
              className="connectme__home-profile"
              whileTap={{ scale: 1.1 }}
              onClick={createUserProfile}
            >
              <h3>Create Profile</h3>
            </motion.div>
          ) : (
            <Link passHref href={`/${newData.username}`}>
              <motion.div
                className="connectme__home-profile"
                whileTap={{ scale: 1.1 }}
              >
                <h3>Get To Profile</h3>
              </motion.div>
            </Link>
          )}
        </div>
      ): (
        <div className="not__verified">
          <div className="box">
            <h3>Your account is not verified , Please Verify Your Account. As Soon As Possible</h3>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;
