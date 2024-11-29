import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';

interface CareerData {
    id: number;
    title: string;
    position: string;
    min_salary: number;
    max_salary: number;
    department: string;
    file: string;
}

const Career = () => {
    const [careers, setCareers] = useState<CareerData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 5;

    const fetchCareers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_ROOT}/career/all`);
            setCareers(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch careers');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCareers();
    }, []);

    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const displayCareers = careers ? careers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return(
        <div className="w-full">
            <div className="relative w-full h-72 mb-12">
                <img src="/images/background.jpg"  alt="" className="w-full h-full  object-cover object-[center_30%]"/>
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65"></div>
                <span className="absolute bottom-10 left-24 font-inter text-white font-bold text-[36px] pl-9 border-l-4 border-yellow-500">
                    CAREERS
                </span>
            </div>

            {displayCareers.map((career) => (
                <div className="w-full border border-gray-400 border-l-8 border-l-navy-blue py-4 px-6 flex flex-col mb-2 mx-36">
                    <h2 className="font-inter font-bold text-[20px] text-navy-blue mb-4">
                        {career.title}
                    </h2>

                    <p>
                        <b>Position/s:</b> {career.position}
                    </p>

                    <p>
                        <b>Estimated Salary:</b> ₱{career.min_salary} - ₱{career.max_salary}
                    </p>

                    <p>
                        <b>Requesting Department:</b> {career.department}
                    </p>
                    
                    <span className="cursor-pointer mt-4">
                        <a
                            href={`${import.meta.env.VITE_API_ROOT}/${career.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-700 underline"
                        >
                            View Details
                        </a>
                    </span>
                </div>
            ))}

            {careers.length > itemsPerPage && (
                <div className="mt-6 flex justify-center">
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={Math.ceil(careers.length / itemsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'flex items-center space-x-1'}
                        activeClassName={'font-bold text-blue-600'}
                        pageClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100"
                        pageLinkClassName="text-gray-700"
                        activeLinkClassName="text-blue-600 font-semibold"
                        previousClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100"
                        nextClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100"
                    />
                </div>
            )}
        </div>
    )
}

export default Career;  