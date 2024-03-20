import Image from 'next/image'
import { FaTimesCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'
import {useEffect} from 'react'

const Modal = ({ isImg = true,showNaviagtion=true ,isIframe = false,index, img, setModal,setIndex }) => {
    useEffect(()=>{

    },[img])
    return (
        <div className="modal">
            <motion.div className="connectme__modal" >
                <motion.div className="connectme__modal-off" whileHover={{ scale: 1.1 }}>
                    <FaTimesCircle onClick={() => setModal(false)} />
                </motion.div>
                <motion.div className="connectme__modal-img" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}>
                    {isImg ? (
                        <Image src={img}  layout="responsive" width={400} height={400} objectFit="cover" />
                    ) : isIframe ? <iframe width="560" height="315" src={`https://www.youtube.com/embed/${img}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : <video src={img} autoPlay muted controls></video>}
                </motion.div>
                {isImg && showNaviagtion && (
                    <div className="connectme__modal-button">
                        <motion.div className="item"  whileHover={{scale:1.1}}  onClick={()=>setIndex(index-1)} whileTap={{scale:1.1}}>
                            <FaArrowLeft />
                        </motion.div>
                        <motion.div className="item"   whileHover={{scale:1.1}} onClick={()=>setIndex(index+1)} whileTap={{scale:1.1}}>
                            <FaArrowRight />
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default Modal