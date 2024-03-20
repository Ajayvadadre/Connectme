import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../../src/components'
import PopupModal from '../../src/components/modal/Popup'

const Confirm = () => {
    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState({})
    const router = useRouter()
    const query = router.query
    

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("UserAuth"))

        if (!data?.existingUser) {
            router.push("/login")
        }

    }, [query, modal, modalData])
    if (query?.isVerified) {
        router.push("/?generateprofile=true")
    }

    useEffect(() => {
        if (query?.confirmyourmail) {
            setModal(true)
            setModalData({ ...modal, message: "Confirmation Mail Has Been Send to Your Email , Please Verify.", title: "Confirmation Mail", success: true })
        }
        if (query?.isVerified) {
            setModal(true)
            setModalData({ ...modal, message: "Verification Completed, Redirection to Home Page.", title: "Verification Completed", success: true })
        }
    }, [modal, query])

    
    return (
        <Layout title={"confirm your email"}>
            {
                modal && (
                    <PopupModal {...modalData} setModal={setModal} />
                )
            }

        </Layout>
    )
}

export default Confirm