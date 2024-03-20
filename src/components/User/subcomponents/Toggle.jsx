

import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../../redux/action/Profile';
import Tooltip from '@mui/material/Tooltip';

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 60,
    height: 34,

    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(27px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 28,
        height: 28,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#e50000' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const ToggleSwitch = ({ apiId, profileId, profile, isPrivate = false, info = false, title ,audition=false}) => {
    const dispatch = useDispatch()

    useEffect(() => {

    }, [dispatch])

    
    const onClickHandler = () => {
        const user = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser

        if (isPrivate) {
            dispatch(updateProfile({ userId: user?._id, data: { isPrivate: !profile.isPrivate } }, profileId))
        } else if (info){
            dispatch(updateProfile({ userId: user?._id, data: { ["userInfo.access"]: !profile.userInfo.access }}, profileId))
        } else {
            const data = audition ? (profile?.audition?.active ? false : true ):(  profile?.document?.active ? false : true)
            dispatch(updateProfile({ userId: user?._id, data: { [apiId.toString()]: data } }, profileId))
        }
        // setHandler(!data)
    }

    const checked =  isPrivate ? profile?.isPrivate : info ? profile?.userInfo?.access : audition ? profile?.audition?.active : profile?.document?.active
    
    
    return (
        <FormGroup>
            {title ? (
                <Tooltip title={title} arrow placement="top-start">
                    <FormControlLabel
                        control={<IOSSwitch sx={{ m: 2 }} defaultChecked={ checked } />}
                        label=""
                        onClick={onClickHandler}
                    />
                </Tooltip>
            ) : (
                <FormControlLabel
                    control={<IOSSwitch sx={{ m: 2 }} defaultChecked={checked} />}
                    label=""
                    onClick={onClickHandler}
                />
            )}
        </FormGroup>
    );
}
export default ToggleSwitch