import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import CreatableSelect from 'react-select/creatable';

interface Download {
    id: number;
    title: string;
    section: string;
    file_path: string;
}

const Downloads = () => {
    const [formData, setFormData] = useState({
        id: null as number | null,
        title: '',
        section: '',
        file: null as File | null,
    });
    const [downloads, setDownloads] = useState<{ items: Download[] }>({
        items: [],
    });
    const [sections, setSections] = useState<{ label: string; value: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [page, setPage] = useState(0);
    const [error, setError] = useState<{ section: string | null }>({
        section: null,
    });
    const itemsPerPage = 8;

    const openModal = (item: Download | null = null) => {
        if (item) {
            setFormData({
                id: item.id,
                title: item.title,
                section: item.section,
                file: null,
            });
            setIsEditing(true);
        } else {
            setFormData({ id: null, title: '', section: '', file: null });
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
    
        if (!formData.section) {
            setError({ section: 'Please select or create a section.' });
            return;
        } else {
            setError({ section: null });
        }
    
        const data = new FormData();
        data.append('title', formData.title);
        data.append('section', formData.section);
        data.append('location', 'downloads');
        if (formData.file) data.append('file', formData.file);
    
        try {
            if (isEditing && formData.id) {
                const res = await axios.put(`http://localhost:5000/other/downloads/${formData.id}`, data);
                alert(res.data.message);
            } else {
                const res = await axios.post('http://localhost:5000/other/downloads', data);
                alert(res.data.message);
            }
            closeModal();
            fetchDownloads();
        } catch (err) {
            console.error(err);
            alert('Error submitting form');
        }
    };

    const fetchDownloads = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/other/downloads');
            setDownloads({ items: res.data });
        } catch (err) {
            console.error(err);
            alert('Error fetching downloads');
        } finally {
            setLoading(false);
        }
    };

    const fetchSections = async () => {
        try {
            const res = await axios.get('http://localhost:5000/other/sections');
            setSections(
                res.data.map((section: { section: string }) => ({
                    label: section.section,
                    value: section.section,
                }))
            );
        } catch (err) {
            console.error(err);
            alert('Error fetching sections');
        }
    };

    const handleSectionChange = (selectedOption: { label: string; value: string } | null) => {
        setFormData((prevData) => ({
            ...prevData,
            section: selectedOption ? selectedOption.value : '',
        }));
    };

    const handleCreateSection = (newValue: string) => {
        const newSection = { label: newValue, value: newValue };
        setSections((prevSections) => [...prevSections, newSection]);
        setFormData((prevData) => ({
            ...prevData,
            section: newValue,
        }));
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this download?')) {
            try {
                await axios.delete(`http://localhost:5000/other/downloads/${id}`);
                alert('Download deleted successfully');
                fetchDownloads();
            } catch (err) {
                console.error(err);
                alert('Error deleting download');
            }
        }
    };

    useEffect(() => {
        fetchDownloads();
        fetchSections();
    }, []);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected);
    };

    const displayItems = (items: Download[], page: number) =>
        items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <>
            <div className="w-full flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Downloads</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Add New Download
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
                        {isEditing ? 'Edit Download' : 'Add Download'}
                    </h2>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                        placeholder="Download Title"
                        className="w-full mb-4 p-2 border rounded"
                        required
                    />
                    <CreatableSelect
                        isClearable
                        options={sections}
                        value={sections.find((option) => option.value === formData.section) || null}
                        onChange={handleSectionChange}
                        onCreateOption={handleCreateSection}
                        placeholder="Select or create a section"
                        className={`w-full mb-4 ${error.section ? 'border-red-500' : ''}`}
                    />
                    {error.section && <p className="text-red-500 text-sm">{error.section}</p>}
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="w-full mb-4 p-2 border rounded"
                        required={!isEditing}
                    />
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
                                <th className="p-2 border border-gray-200">Section</th>
                                <th className="p-2 border border-gray-200">File</th>
                                <th className="p-2 border border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayItems(downloads.items, page).map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-2 border border-gray-200">{index + 1 + page * itemsPerPage}</td>
                                    <td className="p-2 border border-gray-200">{item.title}</td>
                                    <td className="p-2 border border-gray-200">{item.section}</td>
                                    <td className="p-2 border border-gray-200">
                                        <a
                                            href={`http://localhost:5000/${item.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            {item.file_path}
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
                    {downloads.items.length > itemsPerPage && (
                        <ReactPaginate
                            previousLabel={'«'}
                            nextLabel={'»'}
                            breakLabel={'...'}
                            pageCount={Math.ceil(downloads.items.length / itemsPerPage)}
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

export default Downloads;