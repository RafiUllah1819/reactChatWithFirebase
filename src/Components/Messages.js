import React ,{useEffect, useRef} from 'react'

export const Messages = ({messages}) => {
    const messagesEndRef = useRef(null)
    const scrollToBottom = () =>{
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }
    useEffect(()=>{
        scrollToBottom()
    },[messages])
    return (
        <div>
            <div ref={messagesEndRef} /> 
        </div>
    )
}
