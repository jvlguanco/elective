import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';

interface OfficeItem {
    id: number;
    office_name: string;
    description: string;
    vision: string;
    mission: string;
    status: string;
    org_chart: string;
    email: string;
    contact_number: string;
}

const Offices = () => {
    const [formData, setFormData] = useState({
        id: null as number | null,
        office_name: '',
        description: '',
        vision: '',
        mission: '',
        status: 'active',
        org_chart: null as File | null,
        email: '',
        contact_number: '',
    });
    const [officeItems, setOfficeItems] = useState<{ items: OfficeItem[] }>({
        items: [],
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [page, setPage] = useState(0);
    const itemsPerPage = 8;

    const openModal = (item: OfficeItem | null = null) => {
        if (item) {
            setFormData({
                id: item.id,
                office_name: item.office_name,
                description: item.description,
                vision: item.vision,
                mission: item.mission,
                status: item.status,
                org_chart: null,
                email: item.email,
                contact_number: item.contact_number,
            });
            setIsEditing(true);
        } else {
            setFormData({
                id: null,
                office_name: '',
                description: '',
                vision: '',
                mission: '',
                status: 'active',
                org_chart: null,
                email: '',
                contact_number: '',
            });
            setIsEditing(false);
        }
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setFormData((prevData) => ({
                ...prevData,
                org_chart: file,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('office_name', formData.office_name);
        data.append('description', formData.description);
        data.append('vision', formData.vision);
        data.append('mission', formData.mission);
        data.append('status', formData.status);
        data.append('email', formData.email);
        data.append('contact_number', formData.contact_number);
        if (formData.org_chart) data.append('org_chart', formData.org_chart);

        try {
            if (isEditing && formData.id) {
                const res = await axios.put(`http://localhost:5000/office/information/${formData.id}`, data);
                alert(res.data.message);
            } else {
                const res = await axios.post('http://localhost:5000/office/information', data);
                alert(res.data.message);
            }
            closeModal();
            fetchOfficeItems();
        } catch (err) {
            console.error(err);
            alert('Error submitting form');
        }
    };

    const fetchOfficeItems = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/office/information');
            const sortedItems = res.data.sort((a: OfficeItem, b: OfficeItem) =>
                a.status === 'inactive' && b.status === 'active' ? 1 : -1
            );
            setOfficeItems({ items: sortedItems });
        } catch (err) {
            console.error(err);
            alert('Error fetching office information');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this office?')) {
            try {
                await axios.delete(`http://localhost:5000/office/information/${id}`);
                alert('Office deleted successfully');
                fetchOfficeItems();
            } catch (err) {
                console.error(err);
                alert('Error deleting office');
            }
        }
    };

    useEffect(() => {
        fetchOfficeItems();
    }, []);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected);
    };

    const displayItems = (items: OfficeItem[], page: number) =>
        items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <>
            <div className="w-full flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Offices</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Add New Office
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
                        {isEditing ? 'Edit Office' : 'Add Office'}
                    </h2>
                    <input
                        type="text"
                        name="office_name"
                        onChange={handleChange}
                        value={formData.office_name}
                        placeholder="Office Name"
                        className="w-full mb-4 p-2 border rounded"
                        required
                    />
                    <textarea
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        placeholder="Description"
                        className="w-full mb-4 p-2 border rounded"
                        rows={3}
                        required
                    />
                    <textarea
                        name="vision"
                        onChange={handleChange}
                        value={formData.vision}
                        placeholder="Vision"
                        className="w-full mb-4 p-2 border rounded"
                        rows={3}
                        required
                    />
                    <textarea
                        name="mission"
                        onChange={handleChange}
                        value={formData.mission}
                        placeholder="Mission"
                        className="w-full mb-4 p-2 border rounded"
                        rows={3}
                        required
                    />
                    <select
                        name="status"
                        onChange={handleChange}
                        value={formData.status}
                        className="w-full mb-4 p-2 border rounded"
                        required
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        placeholder="Email"
                        className="w-full mb-4 p-2 border rounded"
                        required
                    />
                    <input
                        type="number"
                        name="contact_number"
                        onChange={handleChange}
                        value={formData.contact_number}
                        placeholder="Contact Number"
                        className="w-full mb-4 p-2 border rounded"
                        required
                    />
                    <input
                        type="file"
                        name="org_chart"
                        onChange={handleFileChange}
                        accept=".png,.jpg,.jpeg"
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
                                <th className="p-2 border border-gray-200">Office Name</th>
                                <th className="p-2 border border-gray-200">Status</th>
                                <th className="p-2 border border-gray-200">Org Chart</th>
                                <th className="p-2 border border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayItems(officeItems.items, page).map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-2 border border-gray-200">{index + 1 + page * itemsPerPage}</td>
                                    <td className="p-2 border border-gray-200">{item.office_name}</td>
                                    <td className="p-2 border border-gray-200">
                                        <span
                                            className={
                                                item.status === 'active'
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                            }
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-2 border border-gray-200">
                                        <a
                                            href={`http://localhost:5000/${item.org_chart}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            View Org Chart
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
                    {officeItems.items.length > itemsPerPage && (
                        <ReactPaginate
                            previousLabel={'«'}
                            nextLabel={'»'}
                            breakLabel={'...'}
                            pageCount={Math.ceil(officeItems.items.length / itemsPerPage)}
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

export default Offices;