import React, { useState, useEffect } from "react";
import axios from "axios";

const Directors = () => {
  const [offices, setOffices] = useState([]);
  const [members, setMembers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_ROOT}/about/dc-offices`);
        const activeOffices = response.data.active;

        setOffices(activeOffices);

        const membersData = {};
        for (const office of activeOffices) {
          const res = await axios.get(`${import.meta.env.VITE_API_ROOT}/about/dc-members`, {
            params: { office_id: office.id },
          });
          membersData[office.id] = res.data.active;
        }

        setMembers(membersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching offices or members:", error);
      }
    };

    fetchOffices();
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
        DIRECTORS AND CHIEFS
      </h1>

      {offices.map((office) => (
        <div key={office.id} className="pb-6 border-b-2 border-gray-400 mt-6">
          <h2 className="font-inter font-semibold text-[20px] md:text-[24px] text-navy-blue">
            {office.office_name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {members[office.id]?.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <img
                  src={`${import.meta.env.VITE_API_ROOT}/${member.image}` || "/images/temp.png"}
                  alt={`${member.name}`}
                  className="w-32 h-40 md:w-48 md:h-60 object-cover"
                />
                <p className="font-semibold mt-2 text-center">{member.name}</p>
                <p className="text-gray-500 text-sm md:text-base text-center">{member.title}</p>
                <p className="text-blue-500 text-sm md:text-base text-center">{member.email}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Directors;