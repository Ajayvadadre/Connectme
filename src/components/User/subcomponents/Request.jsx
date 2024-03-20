import { AiOutlineCheck } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { confirmRequest,profileRequests } from '../../../../redux/action/Profile'

const Request = ({ data, setModal }) => {
    const dispatch = useDispatch()

    const acceptRequest = (email) => {

        const profile = JSON.parse(localStorage.getItem("profile"))?.data

        dispatch(confirmRequest({ email: email }, profile?._id))
    }
    const rejectRequest = (id) => {
        const data = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        const profile = JSON.parse(localStorage.getItem("profile"))?.data

        dispatch(profileRequests({ userId: id }, profile?._id))
    }
    return (
        <div className="connectme__user-request">
            <div className="connectme__user-request__container">
                <div className="connectme__user-request__container-title">
                    <h1>Request List</h1>
                    <hr />
                </div>

                <div className="connectme__user-request__container-content" style={{ overflowY: data.length > 6 && "scroll" }}>
                    {
                        data.map((d, i) => (
                            <div className="connectme__user-request__container-content__item" key={d.username}>
                                <div className="left">
                                    <div className="left__left">
                                        <h3>{i + 1}.</h3>
                                    </div>
                                    <div className="left__right">
                                        <h3>{d.username}</h3>
                                        <span>{d.email}</span>
                                    </div>
                                </div>
                                <div className="right">
                                    <motion.div className="right__check" whileHover={{ scale: 1.1 }} onClick={() => acceptRequest(d.email)}>
                                        <AiOutlineCheck />
                                    </motion.div>
                                    <motion.div className="right__wrong" whileHover={{ scale: 1.1 }} onClick={() => rejectRequest(d.id)}>
                                        <FaTimes />
                                    </motion.div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
            <div className='connectme__user-request__close'>
                <motion.div className="close" whileTap={{ scale: 1.1 }} onClick={() => setModal(false)}>
                    <FaTimes />
                </motion.div>
            </div>
        </div>
    )
}

export default Request