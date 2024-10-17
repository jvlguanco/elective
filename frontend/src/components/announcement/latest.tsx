import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import EventIcon from '@mui/icons-material/Event';

const LatestAnnouncements = () => {
    const cardDataList = [
        { title: 'Card 1', description: 'This is the first card' },
        { title: 'Card 2', description: 'This is the second card' },
        { title: 'Card 3', description: 'This is the third card' },
        { title: 'Card 4', description: 'This is the fourth card' },
        { title: 'Card 1', description: 'This is the first card' },
        { title: 'Card 2', description: 'This is the second card' },
        { title: 'Card 3', description: 'This is the third card' },
        { title: 'Card 4', description: 'This is the fourth card' },
        { title: 'Card 1', description: 'This is the first card' },
        { title: 'Card 2', description: 'This is the second card' },
        { title: 'Card 3', description: 'This is the third card' },
        { title: 'Card 4', description: 'This is the fourth card' },
      ];

    
    return (
        <div className='w-full flex justify-center items-center'>
            <div className="grid grid-cols-3 gap-20 p-4 w-fit">
            {cardDataList.map((card, index) => (
                <div className="shadow-xl rounded-lg w-[375px] h-[425px] overflow-hidden flex flex-col">
                    <img src="./images/background.jpg" alt="" className='h-[200px] w-full object-cover'/>

                    <div className='w-full h-[225px] p-4 flex flex-col justify-between'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='font-inter font-semibold text-[16px]'>Learning is a lifelong journey, filled with opportunities to grow, change, and excel.</h1>

                            <p className='text-[14px] line-clamp-4 overflow-hidden text-ellipsis'>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aspernatur unde possimus cumque. Itaque saepe ipsum accusantium commodi placeat hic amet quam numquam quia magni ullam dolores earum iste, id praesentium dolorum assumenda fugit quae facere fugiat voluptates. Voluptate accusamus qui at, ad ipsum ab cupiditate. Eius sunt minus error dolores dicta harum quod corporis voluptatibus numquam tenetur, aliquam repudiandae unde qui optio! Numquam vel culpa rem quia odit? Eaque incidunt impedit consequuntur at quam inventore facere quae culpa. Repellendus autem, veritatis ducimus nam quae velit veniam sunt nemo sit.
                            </p>
                        </div>

                        <div className='flex justify-between'>
                            <span
                                className="text-red-600 cursor-pointer hover:underline font-inter font-semibold text-[14px]"
                                onClick={() => console.log()}
                            >
                                View Post
                            </span>
            
                            <div className='flex gap-4 items-center justify-center'>
                                <EventIcon style={{ fontSize: 20, color: 'black' }} />
                                <p className="text-[14px] font-inter">Date Here</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            ))}
            </div>
        </div>
      );
}

export default LatestAnnouncements;