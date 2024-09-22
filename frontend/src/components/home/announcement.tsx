import EventIcon from '@mui/icons-material/Event';

const AnnouncementSection = () => {
    return(
        <div className="mt-10 w-full h-fit flex flex-col gap-4">
            <h1 className="font-inter text-[42px] font-semibold mx-24 w-full text-navy-blue">ANNOUNCEMENTS</h1>
            <div className="bg-navy-blue w-full h-[26rem] flex items-center justify-center gap-12">
                <div className="h-4/5 w-[28rem] flex flex-col gap-4">
                    <img src="./images/image3.jpg" alt="" className="w-full h-[14.4rem] object-cover"/>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-white font-semibold text-lg font-inter">HEADLINE</h1>

                        <div className="flex gap-2 items-center">
                            <EventIcon style={{ fontSize: 18, color: 'white' }}/>
                            <h3 className="text-white font-istok text-[15px]">September 22, 2024</h3>
                        </div>

                        <h4 className="text-yellow-500 font-inter text-[15px]">Read More...</h4>
                    </div>
                </div>

                <div className="h-4/5 w-[28rem] flex flex-col gap-4">
                    <img src="./images/image3.jpg" alt="" className="w-full h-[14.4rem] object-cover"/>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-white font-semibold text-lg font-inter">HEADLINE</h1>

                        <div className="flex gap-2 items-center">
                            <EventIcon style={{ fontSize: 18, color: 'white' }}/>
                            <h3 className="text-white font-istok text-[15px]">September 22, 2024</h3>
                        </div>

                        <h4 className="text-yellow-500 font-inter text-[15px]">Read More...</h4>
                    </div>
                </div>

                <div className="h-4/5 w-[28rem] flex flex-col gap-4">
                    <img src="./images/image3.jpg" alt="" className="w-full h-[14.4rem] object-cover"/>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-white font-semibold text-lg font-inter">HEADLINE</h1>

                        <div className="flex gap-2 items-center">
                            <EventIcon style={{ fontSize: 18, color: 'white' }}/>
                            <h3 className="text-white font-istok text-[15px]">September 22, 2024</h3>
                        </div>

                        <h4 className="text-yellow-500 font-inter text-[15px]">Read More...</h4>
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center justify-center">
                <div className="bg-navy-blue w-fit h-fit px-4 py-2 text-yellow-500 rounded-full font-inter font-semibold">View All</div>
            </div>
        </div>
    );
}

export default AnnouncementSection