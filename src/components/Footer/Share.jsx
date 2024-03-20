import { FaTimes, FaLink } from "react-icons/fa"
import Facebook from '../User/logo/facebook'
import Whatsapp from '../User/logo/whatsapp'
import Insta from '../User/logo/insta'
import Twitter from '../User/logo/twitter'
import Linkedin from '../User/logo/linkedin'
import { useState } from "react"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { ToastContainer, toast } from 'react-toast'

import copy from 'copy-to-clipboard'


const Share = ({ setShare, username }) => {
    const [url, setUrl] = useState("")

    useEffect(() => {
        setUrl(window.location.origin)
    }, [])
    const copyToClipBoard = () => {
        copy(`${url}/${username}`)
        toast("Url Copied",{
            backgroundColor:"green",
            color:"white"
        })
    }
    return (
        <div className="connectme__share">
            <div className="connectme__share-content">
                <div className="connectme__share-content__title">
                    <h2>Share Profile</h2>
                    <motion.div className="close" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }} onClick={() => setShare(false)}>
                        <FaTimes />
                    </motion.div>
                </div>
                <div className="divider"></div>
                <div className="connectme__share-content__share">
                    <div className="title">
                        <h4>Share Profile Via</h4>
                    </div>
                    <ToastContainer position="top-right" delay={4000}  />
                    <div className="social">
                        <motion.div className="social__item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                            <a href={`https://api.whatsapp.com/send?text=${url}/${username}`} target="_blank" rel="noreferrer" data-action="share/whatsapp/share">
                                <Whatsapp />
                            </a>
                        </motion.div>
                        <motion.div className="social__item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}/${username}`} target="_blank" rel="noreferrer">
                                <Facebook />
                            </a>
                        </motion.div>
                        {/* <motion.div className="social__item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                            <Insta />
                        </motion.div> */}
                        {/* <motion.div className="social__item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                            
                            <Linkedin />
                        </motion.div> */}
                        <motion.div className="social__item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                            <a href={`https://twitter.com/intent/tweet?url=${url}/${username}`} rel="noreferrer">
                                <Twitter />
                            </a>
                        </motion.div>
                    </div>
                    <div className="copy">
                        <div className="copy__title">
                            <h4>Or copy link</h4>
                        </div>
                        <div className="copy__content">
                            <FaLink />
                            <input type="text" readOnly value={`${url}/${username}`} />
                            <motion.div className="copy__button" onClick={copyToClipBoard} whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                                <h4>Copy</h4>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share