

import Head from "next/head"
import axios from "axios"

import { User } from "../src/components"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const Detail = ({ profile }) => {
  const dispatch=useDispatch()
  useEffect(()=>{
    if(profile){
      dispatch({type:"UPDATE_PROFILE",data:profile})
    }
  },[profile])
  return (
    <>
      {!profile.error && (
        <Head>
          <meta property="og:title" content={`${profile?.data?.name}`} key="ogTitle" />
          <meta property="og:type" content={"profile.image"} key="ogType" />
          <meta property="og:site_name" content="ConnectMe" key="ogSitename" />
          <meta property="og:url" content={"https://connectme.co.in/"} key="ogUrl" />
          <meta property="og:image" content={profile?.data?.profileimg} key="ogimage" />
          <meta property="og:desc" content={`${profile?.data?.tagline}`} key="ogdesc" />
        </Head>
      )}
      <User edit={false} />
    </>
  )
}

export default Detail


export async function getServerSideProps(context) {
  let profData
  const query = context.query

  try {
    const { data } = await axios.get(`https://api.connectme.co.in/profile/og/${query.id}`)
    profData = data
  } catch (error) {
    profData = { error: "Error" }
  }

  return {
    props: {
      profile: profData
    }
  }
}