import React, { useEffect, useState } from 'react'


import { MdDelete } from 'react-icons/md'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Autoplay } from 'swiper'

import {  motion } from 'framer-motion'
import Image from 'next/image'
import { FaPlayCircle, FaEdit } from 'react-icons/fa'
import Modal from '../../modal/Modal'
import { useDispatch } from 'react-redux'
import { deleteSubDocInProfileById } from '../../../../redux/action/Profile'

const Testimonial = ({ edit, data, openEditHandler }) => {
    const [showVid, setShowVid] = useState(false)
    const [number, setNumber] = useState(0)
    const [vidUrl, setvidUrl] = useState("")

    const dispatch=useDispatch()


    const breakpoints = {
        "600": {
            slidesPerView: 2
        },
        "1100": {
            slidesPerView: 3
        },
        "2200": {
            slidesPerView: 4
        },
    }

    useEffect(() => {

    }, [showVid, number])



    const deleteSubDoc = (id) => {
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        
        dispatch(deleteSubDocInProfileById({ subId: id, userId: user?._id }, user?.profile, "testimonial"))
    }
    return (
        <div className="connectme__user-testimonial">
            <div className="connectme__user-testimonial__title">
                <h1>Testimonial</h1>
                {edit && (
                    <motion.div className="add" whileTap={{ scale: 1.1 }} onClick={() => openEditHandler(null, "Testimonial", `testimonial`, { testimonial: true ,placeholder:"Paste Youtube Url/Link"},)} >
                        <h2>Add Video</h2>
                    </motion.div>
                )}
            </div>
            <div className="connectme__user-testimonial__content">
                <Swiper loop={false} slidesPerView={1} spaceBetween={50} breakpoints={breakpoints} autoplay speed={600} modules={[Autoplay]} >
                    {data?.map((d, i) => (
                        <>
                            <SwiperSlide className='connectme__user-testimonial__content-carousel' key={d.name}>
                                {edit && (
                                    <>
                                        <div className="background" onClick={() => openEditHandler(d.data, "Testimonial", `testimonial`, { isSubDoc: true, _id: d._id ,placeholder:"Paste Youtube Url/Link"})}>
                                            <FaEdit />
                                        </div>
                                        <div className="delete" onClick={() => deleteSubDoc(d._id)}>
                                            <MdDelete />
                                        </div>
                                    </>
                                )}
                                <motion.div>
                                    <Image src={`https://img.youtube.com/vi/${d.data}/hqdefault.jpg`} width={560} height={350} objectFit="cover" layout="responsive" />
                                    <div className="play-button" onClick={() => {
                                        setShowVid(true)
                                        setvidUrl(d.data)
                                        setNumber(i)
                                    }} >
                                        <FaPlayCircle />
                                    </div>
                                </motion.div>

                            </SwiperSlide>
                        </>
                    ))}
                </Swiper>
            </div>
            {showVid && (
                <Modal isImg={false} img={vidUrl} isIframe={true} setModal={setShowVid} placeholder={"Paste Youtube Url/Link from"} />
            )}
        </div>
    )
}

export default Testimonial