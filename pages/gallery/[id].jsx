import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getProfileByUserName } from "../../redux/action/Profile"
import { Layout } from "../../src/components"
import Gallery from "../../src/components/Gallery/Gallery"


const Grid = () => {
    const router = useRouter()
    const {id,content,edit}=router.query

    const dispatch=useDispatch()
    const {profile}=useSelector((state)=>state.profileReducer)

    const profileData=profile?.data
    
    const validUri=["portfolio","services"]

    
    
    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        
        if(data!==undefined){
            dispatch(getProfileByUserName(id,{userId:data?._id},true))
        }else{
            dispatch(getProfileByUserName(id,{userId:data?._id},false))
        }
        
    },[dispatch,router])
    
    useEffect(()=>{
        
    },[profile])
    
    if(!validUri.includes(content)){
        return (
            <h1>Invalid Query</h1>
        )    
    }
    
    if(profileData===undefined){
        return (
            <h1>waiting..</h1>
        )
    }


    const isEdit=edit==="true"
    
    return (
        <Layout title={`Profile of Jaiswar203`} description={profile?.name} navbar={false} icon={profileData?.profileimg} >
            <Gallery data={profileData[content]} title={id} content={content} edit={isEdit}  />
        </Layout>
    )
}

export default Grid