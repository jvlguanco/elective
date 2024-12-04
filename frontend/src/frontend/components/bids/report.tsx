import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

interface Project {
    id: number;
    title: string;
    file: string;
}

const Report = () => {
    const [projects, setProjects] = useState<{ items: Project[] }>({ items: [] });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const itemsPerPage = 10;

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_ROOT}/bid/project-monitoring`);
            setProjects({ items: res.data });
        } catch (err) {
            console.error(err);
            alert('Error fetching projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected);
    };

    const displayItems = (items: Project[], page: number) =>
        items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <div className="w-full pt-8 px-4 md:px-12">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[24px] md:text-[32px] text-navy-blue mb-6">
                Project Monitoring Report
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500 font-semibold">Loading...</p>
                </div>
            ) : (
                <>
                    {projects.items.length > 0 ? (
                        <div className="mb-6">
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="p-2 border border-gray-300 text-sm md:text-base">Report Description</th>
                                        <th className="p-2 border border-gray-300 text-sm md:text-base">File</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayItems(projects.items, page).map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="p-2 border border-gray-300 text-sm md:text-base">{item.title}</td>
                                            <td className="p-2 border border-gray-300 text-sm md:text-base">
                                                <a
                                                    href={`${import.meta.env.VITE_API_ROOT}/${item.file}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:text-blue-600"
                                                >
                                                    View Report
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {projects.items.length > itemsPerPage && (
                                <ReactPaginate
                                    previousLabel={'«'}
                                    nextLabel={'»'}
                                    breakLabel={'...'}
                                    pageCount={Math.ceil(projects.items.length / itemsPerPage)}
                                    onPageChange={handlePageChange}
                                    containerClassName={'flex justify-center mt-4 space-x-2'}
                                    activeClassName={'font-bold text-blue-600'}
                                    pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
                                />
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-500 font-semibold mt-4">No project monitoring reports available.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Report;