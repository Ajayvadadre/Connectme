import Image from "next/dist/client/image"
import { motion } from "framer-motion"
import { BsArrowLeft } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import Modal from "../modal/Modal"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { deleteSubDocInProfileById } from "../../../redux/action/Profile"

const Gallery = ({ data, title, content, edit }) => {

    const [modal, setModal] = useState(false)
    const [imgSrc, setImgSrc] = useState("")
    const [index, setIndex] = useState(0)
    const router = useRouter()
    const dispatch = useDispatch()
    const newData = data

    if (index < 0) {
        setIndex(newData?.length - 1)
    } else if (index > newData.length - 1) {
        setIndex(0)
        
    }

    const refinedData = newData[index]

    useEffect(() => {

    }, [modal, imgSrc, index, refinedData, dispatch,edit])

    const deleteSubDoc = (id) => {
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser

        
        dispatch(deleteSubDocInProfileById({ subId: id, userId: user?._id }, user?.profile, content.toLowerCase()))
    }

    const onClickHandler = (i) => {
        setIndex(i)
        setModal(true)
    }

    
    
    return (
        <div className="connectme__gallery">
            <div className="connectme__gallery-title">
                <motion.div whileTap={{ scale: 1.1, x: -30 }}>
                    <BsArrowLeft onClick={() => router.back()} />
                </motion.div>
                <h1>{content.toUpperCase()}</h1>
            </div>
            <div className="border">
                <b className="hr anim"></b>
            </div>
            <div className="connectme__gallery-content" >
                {data && data?.map((d, i) => (
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .3 }} key={d.data} className="images" onClick={() => !edit && onClickHandler(i)}>

                        <Image src={d?.data} width={300} height={300} objectFit="cover" />
                        {edit && (
                            <>
                                {/* <div className="background" onClick={() => {
                                    setMultipleUpload(false)
                                    openEditHandler(d.data, title, `${title?.toLowerCase()}`, { isSubDoc: true, _id: d._id }, { active: true, data: "image/*" })
                                }}>
                                    <FaEdit />
                                </div> */}
                                <div className="delete" onClick={() => deleteSubDoc(d._id)}>
                                    <MdDelete />
                                </div>
                            </>
                        )}
                    </motion.div>
                ))}
            </div>
            {modal && (
                <Modal img={refinedData?.data} setModal={setModal} index={index} setIndex={setIndex} />
            )}
        </div>
    )
}

export default Gallery