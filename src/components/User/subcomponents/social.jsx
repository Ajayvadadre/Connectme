import React, { useEffect } from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../../../redux/action/Profile'

const Social = ({ setSocialRefactor, data }) => {
    const dispatch=useDispatch()
    
    useEffect(()=>{

    },[dispatch])

    const changaActive=(name,active)=>{
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        const profile = JSON.parse(localStorage.getItem("profile"))?.data

        dispatch(updateProfile({ userId: user?._id, data: { [`social.${name.toLowerCase()}.active`]: !active} }, profile?._id))
    }
    return (
        <div className="connectme__social-refactor">
            <div className="content">
                <motion.div className="connectme__social-refactor__content" initial={{y:100,opacity:0}} animate={{y:0,opacity:1}}>
                    <div className="connectme__social-refactor__content-title">
                        <h1>Social Accounts</h1>
                    </div>
                    <div className="connectme__social-refactor__content-data">
                        {data?.map((d) => (
                            <div className="item" key={d.name}>
                                <h3>{d.name}</h3>
                                <div className="item__action">
                                    <motion.div className="button" style={{ background: d.active ? "" : "red" }} whileTap={{ scale: 1.1 }} onClick={()=>changaActive(d.name,d.active)}>
                                        <h3>{d.active ? "Active" : "Deactive"}</h3>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
                <div className="connectme__social-refactor__off" onClick={() => setSocialRefactor(false)}>
                    <motion.div whileTap={{scale:1.1}}>
                        <FaTimesCircle />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Social