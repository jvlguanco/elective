import Carousel from "../../components/carousel";

const images = [
    './images/carousel/image1.jpg',
    './images/carousel/image2.jpg',
    './images/carousel/image1.jpg',
    './images/carousel/image2.jpg',
    './images/carousel/image1.jpg',
    './images/carousel/image2.jpg',
    './images/carousel/image1.jpg',
    './images/carousel/image2.jpg',
];

const Home = () => {
    return (
        <div>
            <Carousel images={images}/>
        </div>
    )
}

export default Home;