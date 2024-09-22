import Carousel from "../../components/carousel";
import Compilation from "../../components/home/about/pictures";
import AboutText from "../../components/home/about/text";
import EventIcon from '@mui/icons-material/Event';

const images = [
    './images/image3.jpg',
    './images/image3.jpg',
    './images/image3.jpg',
];

const Home = () => {
    return (
        <div>
            <div className="relative w-full h-screen overflow-hidden">
                <img src="./images/image3.jpg" alt="" className='h-full w-full object-cover absolute' />
                <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-0"></div>

                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between z-10 pt-52 pb-28">
                    <div className="flex flex-col justify-center items-center gap-6">
                        <img src="./images/Logo.png" alt="" className="h-72 w-72"/>
                        <div className="flex items-center justify-center flex-col text-white gap-1">
                            <h1 className="text-2xl font-serif font-medium">PAMANTASAN NG LUNGSOD NG MAYNILA</h1>
                            <h2 className="text-lg font-light font-inter">University of the City of Manila</h2>
                            <h3 className="text-base font-thin font-inter">Karunungan, Kaunlaran and Kadakilaan</h3>
                        </div>
                    </div>

                    <div className="mb-12 bg-red-800 text-white px-4 py-2 rounded-full">
                        APPLY NOW
                    </div>
                </div>
            </div>
            
            <div className="flex w-full mt-10">
                <Compilation/>
                <AboutText/>
            </div>

            <div className="mt-10">
                <Carousel images={images}/>
            </div>

            <div className="mt-10 w-full h-fit text-navy-blue flex flex-col gap-4">
                <h1 className="font-inter text-[42px] font-semibold mx-24 w-full">ANNOUNCEMENTS</h1>
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

            <div className="mt-10 w-full h-auto text-navy-blue">
                <h1 className="font-inter text-[42px] font-semibold mx-24 w-full">LANDMARKS</h1>
            </div>
            

        </div>
    )
}

export default Home;