import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const DirectorsAndChiefs = () => {
    const [activeOffices, setActiveOffices] = useState([]); // For active offices
    const [inactiveOffices, setInactiveOffices] = useState([]); // For inactive offices
    const [loading, setLoading] = useState(true);
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [newOfficeName, setNewOfficeName] = useState('');
    const [newOfficeStatus, setNewOfficeStatus] = useState('active');
    const [editOffice, setEditOffice] = useState(null); // Holds the office being edited

    useEffect(() => {
        fetchOffices();
    }, []);

    const fetchOffices = () => {
        axios.get('http://localhost:5000/about/dc-offices')
            .then(response => {
                setActiveOffices(response.data.active);
                setInactiveOffices(response.data.inactive);
            })
            .catch(error => {
                console.error("Error fetching offices:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const openAddModal = () => {
        setAddModalIsOpen(true);
    };

    const closeAddModal = () => {
        setAddModalIsOpen(false);
        setNewOfficeName('');
        setNewOfficeStatus('active');
    };

    const handleAddNewOffice = () => {
        axios.post('http://localhost:5000/about/dc-offices', {
            office_name: newOfficeName,
            status: newOfficeStatus,
        })
            .then(response => {
                alert(response.data.message);
                fetchOffices(); // Refresh the list
                closeAddModal();
            })
            .catch(error => {
                console.error("Error adding new office:", error);
                alert('Failed to add new office');
            });
    };

    const openUpdateModal = () => {
        setUpdateModalIsOpen(true);
    };

    const closeUpdateModal = () => {
        setUpdateModalIsOpen(false);
        setEditOffice(null); // Reset editing state when closing modal
    };

    const handleEditClick = (office) => {
        setEditOffice(office);
    };

    const handleSaveEdit = () => {
        if (editOffice) {
            axios.put(`http://localhost:5000/about/dc-offices/${editOffice.id}`, {
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
            axios.delete(`http://localhost:5000/about/dc-offices/${id}`)
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

    return (
        <>
            <div className='w-full flex justify-between items-center mb-8'>
                <h2 className="text-2xl font-bold">Directors and Chiefs</h2>

                <div className='flex gap-4'>
                    <button onClick={openAddModal} className="bg-blue-500 text-white py-2 px-4 rounded">
                        Add New Office
                    </button>

                    <button onClick={openUpdateModal} className="bg-blue-500 text-white py-2 px-4 rounded">
                        Update Offices
                    </button>
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
                        <input
                            type="text"
                            value={newOfficeName}
                            onChange={(e) => setNewOfficeName(e.target.value)}
                            required
                            className="border rounded px-2 py-1 w-full mt-1"
                        />
                    </label>
                    <label className="block mb-4">
                        Status:
                        <select
                            value={newOfficeStatus}
                            onChange={(e) => setNewOfficeStatus(e.target.value)}
                            className="border rounded px-2 py-1 w-full mt-1"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </label>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={closeAddModal}
                            className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Submit
                        </button>
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
                        width: '600px',
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
                
                {loading ? (
                    <p>Loading...</p>
                ) : (
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
                                            <input
                                                type="text"
                                                value={editOffice.office_name}
                                                onChange={(e) =>
                                                    setEditOffice({ ...editOffice, office_name: e.target.value })
                                                }
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            office.office_name
                                        )}
                                    </td>
                                    <td className="border p-2">
                                        {editOffice?.id === office.id ? (
                                            <div className="flex gap-2">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        value="active"
                                                        checked={editOffice.status === 'active'}
                                                        onChange={() => setEditOffice({ ...editOffice, status: 'active' })}
                                                    />
                                                    Active
                                                </label>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        value="inactive"
                                                        checked={editOffice.status === 'inactive'}
                                                        onChange={() => setEditOffice({ ...editOffice, status: 'inactive' })}
                                                    />
                                                    Inactive
                                                </label>
                                            </div>
                                        ) : (
                                            office.status
                                        )}
                                    </td>
                                    <td className="border p-2">
                                        {editOffice?.id === office.id ? (
                                            <button onClick={handleSaveEdit} className="bg-green-500 text-white py-1 px-2 rounded">
                                                Save
                                            </button>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEditClick(office)} className="bg-blue-500 text-white py-1 px-2 rounded mr-2">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDeleteOffice(office.id)} className="bg-red-500 text-white py-1 px-2 rounded">
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="flex justify-end mt-4">
                    <button
                        onClick={closeUpdateModal}
                        className="bg-gray-300 text-black py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </div>
            </Modal>

            <div className="mb-4 flex items-center justify-between">
                <div>
                    <label htmlFor="officeDropdown" className="mr-2">Select Active Office:</label>
                    {loading ? (
                        <p>Loading...</p>
                    ) : activeOffices.length > 0 ? (
                        <select id="officeDropdown" className="border rounded px-2 py-1">
                            {activeOffices.map((office, index) => (
                                <option key={index} value={office.office_name}>
                                    {office.office_name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-gray-500">No active offices available</p>
                    )}
                </div>

                <div>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded">
                        Add New Member
                    </button>
                </div>
            </div>
        </>
    );
};

export default DirectorsAndChiefs;