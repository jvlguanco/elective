const Hymn = () => {
    return (
        <div className="w-full pt-8 px-4 md:pr-12 md:pl-0">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[24px] md:text-[32px] text-navy-blue">
                University Hymn
            </h1>

            <h2 className="font-inter font-semibold text-[20px] md:text-[24px] text-navy-blue mt-2">
                PLM Hymn
            </h2>

            <p className="mt-2 mb-6 text-sm md:text-base">
                Music helps unite the PLM community. Every Monday and official school activity, students, faculty, and staff alike sing in unison the “Pamantasang Mahal”, PLM’s official hymn.<br /><br />

                <b>Lyrics:</b> Gatpuno Antonio J. Villegas, Mayor of Manila (1968) Lyrics presented to the Board of Regents in Maharnilad (official name of the famous Manila City Hall).<br /><br />

                <b>Music:</b> Prof. Felipe Padilla de Leon
            </p>

            <div className="w-full aspect-w-16 aspect-h-9 mb-6">
                <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/nMfcZ3EadlQ"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
            </div>

            <h2 className="font-inter font-semibold text-[20px] md:text-[24px] text-navy-blue mt-6">
                Pamantasang Mahal
            </h2>

            <p className="mt-4 mb-12 text-sm md:text-base">
                Pamantasan, Pamantasang Mahal <br />
                Nagpupugay kami't nag-aalay<br />
                Ng Pag-ibig, taos na paggalang<br />
                Sa patnubay ng aming isipan.<br /><br />

                Karunungang tungo'y kaunlaran<br />
                Hinuhubog kaming kabataan<br />
                Maging Pilipinong mero'ng dangal<br />
                Puso'y tigib ng kadakilaan.<br /><br />

                Pamantasang Lungsod ng Maynila<br />
                Kaming lahat dito'y iyong punla<br />
                Tutuparin pangarap mo't nasa<br />
                Pamantasan kami'y nanunumpa.<br />
                Pamantasan kami'y nanunumpa.
            </p>
        </div>
    );
};

export default Hymn;