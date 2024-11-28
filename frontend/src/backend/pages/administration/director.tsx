import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';

const DirectorsAndChiefs = () => {
    const [activeOffices, setActiveOffices] = useState([]);
    const [inactiveOffices, setInactiveOffices] = useState([]);
    const [boardMembers, setBoardMembers] = useState({ active: [], inactive: [] });
    const [loading, setLoading] = useState(true);
    const [selectedOfficeId, setSelectedOfficeId] = useState(null);
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [newOfficeName, setNewOfficeName] = useState('');
    const [newOfficeStatus, setNewOfficeStatus] = useState('active');
    const [editOffice, setEditOffice] = useState(null);
    const [addMemberModalIsOpen, setAddMemberModalIsOpen] = useState(false);
    const [newMember, setNewMember] = useState({ name: '', title: '', email: '', status: 'active', image: null });
    const itemsPerPage = 2;
    const [activePage, setActivePage] = useState(0);
    const [inactivePage, setInactivePage] = useState(0);
    const [editMemberModalIsOpen, setEditMemberModalIsOpen] = useState(false);
    const [editMember, setEditMember] = useState(null);

    useEffect(() => {
        fetchOffices();
    }, []);

    const fetchOffices = () => {
        axios.get(`${import.meta.env.VITE_API_ROOT}/about/dc-offices`)
            .then(response => {
                setActiveOffices(response.data.active);
                setInactiveOffices(response.data.inactive);
            })
            .catch(error => console.error("Error fetching offices:", error))
            .finally(() => setLoading(false));
    };

    const fetchMembers = (officeId) => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_ROOT}/about/dc-members?office_id=${officeId}`)
            .then(response => {
                setBoardMembers(response.data);
            })
            .catch(error => console.error("Error fetching members:", error))
            .finally(() => setLoading(false));
    };

    const handleOfficeChange = (e) => {
        const officeId = e.target.value;
        setSelectedOfficeId(officeId);
        fetchMembers(officeId);
    };

    const displayMembers = (members, page) => {
        const start = page * itemsPerPage;
        return members.slice(start, start + itemsPerPage);
    };

    const handlePageChange = (status, selectedItem) => {
        if (status === 'active') {
            setActivePage(selectedItem.selected);
        } else {
            setInactivePage(selectedItem.selected);
        }
    };

    const openAddModal = () => setAddModalIsOpen(true);
    const closeAddModal = () => {
        setAddModalIsOpen(false);
        setNewOfficeName('');
        setNewOfficeStatus('active');
    };

    const handleAddNewOffice = () => {
        axios.post(`${import.meta.env.VITE_API_ROOT}/about/dc-offices`, {
            office_name: newOfficeName,
            status: newOfficeStatus,
        })
            .then(response => {
                alert(response.data.message);
                fetchOffices();
                closeAddModal();
            })
            .catch(error => {
                console.error("Error adding new office:", error);
                alert('Failed to add new office');
            });
    };

    const openUpdateModal = () => setUpdateModalIsOpen(true);
    const closeUpdateModal = () => {
        setUpdateModalIsOpen(false);
        setEditOffice(null);
    };

    const handleEditClick = (office) => setEditOffice(office);
    const handleSaveEdit = () => {
        if (editOffice) {
            axios.put(`${import.meta.env.VITE_API_ROOT}/about/dc-offices/${editOffice.id}`, {
                office_name: editOffice.office_name,
                status: editOffice.status,
            })
                .then(response => {
                    alert(response.data.message);
                    fetchOffices();
                    closeUpdateModal();
                })
                .catch(error => {
                    console.error("Error updating office:", error);
                    alert('Failed to update office');
                });
        }
    };

    const handleDeleteOffice = (id) => {
        if (window.confirm('Are you sure you want to delete this office?')) {
            axios.delete(`${import.meta.env.VITE_API_ROOT}/about/dc-offices/${id}`)
                .then(response => {
                    alert(response.data.message);
                    fetchOffices();
                })
                .catch(error => {
                    console.error("Error deleting office:", error);
                    alert('Failed to delete office');
                });
        }
    };

    const openAddMemberModal = () => setAddMemberModalIsOpen(true);
    const closeAddMemberModal = () => {
        setAddMemberModalIsOpen(false);
        setNewMember({ name: '', title: '', email: '', status: 'active', image: null });
    };

    const handleAddNewMember = () => {
        const formData = new FormData();
        formData.append('name', newMember.name);
        formData.append('title', newMember.title);
        formData.append('email', newMember.email);
        formData.append('status', newMember.status);
        formData.append('image', newMember.image);
        formData.append('office_id', selectedOfficeId);

        axios.post(`${import.meta.env.VITE_API_ROOT}/about/dc-members`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                alert(response.data.message);
                fetchMembers(selectedOfficeId);
                closeAddMemberModal();
            })
            .catch(error => {
                console.error("Error adding new member:", error);
                alert('Failed to add new member');
            });
    };

    const handleMemberInputChange = (e) => {
        const { name, value } = e.target;
        setNewMember((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        setNewMember((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const openEditMemberModal = (member) => {
        setEditMember(member);
        setEditMemberModalIsOpen(true);
    };

    const closeEditMemberModal = () => {
        setEditMember(null);
        setEditMemberModalIsOpen(false);
    };

    const handleEditMemberChange = (e) => {
        const { name, value } = e.target;
        setEditMember((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditMember = () => {
        const formData = new FormData();
        formData.append('name', editMember.name);
        formData.append('title', editMember.title);
        formData.append('email', editMember.email);
        formData.append('status', editMember.status);
        if (editMember.image instanceof File) {
            formData.append('image', editMember.image);
        }

        axios.put(`${import.meta.env.VITE_API_ROOT}/about/dc-members/${editMember.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
            alert(response.data.message);
            fetchMembers(selectedOfficeId);
            closeEditMemberModal();
        })
        .catch(error => {
            console.error("Error updating member:", error);
            alert('Failed to update member');
        });
    };

    const handleDeleteMember = (memberId) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
            axios.delete(`${import.meta.env.VITE_API_ROOT}/about/dc-members/${memberId}`)
            .then(response => {
                alert(response.data.message);
                fetchMembers(selectedOfficeId);
            })
            .catch(error => {
                console.error("Error deleting member:", error);
                alert('Failed to delete member');
            });
        }
    };

    return (
        <>
            <div className='w-full flex justify-between items-center mb-8'>
                <h2 className="text-2xl font-bold">Directors and Chiefs</h2>
                <div className='flex gap-4'>
                    <button onClick={openAddModal} className="bg-blue-500 text-white py-2 px-4 rounded">Add New Office</button>
                    <button onClick={openUpdateModal} className="bg-blue-500 text-white py-2 px-4 rounded">Update Offices</button>
                    {selectedOfficeId && (
                        <button onClick={openAddMemberModal} className="bg-blue-500 text-white py-2 px-4 rounded">Add New Member</button>
                    )}
                </div>
            </div>

            <Modal
                isOpen={addModalIsOpen}
                onRequestClose={closeAddModal}
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
                <h2 className="text-lg font-bold mb-4">Add New Office</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleAddNewOffice(); }}>
                    <label className="block mb-2">
                        Office Name:
                        <input type="text" value={newOfficeName} onChange={(e) => setNewOfficeName(e.target.value)} required className="border rounded px-2 py-1 w-full mt-1" />
                    </label>
                    <label className="block mb-4">
                        Status:
                        <select value={newOfficeStatus} onChange={(e) => setNewOfficeStatus(e.target.value)} className="border rounded px-2 py-1 w-full mt-1">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </label>
                    <div className="flex justify-end">
                        <button type="button" onClick={closeAddModal} className="bg-gray-300 text-black py-2 px-4 rounded mr-2">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                    </div>
                </form>
            </Modal>

            <Modal
                isOpen={updateModalIsOpen}
                onRequestClose={closeUpdateModal}
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
                <h2 className="text-lg font-bold mb-4">Update Offices</h2>
                {loading ? <p>Loading...</p> : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Office Name</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...activeOffices, ...inactiveOffices].map((office) => (
                                <tr key={office.id}>
                                    <td className="border p-2">{office.id}</td>
                                    <td className="border p-2">
                                        {editOffice?.id === office.id ? (
                                            <input type="text" value={editOffice.office_name} onChange={(e) => setEditOffice({ ...editOffice, office_name: e.target.value })} className="border rounded px-2 py-1 w-full" />
                                        ) : office.office_name}
                                    </td>
                                    <td className="border p-2">
                                        {editOffice?.id === office.id ? (
                                            <div className="flex gap-2">
                                                <label><input type="radio" value="active" checked={editOffice.status === 'active'} onChange={() => setEditOffice({ ...editOffice, status: 'active' })} /> Active</label>
                                                <label><input type="radio" value="inactive" checked={editOffice.status === 'inactive'} onChange={() => setEditOffice({ ...editOffice, status: 'inactive' })} /> Inactive</label>
                                            </div>
                                        ) : office.status}
                                    </td>
                                    <td className="border p-2">
                                        {editOffice?.id === office.id ? (
                                            <button onClick={handleSaveEdit} className="bg-green-500 text-white py-1 px-2 rounded">Save</button>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEditClick(office)} className="bg-blue-500 text-white py-1 px-2 rounded mr-2">Edit</button>
                                                <button onClick={() => handleDeleteOffice(office.id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="flex justify-end mt-4">
                    <button onClick={closeUpdateModal} className="bg-gray-300 text-black py-2 px-4 rounded">Close</button>
                </div>
            </Modal>

            <Modal
                isOpen={addMemberModalIsOpen}
                onRequestClose={closeAddMemberModal}
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
                <h2 className="text-lg font-bold mb-4">Add New Member</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleAddNewMember(); }}>
                    <label className="block mb-2">
                        Name:
                        <input type="text" name="name" value={newMember.name} onChange={handleMemberInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                    </label>
                    <label className="block mb-2">
                        Title:
                        <input type="text" name="title" value={newMember.title} onChange={handleMemberInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                    </label>
                    <label className="block mb-2">
                        Email:
                        <input type="email" name="email" value={newMember.email} onChange={handleMemberInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                    </label>
                    <label className="block mb-4">
                        Status:
                        <select name="status" value={newMember.status} onChange={handleMemberInputChange} className="border rounded px-2 py-1 w-full mt-1">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </label>
                    <label className="block mb-4">
                        Image:
                        <input type="file" onChange={handleImageUpload} className="border rounded px-2 py-1 w-full mt-1" />
                    </label>
                    <div className="flex justify-end">
                        <button type="button" onClick={closeAddMemberModal} className="bg-gray-300 text-black py-2 px-4 rounded mr-2">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                    </div>
                </form>
            </Modal>

            <div className="mb-4 flex items-center justify-between">
                <label htmlFor="officeDropdown" className="mr-2">Select Active Office:</label>
                <select id="officeDropdown" onChange={handleOfficeChange} className="border rounded px-2 py-1">
                    <option value="">Select Office</option>
                    {activeOffices.map((office) => (
                        <option key={office.id} value={office.id}>{office.office_name}</option>
                    ))}
                </select>
            </div>

            <Modal
                isOpen={editMemberModalIsOpen}
                onRequestClose={closeEditMemberModal}
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
                <h2 className="text-lg font-bold mb-4">Edit Member</h2>
                {editMember && (
                    <form onSubmit={(e) => { e.preventDefault(); handleEditMember(); }}>
                        <label className="block mb-2">
                            Name:
                            <input type="text" name="name" value={editMember.name} onChange={handleEditMemberChange} required className="border rounded px-2 py-1 w-full mt-1" />
                        </label>
                        <label className="block mb-2">
                            Title:
                            <input type="text" name="title" value={editMember.title} onChange={handleEditMemberChange} required className="border rounded px-2 py-1 w-full mt-1" />
                        </label>
                        <label className="block mb-2">
                            Email:
                            <input type="email" name="email" value={editMember.email} onChange={handleEditMemberChange} required className="border rounded px-2 py-1 w-full mt-1" />
                        </label>
                        <label className="block mb-4">
                            Status:
                            <select name="status" value={editMember.status} onChange={handleEditMemberChange} className="border rounded px-2 py-1 w-full mt-1">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </label>
                        <label className="block mb-4">
                            Image:
                            <input type="file" onChange={(e) => setEditMember({ ...editMember, image: e.target.files[0] })} className="border rounded px-2 py-1 w-full mt-1" />
                        </label>
                        <div className="flex justify-end">
                            <button type="button" onClick={closeEditMemberModal} className="bg-gray-300 text-black py-2 px-4 rounded mr-2">Cancel</button>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                        </div>
                    </form>
                )}
            </Modal>

            {loading ? (
                <div className="flex justify-center items-center h-full"><p>Loading...</p></div>
            ) : selectedOfficeId ? (
                ['active', 'inactive'].map((status) => (
                    <div key={status} className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">{status === 'active' ? 'Active Members' : 'Inactive Members'}</h3>
                        {boardMembers[status]?.length > 0 ? (
                            <ul className="space-y-4">
                                {displayMembers(boardMembers[status], status === 'active' ? activePage : inactivePage).map(member => (
                                    <li key={member.id} className="border p-2 rounded flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <img src={`${import.meta.env.VITE_API_ROOT}/${member.image}`} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                                            <div>
                                                <p className="font-semibold">{member.name}</p>
                                                <p className="text-sm text-gray-600">{member.title}</p>
                                                <p className="text-sm text-gray-600">{member.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditMemberModal(member)} className="bg-blue-500 text-white py-1 px-2 rounded">Edit</button>
                                            <button onClick={() => handleDeleteMember(member.id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-gray-500">No {status} members</p>}
                        {boardMembers[status]?.length > itemsPerPage && (
                            <ReactPaginate
                                previousLabel={'«'}
                                nextLabel={'»'}
                                breakLabel={'...'}
                                pageCount={Math.ceil(boardMembers[status].length / itemsPerPage)}
                                onPageChange={(selectedItem) => handlePageChange(status, selectedItem)}
                                containerClassName={'flex justify-center mt-4 space-x-2'}
                                activeClassName={'font-bold text-blue-600'}
                                pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
                            />
                        )}
                    </div>
                ))
            ) : <p className="text-gray-500">Select an office to view members.</p>}
        </>
    );
};

export default DirectorsAndChiefs;