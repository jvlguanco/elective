import React, { useState, useEffect } from "react";
import axios from "axios";

const Deans = () => {
  const [colleges, setColleges] = useState([]);
  const [deans, setDeans] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollegesAndDeans = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_ROOT}/about/college`);
        const activeColleges = response.data.active;

        setColleges(activeColleges);

        const deansData = {};
        for (const college of activeColleges) {
          const res = await axios.get(`${import.meta.env.VITE_API_ROOT}/about/deans`, {
            params: { office_id: college.college_id },
          });
          deansData[college.college_id] = res.data.active;
        }

        setDeans(deansData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching colleges or deans:", error);
      }
    };

    fetchCollegesAndDeans();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center pt-8">
        <p className="text-gray-500 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full pt-8 px-4 md:pr-12 md:pl-0">
      <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[24px] md:text-[32px] text-navy-blue">
        DEANS
      </h1>

      {colleges.map((college) => (
        <div key={college.college_id} className="pb-6 border-b-2 border-gray-400 mt-6">
          <h2 className="font-inter font-semibold text-[20px] md:text-[24px] text-navy-blue">
            {college.college_name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {deans[college.college_id]?.map((dean) => (
              <div key={dean.id} className="flex flex-col items-center">
                <img
                  src={`${import.meta.env.VITE_API_ROOT}/${dean.image}` || "/images/temp.png"}
                  alt={`${dean.name}`}
                  className="w-32 h-40 md:w-48 md:h-60 object-cover"
                />
                <p className="font-semibold mt-2 text-center">{dean.name}</p>
                <p className="text-gray-500 text-sm md:text-base text-center">{dean.title}</p>
                <p className="text-blue-500 text-sm md:text-base text-center">{dean.email}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Deans;