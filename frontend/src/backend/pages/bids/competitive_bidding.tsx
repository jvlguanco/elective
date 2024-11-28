import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';

interface BidItem {
    id: number;
    title: string;
    budget: number;
    date: string;
}

const CompetitiveBidding = () => {
    const [formData, setFormData] = useState({
        id: null as number | null,
        title: '',
        budget: '' as string,
        date: '' as string,
    });
    const [bidItems, setBidItems] = useState<{ items: BidItem[] }>({
        items: [],
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [page, setPage] = useState(0);
    const itemsPerPage = 8;

    const openModal = (item: BidItem | null = null) => {
        if (item) {
            setFormData({
                id: item.id,
                title: item.title,
                budget: item.budget.toFixed(2),
                date: item.date,
            });
            setIsEditing(true);
        } else {
            setFormData({ id: null, title: '', budget: '', date: '' });
            setIsEditing(false);
        }
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'budget' ? parseFloat(value) || '' : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && formData.id) {
                const res = await axios.put(
                    `${import.meta.env.VITE_API_ROOT}/bid/competitive-bidding/${formData.id}`,
                    formData
                );
                alert(res.data.message);
            } else {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_ROOT}/bid/competitive-bidding`,
                    formData
                );
                alert(res.data.message);
            }
            closeModal();
            fetchBidItems();
        } catch (err) {
            console.error(err);
            alert('Error submitting form');
        }
    };

    const fetchBidItems = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_ROOT}/bid/competitive-bidding`);
            const items = res.data.map((item: any) => ({
                ...item,
                budget: parseFloat(item.budget), // Convert budget to a number
            }));
            setBidItems({ items });
        } catch (err) {
            console.error(err);
            alert('Error fetching bid items');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_ROOT}/bid/competitive-bidding/${id}`);
                alert('Item deleted successfully');
                fetchBidItems();
            } catch (err) {
                console.error(err);
                alert('Error deleting item');
            }
        }
    };

    useEffect(() => {
        fetchBidItems();
    }, []);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected);
    };

    const displayItems = (items: BidItem[], page: number) =>
        items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <div className="w-full flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Competitive Bidding</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Add New Bid
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
                        {isEditing ? 'Edit Bid' : 'Add Bid'}
                    </h2>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                        placeholder="Bid Title"
                        className="w-full mb-4 p-2 border rounded"
                        required
                    />
                    <input
                        type="number"
                        name="budget"
                        onChange={handleChange}
                        value={formData.budget}
                        placeholder="Budget (e.g., 10000.00)"
                        className="w-full mb-4 p-2 border rounded"
                        step="0.01"
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                        value={formData.date}
                        className="w-full mb-4 p-2 border rounded"
                        required
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
                                <th className="p-2 border border-gray-200">Budget</th>
                                <th className="p-2 border border-gray-200">Date</th>
                                <th className="p-2 border border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayItems(bidItems.items, page).map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-2 border border-gray-200">
                                        {index + 1 + page * itemsPerPage}
                                    </td>
                                    <td className="p-2 border border-gray-200">{item.title}</td>
                                    <td className="p-2 border border-gray-200">
                                        PHP {item.budget ? item.budget.toFixed(2) : '0.00'}
                                    </td>
                                    <td className="p-2 border border-gray-200">{formatDate(item.date)}</td>
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
                    {bidItems.items.length > itemsPerPage && (
                        <ReactPaginate
                            previousLabel={'«'}
                            nextLabel={'»'}
                            breakLabel={'...'}
                            pageCount={Math.ceil(bidItems.items.length / itemsPerPage)}
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

export default CompetitiveBidding;