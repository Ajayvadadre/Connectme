import { useEffect } from 'react'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { useDispatch } from 'react-redux'
import getCroppedImg from '../../../lib/crop'
import axios from 'axios'
import Modal from './Modal'
import { updateSubDocInProfileById, addImageInProfile, updateProfile } from '../../../redux/action/Profile'

const Crop = ({ img, w, h, setcroppedUrl, setModal, data,setshowProgress,setProgress,setshowLoading }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const [croppedUrl, setCroppedUrl] = useState("")

    const [previeModal, setPrevieModal] = useState(false)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    // upload config
    const dispatch = useDispatch()
    const [runFunc, setRunFunc] = useState(false)

    // upload handler


    const onClickHandler = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(img, croppedAreaPixels)
            setCroppedUrl(croppedImage)
            setCroppedImage(croppedImage)
            setRunFunc(true)
        } catch (error) {
            console.log({ error })
        }
        // setModal(false)
    })
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser
        const profile = JSON.parse(localStorage.getItem("profile"))?.data
    
        const file = new FormData()
    
        file.append('file', croppedUrl)
        file.append('upload_preset', 'profile')

        if (croppedUrl && runFunc) {
            axios.post("https://api.cloudinary.com/v1_1/redwine/image/upload", file,{
                onUploadProgress: function (progressEvent) {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setshowLoading(true)
                    setshowProgress(true)
                    setProgress(percentCompleted)
                }
            }).then((res) => {
                dispatch(updateProfile({ userId: user?._id, data: { [data?.name]: res.data.secure_url } }, profile?._id))
            })

            setRunFunc(false)
            setModal(false)
        }
        
    }, [zoom, croppedAreaPixels, runFunc,croppedImage, previeModal, croppedUrl])

    // const newUrl = croppedImage && URL.createObjectURL(croppedImage)

    const onCancel = () => {
        setCroppedImage(null)
        setModal(false)
    }

    return (
        <div className="connectme__cropper">
            <div className="connectme__cropper-action">
                <div className="upload" onClick={onClickHandler}>
                    <h2>Crop & Upload</h2>
                </div>
                {/* <div className="crop" onClick={preview}>
                    <h2>Preview</h2>
                </div> */}
                <div className="cancel" onClick={onCancel}>
                    <h2>Cancel</h2>
                </div>
            </div>
            <div className="connectme__cropper-container">
                <Cropper
                    image={img}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onZoomChange={setZoom}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    cropSize={{ width: w, height: h }}
                />
            </div>

        </div>
    )
}

export default Crop