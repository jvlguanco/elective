import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Graduate = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCollegesAndCourses = async () => {
        try {
            setLoading(true);

            const collegeResponse = await axios.get(`${import.meta.env.VITE_API_ROOT}/about/college`);
            const allColleges = collegeResponse.data.active;

            const filteredColleges = [];

            for (const college of allColleges) {
                const courseResponse = await axios.get(
                    `${import.meta.env.VITE_API_ROOT}/academic/courses?college_id=${college.college_id}`
                );

                const graduateCourses = courseResponse.data.filter(course => course.is_graduate === 1);

                if (graduateCourses.length > 0) {
                    filteredColleges.push({
                        ...college,
                        courses: graduateCourses,
                    });
                }
            }

            setColleges(filteredColleges);
        } catch (error) {
            console.error("Error fetching colleges or courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollegesAndCourses();
    }, []);

    return (
        <div className="w-full pt-8 px-4 md:px-12">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[24px] md:text-[32px] text-navy-blue">
                Office for Graduates and Professional Studies
            </h1>
            {loading ? (
                <div className="flex justify-center items-center pt-8">
                    <p className="text-gray-500 font-semibold">Loading...</p>
                </div>
            ) : (
                <div className="space-y-8 mt-6">
                    {colleges.length === 0 ? (
                        <p className="text-gray-500 font-semibold">No graduate colleges found.</p>
                    ) : (
                        colleges.map(college => (
                            <div key={college.college_id} className="border-b pb-4">
                                <h2 className="font-inter font-semibold text-[20px] md:text-[24px] text-navy-blue mt-6">
                                    {college.college_name}
                                </h2>
                                <ul className="list-disc pl-6 md:pl-8 mt-2 space-y-1">
                                    {college.courses.map(course => (
                                        <li key={course.course_id} className="text-gray-700 text-sm md:text-base">
                                            <span className="font-medium">{course.course_name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Graduate;