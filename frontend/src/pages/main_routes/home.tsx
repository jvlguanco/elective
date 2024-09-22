import Carousel from "../../components/carousel";
import Compilation from "../../components/home/about/pictures";
import AboutText from "../../components/home/about/text";

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
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
            </div>
            

            <div className="flex justify-around items-center gap-7 pr-6 pl-6">
                <Compilation/>
                <AboutText/>
            </div>

            <Carousel images={images}/>
        </div>
    )
}

export default Home;