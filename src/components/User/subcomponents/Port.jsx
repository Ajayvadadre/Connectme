
import { SwiperSlide, Swiper } from 'swiper/react'
import { IoIosArrowForward } from 'react-icons/io'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Autoplay } from 'swiper'
import Image from 'next/image'
import Modal from "../../modal/Modal"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from 'next/link'
import Edit from './Edit'
import { useDispatch } from 'react-redux'
import { deleteSubDocInProfileById } from '../../../../redux/action/Profile'
import { useSelector } from 'react-redux'

const Port = ({ data, title, link = "", edit, openEditHandler }) => {
    const [showModal, setShowModal] = useState(false)
    const [index, setIndex] = useState(0)

    const { profile, isLoading } = useSelector((state) => state.profileReducer)

    const [multipleUpload, setMultipleUpload] = useState(false)

    const [editData, setEditData] = useState({})
    const [openEdit, setOpenEdit] = useState(false)

    const dispatch = useDispatch()

    const newData = data

    const breakpoint = {
        500: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        900: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        1500: {
            slidesPerView: 4,
            spaceBetween: 10
        },
        2100: {
            slidesPerView: 5,
            spaceBetween: 10
        },
        2600: {
            slidesPerView: 6,
            spaceBetween: 10
        },
    }

    useEffect(() => {

    }, [showModal, index, editData, openEdit])
    useEffect(() => {
        if (index < 0) {
            setIndex(newData.length - 1)
        } else if (index >= newData.length - 1) {
            setIndex(0)

        }

    }, [refinedData, profile, index, multipleUpload])
    var refinedData = newData[index]


    const addImageHandler = (addImage = true) => {
        setEditData({ fileUploader: { active: true, data: "image/*" }, title, addImage, query: title === "Work" ? "services" : title.toLowerCase() })
        setOpenEdit(true)
    }



    if (data === null) {
        return null
    }

    const deleteSubDoc = (id) => {
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser

        const apiTitle = title === "Work" ? "services" : title.toLowerCase()

        dispatch(deleteSubDocInProfileById({ subId: id, userId: user?._id }, user?.profile, apiTitle))
    }

    return (
        <div className="connectme__user-services">
            <div className="connectme__user-services__title">
                <h1>{title && title}</h1>
                {edit && (
                    <motion.div className="add" whileTap={{ scale: 1.1 }} onClick={() => {
                        setMultipleUpload(true)
                        addImageHandler(true)
                    }
                    } >
                        <h2>Add {title}</h2>
                    </motion.div>
                )}
            </div>
            <motion.div className="connectme__user-services__content" >
                <Swiper loop={false} slidesPerView={1} breakpoints={breakpoint} spaceBetween={50} autoplay speed={600} modules={[Autoplay]}>
                    {newData?.map((d, i) => (
                        <SwiperSlide key={d._id}>
                            <motion.div className="image" whileHover={{ scale: !edit && 1.1 }} onClick={() => {
                                !edit && setIndex(i)
                                !edit && setShowModal(true)
                            }
                            }>
                                {edit && (
                                    <>
                                        <div className="background" onClick={() => {
                                            setMultipleUpload(false)
                                            openEditHandler(d.data, title, `${title?.toLowerCase()}`, { isSubDoc: true, _id: d._id }, { active: true, data: "image/*" })
                                        }}>
                                            <FaEdit />
                                        </div>
                                        <div className="delete" onClick={() => deleteSubDoc(d._id)}>
                                            <MdDelete />
                                        </div>
                                    </>
                                )}
                                <Image src={d.data} width={400} height={400} objectFit="cover" alt={"Profile Image"} />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
            {
                data?.length > 5 && (

                    <div className="connectme__user-services__more" >
                        <Link href={`/${link}&edit=${edit}`} passHref>
                            <motion.div className="" initial={{ x: -300, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} whileHover={{ scale: 1.1, x: 10 }}  >
                                <p style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1rem", cursor: "pointer" }}>Explore More <IoIosArrowForward size={20} /> </p>
                            </motion.div>
                        </Link>
                    </div>
                )
            }
            {showModal && (
                <Modal img={refinedData?.data} setModal={setShowModal} setIndex={setIndex} index={index} />
            )}
            {
                openEdit && (
                    <Edit modal={setOpenEdit} data={editData} state={profile} isLoading={isLoading} multiple={multipleUpload} />
                )
            }
        </div>
    )
}

export default Port