import React, { useEffect, useState } from 'react'
import { FaEdit, FaTimesCircle } from "react-icons/fa"
import ToggleSwitch from './Toggle'
import { motion } from 'framer-motion'

const Audition = ({ isFile = false, edit, openHandler, data, profileId, profile }) => {
    const [showModal, setshowModal] = useState(false)
    useEffect(() => {

    }, [showModal])
    return (
        <>
            <div className="connectme__user-audition">
                <div className="connectme__user-audition__title">
                    <h1>Audition</h1>
                    {
                        edit && (
                            <ToggleSwitch label={"hel"} apiId="audition.active" api="audition" title={"This will Hide/Show Audition Section"} profileId={profileId} profile={profile} audition={true} />
                        )
                    }
                </div>
                <div className="connectme__user-audition__content">
                    {edit && (
                        <div className="background" onClick={()=>setshowModal(true)}>
                            <FaEdit />
                        </div>
                    )}
                    {isFile ? (
                        <video src={data?.value} controls></video>
                        ) : (
                        <iframe src={`https://www.youtube.com/embed/${data?.value}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    )}
                </div>
                {showModal && (
                    <div className="modal">
                        <div className="modal__box" >
                            <div className="modal__cancel" >
                                <FaTimesCircle onClick={()=>setshowModal(false)}  />
                            </div>
                            <motion.div className="modal__youtube" whileTap={{ scale: 1.1 }} onClick={() => {
                                openHandler(isFile ? "" : data?.value, "Audition", "audition.value", { audition: true,type: "youtube", placeholder: "Paste Your Youtube Share Link" }, false)
                                setshowModal(false)
                            }
                                }>
                                <h3>Youtube</h3>
                            </motion.div>
                            <motion.div className="modal__file" whileTap={{ scale: 1.1 }} onClick={() => {
                                openHandler(data?.value, "Audition", "audition.value", { audition: true, type:"personal", placeholder: "Paste Your Youtube Share Link" }, {active:true,type:"video/*"})
                                setshowModal(false)
                            }
                                }>
                                <h3>File</h3>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>


        </>
    )
}

export default Audition