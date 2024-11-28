import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';

interface President {
    id: number;
    name: string;
    description: string;
    image: string;
    status: 'active' | 'inactive';
}

function Presidents() {
    const [activePresident, setActivePresident] = useState<President | null>(null);
    const [formerPresidents, setFormerPresidents] = useState<President[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'inactive',
        imagePreview: '',
        image: null,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPresidentId, setSelectedPresidentId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const fileInputRef = useRef(null);

    const itemsPerPage = 3;

    useEffect(() => {
        fetchPresidents();
    }, []);

    const fetchPresidents = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_ROOT}/about/presidents`);
            setActivePresident(response.data.activePresident);
            setFormerPresidents(response.data.formerPresidents);
        } catch (error) {
            console.error("Error fetching presidents:", error);
        }
    };

    const openModal = (president?: President) => {
        setIsEditing(!!president);
        setSelectedPresidentId(president?.id || null);
        setFormData({
            name: president?.name || '',
            description: president?.description || '',
            status: president?.status || 'inactive',
            imagePreview: president?.image || '',
            image: null,
        });
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            status: 'inactive',
            imagePreview: '',
            image: null,
        });
        setSelectedPresidentId(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file,
            imagePreview: URL.createObjectURL(file),
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('status', formData.status);
        if (formData.image) data.append('image', formData.image);

        try {
            if (isEditing && selectedPresidentId) {
                await axios.put(`${import.meta.env.VITE_API_ROOT}/about/presidents/${selectedPresidentId}`, data);
            } else {
                await axios.post(`${import.meta.env.VITE_API_ROOT}/about/presidents`, data);
            }
            closeModal();
            fetchPresidents();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const deletePresident = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this president?")) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_ROOT}/about/presidents/${id}`);
            fetchPresidents();
        } catch (error) {
            console.error("Error deleting president:", error);
        }
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const paginatedFormerPresidents = formerPresidents.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    return (
        <div className="container mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Current President</h2>
            {activePresident ? (
                <div className="bg-white shadow rounded-lg p-6 mb-8 flex items-center gap-6">
                    <img
                        className="w-40 h-48 object-cover rounded-lg"
                        src={`${import.meta.env.VITE_API_ROOT}/${activePresident.image}`}
                        alt={activePresident.name}
                    />
                    <div>
                        <h3 className="text-xl font-semibold mb-2">{activePresident.name}</h3>
                        <button
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            onClick={() => openModal(activePresident)}
                        >
                            Update Status
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 mb-8">No current president</p>
            )}
            
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Former Presidents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedFormerPresidents.map((president) => (
                    <div key={president.id} className="bg-white shadow rounded-lg p-6 flex gap-4 items-start">
                        <img
                            className="w-20 h-20 object-cover rounded-full"
                            src={`${import.meta.env.VITE_API_ROOT}/${president.image}`}
                            alt={president.name}
                        />
                        <div>
                            <h3 className="text-lg font-semibold">{president.name}</h3>
                            <div className="flex gap-2">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                    onClick={() => openModal(president)}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                    onClick={() => deletePresident(president.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {formerPresidents.length > itemsPerPage && (
                <ReactPaginate
                    previousLabel={'«'}
                    nextLabel={'»'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(formerPresidents.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                    containerClassName={'flex justify-center mt-4 space-x-2'}
                    activeClassName={'font-bold text-blue-600'}
                    pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
                />
            )}

            <button
                className="mt-8 bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
                onClick={() => openModal()}
            >
                Add President
            </button>

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
                        {isEditing ? 'Edit President' : 'Add President'}
                    </h2>
                    <input 
                        type="text" 
                        name="name" 
                        onChange={handleChange} 
                        value={formData.name} 
                        placeholder="Name" 
                        className="w-full mb-4 p-3 border rounded-md" 
                        required 
                    />
                    <textarea 
                        name="description" 
                        onChange={handleChange} 
                        value={formData.description} 
                        placeholder="Description" 
                        className="w-full mb-4 p-3 border rounded-md h-96" 
                        required 
                    />
                    <input 
                        type="file" 
                        name="image" 
                        onChange={handleFileChange} 
                        ref={fileInputRef} 
                        className="w-full mb-4" 
                    />
                    {formData.imagePreview && (
                        <img src={formData.imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-full mb-4" />
                    )}

                    <div className="flex items-center gap-4 mb-4">
                        <label className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                name="status" 
                                value="active" 
                                checked={formData.status === 'active'} 
                                onChange={handleChange} 
                            />
                            Active
                        </label>
                        <label className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                name="status" 
                                value="inactive" 
                                checked={formData.status === 'inactive'} 
                                onChange={handleChange} 
                            />
                            Inactive
                        </label>
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">
                            {isEditing ? 'Update' : 'Submit'}
                        </button>
                        <button type="button" onClick={closeModal} className="w-full bg-gray-500 text-white p-3 rounded-md">
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Presidents;