import Sidebar from "../components/sidebar";
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import AboutEdit from "../components/home/about";

const Home = () => {
    return (
        <div className="w-full flex">
           <Sidebar/>

           <div className="px-12 py-6 w-5/6">
                <Routes>
                    <Route path="/" element={<AboutEdit/>}/>
                </Routes>
           </div>
        </div>
    )
}

export default Home;