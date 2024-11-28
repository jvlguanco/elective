import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OBE = () => {
    return (
        <div className="w-full pt-8 px-12">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[32px] text-navy-blue">
                Outcomes-Based Education (OBE)
            </h1>

            <img src="/images/obe-1.jpg" alt="" />
            <img src="/images/obe-2.jpg" alt="" />
        </div>
    );
};

export default OBE;