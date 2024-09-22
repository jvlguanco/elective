const AboutText = () => {
    return (
        <div className="w-1/2 h-[550px] px-10 py-4 flex flex-col gap-4">
            <h1 className="font-inter text-[42px] font-semibold">About the University</h1>

            <p className="font-istok">Pamantasan ng Lungsod ng Maynila (PLM) is the first and only chartered and autonomous university funded by a city government. It was created by the Congress of the Philippines by virtue of Republic Act No. 4196 or “An Act Authorizing the City of Manila to Establish and Operate the University of City of Manila” on June 19, 1965
            </p>

            <p className="font-istok">The university first opened its gates on July 17, 1967 to 556 first-year students at its campus in the historic Intramuros district, which served as the seat of power during the Spanish occupation. Currently, about 10,000 graduate and post-graduate students grace its halls to receive PLM’s quality education.</p>

            <div className="bg-custom-blue px-4 py-2 rounded-full flex items-center justify-center w-fit font-inter font-semibold text-white">
                READ MORE
            </div>
        </div>
    )
}

export default AboutText