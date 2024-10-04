import EventIcon from '@mui/icons-material/Event';

const AnnouncementSection = () => {
    return(
        <div className="px-12 mt-10 flex gap-12 justify-between items-center h-fit">
            <div className="w-1/2 h-[625px]">
                <h1 className="font-inter text-navy-blue font-bold text-[28px]">
                    LATEST NEWS
                </h1>

                <img src="./images/background.jpg" alt=""  className="w-full h-[450px] object-cover"/>

                <h3 className="font-inter font-bold text-[22px]">
                    Title of the Latest Article Here
                </h3>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis cumque maiores pariatur omnis magnam, a dolores eligendi odit recusandae, at, nihil ut! Repudiandae commodi magnam quasi nemo rerum, explicabo quia iste, suscipit earum odio cumque, aliquid mollitia laboriosam veritatis non.
                </p>

                <div className="w-full flex justify-end items-center gap-2">
                    <EventIcon style={{ fontSize: 20, color: 'black' }}/>

                    <p className="font-[18px]">September 20, 2024</p>
                </div>
            </div>

            <div className="w-1/2 h-[625px]">
                <h1 className="font-inter text-navy-blue font-bold text-[28px]">
                    HIGHLIGHTED NEWS
                </h1>

                <div className='w-full h-[175px] flex mb-4 gap-6 pb-4 border-b-2 border-black'>
                    <img src="./images/background.jpg" className="w-1/4 h-full object-cover"/>

                    <div className='w-full flex flex-col justify-between'>
                        <div>
                            <h3 className="font-inter font-bold text-[18px]">
                                Title of the Latest Article Here
                            </h3>

                            <p className='text-[15px]'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis cumque maiores pariatur omnis magnam, a dolores eligendi odit recusandae, at, nihil ut! Repudiandae commodi magnam quasi nemo rerum, explicabo quia iste, suscipit earum odio cumque, aliquid mollitia laboriosam veritatis non.
                            </p>
                        </div>

                        <div className='flex justify-between w-full'>
                            <div className='font-inter font-semibold'>Read More</div>

                            <div className="flex justify-end items-center gap-2">
                                <EventIcon style={{ fontSize: 20, color: 'black' }}/>

                                <p className="font-[18px]">September 20, 2024</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full h-[175px] flex mb-4 gap-6 pb-4 border-b-2 border-black'>
                    <img src="./images/background.jpg" className="w-1/4 h-full object-cover"/>

                    <div className='w-full flex flex-col justify-between'>
                        <div>
                            <h3 className="font-inter font-bold text-[18px]">
                                Title of the Latest Article Here
                            </h3>

                            <p className='text-[15px]'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis cumque maiores pariatur omnis magnam, a dolores eligendi odit recusandae, at, nihil ut! Repudiandae commodi magnam quasi nemo rerum, explicabo quia iste, suscipit earum odio cumque, aliquid mollitia laboriosam veritatis non.
                            </p>
                        </div>

                        <div className='flex justify-between w-full'>
                            <div className='font-inter font-semibold'>Read More</div>

                            <div className="flex justify-end items-center gap-2">
                                <EventIcon style={{ fontSize: 20, color: 'black' }}/>

                                <p className="font-[18px]">September 20, 2024</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full h-[175px] flex mb-4 gap-6 pb-4 border-b-2 border-black'>
                    <img src="./images/background.jpg" className="w-1/4 h-full object-cover"/>

                    <div className='w-full flex flex-col justify-between'>
                        <div>
                            <h3 className="font-inter font-bold text-[18px]">
                                Title of the Latest Article Here
                            </h3>

                            <p className='text-[15px]'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis cumque maiores pariatur omnis magnam, a dolores eligendi odit recusandae, at, nihil ut! Repudiandae commodi magnam quasi nemo rerum, explicabo quia iste, suscipit earum odio cumque, aliquid mollitia laboriosam veritatis non.
                            </p>
                        </div>

                        <div className='flex justify-between w-full'>
                            <div className='font-inter font-semibold'>Read More</div>

                            <div className="flex justify-end items-center gap-2">
                                <EventIcon style={{ fontSize: 20, color: 'black' }}/>

                                <p className="font-[18px]">September 20, 2024</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    Button Here
                </div>
                
                
            </div>
        </div>
    );
}

export default AnnouncementSection