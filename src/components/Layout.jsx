import React from 'react'
import Head from 'next/head'
import { Navbar, Footer } from '.'

const Layout = ({ title, children, description, navbar = true, edit, footer = false, setShare, ogImg = "", setShowRequesList, setSearchBar, view = false ,tab={}}) => {
    
    const likeHandler = () => {
        const data = JSON.parse(localStorage.getItem("UserAuth"))?.existingUser;
        dispatch(likeProfile(profileData?._id, data?._id));
      };
      
    return (
        <>
            <Head>
                <title>{title ? `${title} - ConnectMe` : 'ConnectMe'}</title>
                {description && <meta name='description' content={description} />}
            </Head>
            {
                footer && (
                    <Footer edit={edit} setShare={setShare} setShowRequesList={setShowRequesList} setSearchBar={setSearchBar} view={view} likeHandler={likeHandler} />
                )
            }
            {navbar && (
                <Navbar />
            )}
            <main>
                {children}
            </main>

        </>
    )
}

export default Layout