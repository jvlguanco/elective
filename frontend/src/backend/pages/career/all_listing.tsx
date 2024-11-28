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

const JobTable = () => {
    const [careers, setCareers] = useState<CareerData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingCareer, setEditingCareer] = useState<CareerData | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        try {
            const response = await axios.get("${import.meta.env.VITE_API_ROOT}/career/all");
            setCareers(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch careers');
            setLoading(false);
        }
    };

    const deleteCareer = async (id: number) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_ROOT}/career/delete/${id}`);
            fetchCareers();
        } catch (error) {
            setError('Failed to delete the career listing');
        }
    };

    const startEditing = (career: CareerData) => {
        setEditingCareer(career);
        setSelectedFile(null);
    };

    const updateCareer = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingCareer) return;

        const formData = new FormData();
        formData.append('jobTitle', editingCareer.title);
        formData.append('jobPosition', editingCareer.position);
        formData.append('minSalary', editingCareer.min_salary.toString());
        formData.append('maxSalary', editingCareer.max_salary.toString());
        formData.append('department', editingCareer.department);

        if (selectedFile) {
            formData.append('pdfFile', selectedFile);
        }

        try {
            await axios.put(`${import.meta.env.VITE_API_ROOT}/career/update/${editingCareer.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setEditingCareer(null);
            fetchCareers();
        } catch (error) {
            setError('Failed to update the career listing');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const displayCareers = careers ? careers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Title</th>
                            <th className="px-4 py-2 border">Position</th>
                            <th className="px-4 py-2 border">Min Salary</th>
                            <th className="px-4 py-2 border">Max Salary</th>
                            <th className="px-4 py-2 border">Department</th>
                            <th className="px-4 py-2 border">PDF File</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayCareers.map((career) => (
                            <tr key={career.id} className="text-center border hover:bg-gray-50">
                                <td className="px-4 py-2 border">{career.id}</td>
                                <td className="px-4 py-2 border">{career.title}</td>
                                <td className="px-4 py-2 border">{career.position}</td>
                                <td className="px-4 py-2 border">₱{career.min_salary}</td>
                                <td className="px-4 py-2 border">₱{career.max_salary}</td>
                                <td className="px-4 py-2 border">{career.department}</td>
                                <td className="px-4 py-2 border">
                                    <a
                                        href={`${import.meta.env.VITE_API_ROOT}/${career.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        View PDF
                                    </a>
                                </td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => startEditing(career)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCareer(career.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200 ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
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

            {/* Edit Modal */}
            {editingCareer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Edit Career Listing</h2>
                        <form onSubmit={updateCareer}>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600">Title</label>
                                <input
                                    type="text"
                                    value={editingCareer.title}
                                    onChange={(e) =>
                                        setEditingCareer({ ...editingCareer, title: e.target.value })
                                    }
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600">Position</label>
                                <input
                                    type="text"
                                    value={editingCareer.position}
                                    onChange={(e) =>
                                        setEditingCareer({
                                            ...editingCareer,
                                            position: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600">Min Salary</label>
                                <input
                                    type="number"
                                    value={editingCareer.min_salary}
                                    onChange={(e) =>
                                        setEditingCareer({
                                            ...editingCareer,
                                            min_salary: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600">Max Salary</label>
                                <input
                                    type="number"
                                    value={editingCareer.max_salary}
                                    onChange={(e) =>
                                        setEditingCareer({
                                            ...editingCareer,
                                            max_salary: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600">Department</label>
                                <input
                                    type="text"
                                    value={editingCareer.department}
                                    onChange={(e) =>
                                        setEditingCareer({
                                            ...editingCareer,
                                            department: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600">Upload New PDF (Optional)</label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-400"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingCareer(null)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600 transition duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobTable;