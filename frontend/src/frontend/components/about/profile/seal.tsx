const Seal = () => {
    return (
        <div className="w-full pt-8 px-4 md:pr-12 md:pl-0">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[24px] md:text-[32px] text-navy-blue">
                SEAL AND SYMBOLS
            </h1>

            <div className="w-full flex justify-center items-center mt-4">
                <img src="/images/Logo.png" alt="PLM Logo" className="w-48 h-48 md:w-96 md:h-96" />
            </div>

            <p className="mt-4 mb-8 text-sm md:text-base">
                When a new president is inducted in the university, he or she receives two precious symbols of the university, namely the Mace and the Academic Collar.
            </p>

            <h2 className="font-inter font-semibold text-[20px] md:text-[24px] text-navy-blue">
                Academic Collar
            </h2>

            <p className="mt-4 mb-8 text-sm md:text-base">
                The Academic Collar, which bears the seal of the PLM as its gold pendant, is the first symbol bequeathed to the president during the investiture rites. By wearing it, President Leyco has accepted to carry on his shoulder the academic leadership necessary to fulfill PLM’s mission and vision.
            </p>

            <h2 className="font-inter font-semibold text-[20px] md:text-[24px] text-navy-blue">
                Mace
            </h2>

            <p className="mt-4 mb-8 text-sm md:text-base">
                The Mace symbolizes the authority of the president, the source of his power to administer the university. <br /><br />

                It was presented first to Dr. Benito F. Reyes, the first PLM president, by then-Mayor Antonio J. Villegas on February 10, 1968. It has been recently turned over by the Chairperson to current President.
            </p>
        </div>
    );
};

export default Seal;