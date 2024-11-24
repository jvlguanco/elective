import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';

interface SupportStaffMember {
    id: number;
    name: string;
    email: string;
    title: string;
    image: string;
    status: 'active' | 'inactive';
}

const SupportStaff = () => {
    const [formData, setFormData] = useState({
        id: null as number | null,
        name: '',
        email: '',
        title: '',
        image: null as File | null,
        imagePreview: '',
        status: 'active' as 'active' | 'inactive',
    });
    const [supportStaff, setSupportStaff] = useState<{ active: SupportStaffMember[], inactive: SupportStaffMember[] }>({
        active: [],
        inactive: []
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [activePage, setActivePage] = useState(0);
    const [inactivePage, setInactivePage] = useState(0);
    const itemsPerPage = 3;

    const fetchSupportStaff = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/about/support-staff');
            setSupportStaff({ active: res.data.active, inactive: res.data.inactive });
        } catch (err) {
            console.error(err);
            alert('Error fetching support staff');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSupportStaff();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setFormData((prevData) => ({
                ...prevData,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('title', formData.title);
        data.append('status', formData.status);
        if (formData.image) data.append('image', formData.image);

        try {
            if (isEditing && formData.id) {
                const res = await axios.put(`http://localhost:5000/about/support-staff/${formData.id}`, data);
                alert(res.data.message);
            } else {
                const res = await axios.post('http://localhost:5000/about/support-staff', data);
                alert(res.data.message);
            }
            closeModal();
            fetchSupportStaff();
        } catch (err) {
            console.error(err);
            alert('Error submitting form');
        }
    };

    const openModal = (member: SupportStaffMember | null = null) => {
        if (member) {
            setFormData({
                id: member.id,
                name: member.name,
                email: member.email,
                title: member.title,
                image: null,
                imagePreview: `http://localhost:5000/${member.image}`,
                status: member.status
            });
            setIsEditing(true);
        } else {
            setFormData({ id: null, name: '', email: '', title: '', image: null, imagePreview: '', status: 'active' });
            setIsEditing(false);
        }
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this staff member?')) {
            try {
                await axios.delete(`http://localhost:5000/about/support-staff/${id}`);
                alert('Staff member deleted successfully');
                fetchSupportStaff();
            } catch (err) {
                console.error(err);
                alert('Error deleting staff member');
            }
        }
    };

    const handlePageChange = (type: 'active' | 'inactive', selectedItem: { selected: number }) => {
        if (type === 'active') {
            setActivePage(selectedItem.selected);
        } else {
            setInactivePage(selectedItem.selected);
        }
    };

    const displayMembers = (members: SupportStaffMember[], page: number) =>
        members.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <div className="flex flex-col w-full h-full px-6 pt-2 gap-6">
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
                        {isEditing ? 'Edit Support Staff Member' : 'Add Support Staff Member'}
                    </h2>
                    <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Name" className="w-full mb-4 p-2 border rounded" required />
                    <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Email" className="w-full mb-4 p-2 border rounded" required />
                    <input type="text" name="title" onChange={handleChange} value={formData.title} placeholder="Title" className="w-full mb-4 p-2 border rounded" required />
                    <input type="file" name="image" onChange={handleFileChange} ref={fileInputRef} className="w-full mb-4" />
                    {formData.imagePreview && <img src={formData.imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-full mb-4" />}

                    <div className="flex items-center gap-4 mb-4">
                        <label>
                            <input type="radio" name="status" value="active" checked={formData.status === 'active'} onChange={handleChange} />
                            Active
                        </label>
                        <label>
                            <input type="radio" name="status" value="inactive" checked={formData.status === 'inactive'} onChange={handleChange} />
                            Inactive
                        </label>
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">{isEditing ? 'Update' : 'Submit'}</button>
                        <button type="button" onClick={closeModal} className="w-full bg-gray-500 text-white p-2 rounded">Cancel</button>
                    </div>
                </form>
            </Modal>

            <div className="w-full bg-white p-6 rounded shadow-md">
                <div className='w-full flex justify-between items-center'>
                    <h2 className="text-2xl font-bold mb-4">Support Staff</h2>

                    <div className="w-fit flex justify-end mb-4">
                        <button onClick={() => openModal()} className="bg-blue-500 text-white py-2 px-4 rounded">
                            Add New Member
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p>Loading...</p>
                    </div>
                ) : (
                    ['active', 'inactive'].map((status) => (
                        <div key={status} className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">{status === 'active' ? 'Active Staff' : 'Inactive Staff'}</h3>
                            {supportStaff[status].length > 0 ? (
                                <ul className="space-y-4">
                                    {displayMembers(supportStaff[status], status === 'active' ? activePage : inactivePage).map(member => (
                                        <li key={member.id} className="border p-2 rounded flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <img src={`http://localhost:5000/${member.image}`} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                                                <div>
                                                    <p className="font-semibold">{member.name}</p>
                                                    <p className="text-sm text-gray-600">{member.title}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => openModal(member)} className="text-blue-500 hover:text-blue-600">Edit</button>
                                                <button onClick={() => handleDelete(member.id)} className="text-red-500 hover:text-red-600">Delete</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No {status} staff members</p>
                            )}
                            {supportStaff[status].length > itemsPerPage && (
                                <ReactPaginate
                                    previousLabel={'«'}
                                    nextLabel={'»'}
                                    breakLabel={'...'}
                                    pageCount={Math.ceil(supportStaff[status].length / itemsPerPage)}
                                    onPageChange={(selectedItem) => handlePageChange(status as 'active' | 'inactive', selectedItem)}
                                    containerClassName={'flex justify-center mt-4 space-x-2'}
                                    activeClassName={'font-bold text-blue-600'}
                                    pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SupportStaff;
