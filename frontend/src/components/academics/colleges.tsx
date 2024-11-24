import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParagraphWithNewlines = ({ text }: { text: string }) => {
    return (
        <p className="font-istok">
            {text.split('\n').map((line, index) => (
                <span key={index}>
                    {line}
                    <br />
                </span>
            ))}
        </p>
    );
};

const CollegeTemplate = ({ id }: { id: string }) => {
    const [collegeData, setCollegeData] = useState<any>(null);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get('http://localhost:5000/about/college')
            .then((response) => {
                const { active, inactive } = response.data;

                const allColleges = [...active, ...inactive];
                const selectedCollege = allColleges.find(college => college.college_id === id);

                if (selectedCollege) {
                    setCollegeData(selectedCollege);
                } else {
                    setError('College not found.');
                }
            })
            .catch((err) => {
                setError('Error fetching data');
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (collegeData) {
            fetchCourses(collegeData.college_id);
        }
    }, [collegeData]);

    const fetchCourses = async (collegeId: string) => {
        setLoading(true); // Optional: Show loading while fetching courses
        try {
            const response = await axios.get(`http://localhost:5000/academic/courses?college_id=${collegeId}`);
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const { college_name, description, history, vision, mission, objectives } = collegeData;

    return (
        <div className="w-full pt-8 pr-12">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[32px] text-navy-blue">
                {college_name}
            </h1>

            <div className="mt-4">
                <ParagraphWithNewlines text={description || "No description provided"} />
            </div>

            <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-8">
                History
            </h2>
            <div className="mt-4">
                <ParagraphWithNewlines text={history || "No history provided"} />
            </div>

            <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-8">
                Vision
            </h2>
            <div className="mt-4">
                <ParagraphWithNewlines text={vision || "No vision provided"} />
            </div>

            <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-8">
                Mission
            </h2>
            <div className="mt-4">
                <ParagraphWithNewlines text={mission || "No mission provided"} />
            </div>

            <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-8">
                Objectives
            </h2>
            <ul className="mt-4 list-disc pl-6">
                {objectives && objectives.length > 0 ? (
                    objectives.map((objective: string, index: number) => (
                        <li key={index}>{objective}</li>
                    ))
                ) : (
                    <li>No objectives provided</li>
                )}
            </ul>

            <h2 className="font-inter font-semibold text-[24px] text-navy-blue mt-8">
                Offered Courses
            </h2>
            <ul className="mt-4 list-disc pl-6">
                {courses && courses.length > 0 ? (
                    courses.map((course: any, index: number) => (
                        <li key={index}>{course.course_name}</li>
                    ))
                ) : (
                    <li>No courses provided</li>
                )}
            </ul>
        </div>
    );
};

export default CollegeTemplate;