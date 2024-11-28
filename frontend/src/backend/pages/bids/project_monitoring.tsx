import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';

interface Project {
    id: number;
    title: string;
    file: string;
}

const ProjectMonitoring = () => {
    const [formData, setFormData] = useState({
        id: null as number | null,
        title: '',
        file: null as File | null,
    });
    const [projects, setProjects] = useState<{ items: Project[] }>({
        items: [],
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [page, setPage] = useState(0);
    const itemsPerPage = 8;

    const openModal = (item: Project | null = null) => {
        if (item) {
            setFormData({
                id: item.id,
                title: item.title,
                file: null,
            });
            setIsEditing(true);
        } else {
            setFormData({ id: null, title: '', file: null });
            setIsEditing(false);
        }
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const pdf_in = e.target.files[0];
            setFormData((prevData) => ({
                ...prevData,
                file: pdf_in,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        if (formData.file) data.append('file', formData.file);

        try {
            if (isEditing && formData.id) {
                const res = await axios.put(`${import.meta.env.VITE_API_ROOT}/bid/project-monitoring/${formData.id}`, data);
                alert(res.data.message);
            } else {
                const res = await axios.post(`${import.meta.env.VITE_API_ROOT}/bid/project-monitoring`, data);
                alert(res.data.message);
            }
            closeModal();
            fetchProjects();
        } catch (err) {
            console.error(err);
            alert('Error submitting form');
        }
    };

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

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_ROOT}/bid/project-monitoring/${id}`);
                alert('Project deleted successfully');
                fetchProjects();
            } catch (err) {
                console.error(err);
                alert('Error deleting project');
            }
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
        <>
            <div className="w-full flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Project Monitoring</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Add New Project
                </button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    content: {
                        position: 'relative',
                        width: '500px',
                        maxWidth: '90%',
                        margin: '0 auto',
                        padding: '20px',
                        borderRadius: '10px',
                        background: 'white',
                        overflow: 'hidden',
                    },
                }}
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        {isEditing ? 'Edit Project' : 'Add Project'}
                    </h2>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                        placeholder="Project Name"
                        className="w-full mb-4 p-2 border rounded"
                        required
                    />
                    {isEditing ? 
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="w-full mb-4 p-2 border rounded"
                    />
                    : 
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="w-full mb-4 p-2 border rounded"
                        required
                    />
                    }
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded"
                        >
                            {isEditing ? 'Update' : 'Submit'}
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="w-full bg-gray-500 text-white p-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>

            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="mb-6">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-2 border border-gray-200">#</th>
                                <th className="p-2 border border-gray-200">Title</th>
                                <th className="p-2 border border-gray-200">File</th>
                                <th className="p-2 border border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayItems(projects.items, page).map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-2 border border-gray-200">{index + 1 + page * itemsPerPage}</td>
                                    <td className="p-2 border border-gray-200">{item.title}</td>
                                    <td className="p-2 border border-gray-200">
                                        <a
                                            href={`${import.meta.env.VITE_API_ROOT}/${item.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            {item.file}
                                        </a>
                                    </td>
                                    <td className="p-2 border border-gray-200">
                                        <button
                                            onClick={() => openModal(item)}
                                            className="text-blue-500 hover:text-blue-600 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            Delete
                                        </button>
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
            )}
        </>
    );
};

export default ProjectMonitoring;