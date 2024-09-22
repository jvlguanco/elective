const Compilation = () => {
    return (
        <div className="w-2/3 flex items-center justify-center relative">

            <img src="./images/designs/Frame.png" alt="Background" className="absolute w-32 h-32 object-cover top-0 left-40 z-[-1]" />

            <div className="flex flex-col gap-1">
                <div className="flex gap-1 h-56">
                    <div className="w-2/3">
                        <img src="./images/image3.jpg" alt="description" className="object-cover h-full w-full" />
                    </div>
                    <div className="w-1/3">
                        <img src="./images/image3.jpg" alt="description" className="object-cover h-full w-full" />
                    </div>
                </div>

                <div className="flex gap-1 h-56">
                    <div className="w-1/2">
                        <img src="./images/image3.jpg" alt="description" className="object-cover h-full w-full" />
                    </div>
                    <div className="w-1/2">
                        <img src="./images/image3.jpg" alt="description" className="object-cover h-full w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compilation