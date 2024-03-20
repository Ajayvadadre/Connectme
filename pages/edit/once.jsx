import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { getProfileById, updateProfile, updateSubDocInProfileById } from '../../redux/action/Profile'
import { TextField } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { ToastContainer, toast } from 'react-toast'

const Once = () => {
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { profileReducer: { profile } } = state
    const [loading, setLoading] = useState(false)


    const router = useRouter()
    const profileData = profile && profile?.data?.userInfo

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser

        dispatch(getProfileById({ email: data?.email }, data?.profile))
    }, [dispatch])
    useEffect(() => {

        setTimeout(() => {
            if (profile?.success) {
                setLoading(false)
            }
        }, 2000)
    }, [profile, loading])

    const handleSub = (data) => {
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        const profile = JSON.parse(localStorage.getItem("profile"))?.data

        setLoading(true)
        profileData.data.map((d) => {
            dispatch(updateSubDocInProfileById({ subId: d._id, userId: user?._id, newData: data[d.name] }, profile?._id, "userInfo", true))
        })
        
        
    }
    return (
        <div className="connectme__user-update__once">
            <div className="connectme__user-update__once-title">
                <motion.div className="previous" whileTap={{ x: -20 }} onClick={() => router.back()}>
                    <AiOutlineArrowLeft />
                </motion.div>
                <h1>Personal Info</h1>
            </div>
            <ToastContainer position="top-right" delay={2000} />
            <div className="border"></div>
            <div className="connectme__user-update__once-content">
                <form className="personal__form" onSubmit={handleSubmit(handleSub)}>
                    {
                        profileData?.data.map((d) => (
                            <div className="personal__form-item" key={d.name}>
                                <h2>{d.name}: </h2>
                                <div className="value">
                                    <TextField variant="outlined" label={d.name} defaultValue={d.data} {...register(d.name)} />
                                </div>
                            </div>
                        ))
                    }
                    <div className="submit">
                        {loading ? (
                            <ClipLoader size={35} color="#000" />
                        ) : (
                            <motion.button type="submit" whileHover={{scale:1.05,background:"white",color:'black'}}>Submit</motion.button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Once