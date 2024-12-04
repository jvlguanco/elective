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

    return (
        <div className="w-full">
            <div className="relative w-full h-56 md:h-80">
                <img 
                    src="/images/background.jpg"  
                    alt="Background" 
                    className="w-full h-full object-cover object-[center_30%]" 
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-65"></div>
                <span 
                    className="absolute bottom-4 left-4 md:bottom-10 md:left-16 font-inter text-white font-bold text-2xl md:text-4xl border-l-4 pl-3 md:pl-6 border-yellow-500"
                >
                    CAREERS
                </span>
            </div>

            <div className="px-4 sm:px-8 md:px-16 mt-4">
                {displayCareers.map((career) => (
                    <div 
                        key={career.id}
                        className="w-full border border-gray-300 rounded-lg p-4 mb-4 shadow-sm bg-white"
                    >
                        <h2 className="font-inter font-bold text-lg text-navy-blue mb-2">
                            {career.title}
                        </h2>

                        <p className="text-sm text-gray-700">
                            <b>Position/s:</b> {career.position}
                        </p>

                        <p className="text-sm text-gray-700">
                            <b>Estimated Salary:</b> ₱{career.min_salary} - ₱{career.max_salary}
                        </p>

                        <p className="text-sm text-gray-700">
                            <b>Requesting Department:</b> {career.department}
                        </p>
                        
                        <a
                            href={`${import.meta.env.VITE_API_ROOT}/${career.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block text-blue-600 underline text-sm"
                        >
                            View Details
                        </a>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {careers.length > itemsPerPage && (
                <div className="mt-6 flex justify-center">
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={Math.ceil(careers.length / itemsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={'flex items-center space-x-2'}
                        activeClassName={'text-white bg-blue-600'}
                        pageClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100 text-sm"
                        pageLinkClassName="text-gray-700"
                        activeLinkClassName="text-white font-semibold"
                        previousClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100 text-sm"
                        nextClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100 text-sm"
                    />
                </div>
            )}
        </div>
    );
};

export default Career;