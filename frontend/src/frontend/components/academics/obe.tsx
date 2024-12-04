import React from 'react';

const OBE = () => {
    return (
        <div className="w-full pt-8 px-4 md:px-12">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[24px] md:text-[32px] text-navy-blue">
                Outcomes-Based Education (OBE)
            </h1>

            <div className="mt-6 space-y-6">
                <img
                    src="/images/obe-1.jpg"
                    alt="OBE Overview"
                    className="w-full max-w-3xl mx-auto object-contain"
                />
                <img
                    src="/images/obe-2.jpg"
                    alt="OBE Framework"
                    className="w-full max-w-3xl mx-auto object-contain"
                />
            </div>
        </div>
    );
};

export default OBE;