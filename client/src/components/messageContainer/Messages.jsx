import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useMessageRequests from '../../services/useMessageRequests'
import { useSelector } from 'react-redux'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import useListenMessages from '../../services/useListenMessages'

const Messages = ({recieverId}) => {
  const {getMessagesApi} =useMessageRequests()
  const {messages,loading} =useSelector(state=> state.message)
    const lastMessageRef = useRef();

    useEffect(()=>{
      setTimeout(()=>{
        lastMessageRef.current?.scrollIntoView({behavior:'smooth'});
      },100)
    },[messages])



  useEffect(()=>{
    console.log('messages rendered!')
    getMessagesApi(recieverId)
  },[recieverId])

  useListenMessages(recieverId);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {
        loading? 
        <>
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
        </>
        :
        messages?.length < 1 ?
        <p className='text-center text-sm my-4'>Send a message to start a conversation!</p>
        :
        messages?.map((message,idx)=>{
          return <div key={message?._id} ref={lastMessageRef}>
            <Message  message={message} isLastIdx={idx == messages.length - 1 ? true :false} />
          </div>

        })
      }
        

    </div>
  )
}

export default Messages