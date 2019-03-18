import React from 'react'
import './Classroom.scss'

const Classroom =()=>{
    return(
        <div className='classroom_main'>
            <div className='video_qchat_container'>
                <div className='video_container'>
                    Video
                </div>
                <div className='qchat_container'>
                    Qchat
                </div>
            </div>
            <div className='bonus_description_container'>
                <div className='description_container'>
                    Lecture Description 
                </div>
                <div className='bonus_container'>
                    Bonus
                </div>
            </div>
        </div>
    )
}

export default Classroom