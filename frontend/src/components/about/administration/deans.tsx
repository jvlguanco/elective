import React, { useState, useEffect } from "react";
import axios from "axios";

const Deans = () => {
  const [colleges, setColleges] = useState([]);
  const [deans, setDeans] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollegesAndDeans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/about/college");
        const activeColleges = response.data.active;

        setColleges(activeColleges);

        const deansData = {};
        for (const college of activeColleges) {
          const res = await axios.get("http://localhost:5000/about/deans", {
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
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full pt-8 pr-12">
      <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[32px] text-navy-blue">
        DEANS
      </h1>

      {colleges.map((college) => (
        <div key={college.college_id} className="pb-2 border-b-2 border-gray-400">
          <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-2">
            {college.college_name}
          </h2>

          <div className="grid grid-cols-3 gap-6 mt-12">
            {deans[college.college_id]?.map((dean) => (
              <div key={dean.id} className="flex flex-col items-center">
                <img
                  src={`http://localhost:5000/${dean.image}` || "/images/temp.png"}
                  alt={`${dean.name}`}
                  className="w-4/6 h-4/5 object-cover"
                />
                <p className="font-semibold mt-2">{dean.name}</p>
                <p className="text-gray-500">{dean.title}</p>
                <p className="text-gray-400 text-sm">{dean.email}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Deans;