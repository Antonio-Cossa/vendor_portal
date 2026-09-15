import { useState, useEffect } from 'react'
import spiner from './loadding2.svg'
import styled from 'styled-components'


export default function Loading() {
    const [text, setText] = useState('')
    const [showImg, setShowImg] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShowImg(false)
            setText("Service OFFLINE")
        }, 260000)
    }, [])

    return (
        <>
            {
                showImg ? (
                    <Wrapper className='loadding-cont'>
                        <img src={spiner} className='loading' alt="" />
                    </Wrapper>) : (<h3>{text}</h3>)
            }
        </>
    )
}

const Wrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background:  none !important;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999999999;
    
    img {
    height: 250px;
    width: 250px;
}
`


