const CRS = () => {
    return (
        <div className="w-full">
            <div className="relative w-full h-72 md:h-96">
                <img 
                    src="/images/background.jpg"  
                    alt="Background" 
                    className="w-full h-full object-cover object-[center_30%]" 
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-65"></div>
                <span 
                    className="absolute bottom-4 left-6 md:bottom-10 md:left-24 font-inter text-white font-bold text-[24px] md:text-[36px] pl-4 md:pl-9 border-l-4 border-yellow-500"
                >
                    COMPUTERIZED REGISTRATION SYSTEM
                </span>
            </div>

            <div className="px-12 py-6 flex flex-col gap-4">
                <p>
                    Pamantasan ng Lungsod ng Maynila students may register online and access their student records using the links below:
                </p>

                <a
                    href='https://web1.plm.edu.ph/crs/'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    Undergraduate and College of Law Students
                </a>

                <a
                    href='https://web3.plm.edu.ph/crscm/'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    College of Medicine Students
                </a>

                <a
                    href='https://web2.plm.edu.ph/gsp/'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    Graduate Students
                </a>
            </div>

        </div>
    )
}

export default CRS;