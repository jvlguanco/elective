import AcademicSidebar from "../../components/academics/sidebar";

const Academics = ({location}) => {
    return (
        <div className="w-full">
            <div className="relative w-full h-72">
                <img src="/images/background.jpg"  alt="" className="w-full h-full  object-cover object-[center_30%]"/>
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65"></div>
                <span className="absolute bottom-10 left-24 font-inter text-white font-bold text-[36px] pl-9 border-l-4 border-yellow-500">
                    ACADEMICS
                </span>
            </div>

            <AcademicSidebar route={location}/>
        </div>
    )
}

export default Academics;