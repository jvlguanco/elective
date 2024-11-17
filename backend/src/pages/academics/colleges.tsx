import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';

const Colleges = () => {
    const [activeColleges, setActiveColleges] = useState([]);
    const [inactiveColleges, setInactiveColleges] = useState([]);
    const [selectedCollegeId, setSelectedCollegeId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [newCollege, setNewCollege] = useState({ college_id: '', college_name: '', description: '', history: '', vision: '', mission: '', objectives: [], status: 'active' });
    const [editCollege, setEditCollege] = useState(null);
    const [formStep, setFormStep] = useState(1);
    const [objectiveInputs, setObjectiveInputs] = useState(['']);
    const [errors, setErrors] = useState({});
    const [deans, setDeans] = useState({ active: [], inactive: [] });
    const itemsPerPage = 4;
    const [activePage, setActivePage] = useState(0);
    const [inactivePage, setInactivePage] = useState(0);
    const [editDeanModalIsOpen, setEditDeanModalIsOpen] = useState(false);
    const [editDean, setEditDean] = useState(null);
    const [addDeanModalIsOpen, setAddDeanModalIsOpen] = useState(false);
    const [newDean, setNewDean] = useState({ name: '', title: '', email: '', status: 'active', image: null });

    useEffect(() => {
        fetchColleges();
    }, []);

    const openAddDeanModal = () => setAddDeanModalIsOpen(true);
    const closeAddMemberModal = () => {
        setAddDeanModalIsOpen(false);
        setNewDean({ name: '', title: '', email: '', status: 'active', image: null });
    };

    const handleAddNewDean = () => {
        const formData = new FormData();
        formData.append('name', newDean.name);
        formData.append('title', newDean.title);
        formData.append('email', newDean.email);
        formData.append('status', newDean.status);
        formData.append('image', newDean.image);
        formData.append('office_id', selectedCollegeId);

        axios.post('http://localhost:5000/about/deans', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                alert(response.data.message);
                fetchDean(selectedCollegeId);
                closeAddMemberModal();
            })
            .catch(error => {
                console.error("Error adding new member:", error);
                alert('Failed to add new member');
            });
    };

    const handleMemberInputChange = (e) => {
        const { name, value } = e.target;
        setNewDean((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        setNewDean((prev) => ({ ...prev, image: e.target.files[0] }));
    };


    const fetchColleges = () => {
        setLoading(true);
        axios.get('http://localhost:5000/about/college')
            .then(response => {
                setActiveColleges(response.data.active);
                setInactiveColleges(response.data.inactive);
            })
            .catch(error => console.error("Error fetching colleges:", error))
            .finally(() => setLoading(false));
    };

    const openAddModal = () => setAddModalIsOpen(true);
    const closeAddModal = () => {
        setAddModalIsOpen(false);
        resetForm();
    };

    const openUpdateModal = () => setUpdateModalIsOpen(true);
    const closeUpdateModal = () => setUpdateModalIsOpen(false);

    const resetForm = () => {
        setNewCollege({ college_id: '', college_name: '', description: '', history: '', vision: '', mission: '', objectives: [], status: 'active' });
        setObjectiveInputs(['']);
        setFormStep(1);
        setErrors({});
        setEditCollege(null);
    };

    const handleCollegeInputChange = (e) => {
        const { name, value } = e.target;
        if (editCollege) {
            setEditCollege(prev => ({ ...prev, [name]: value }));
        } else {
            setNewCollege(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleObjectiveChange = (index, value) => {
        const updatedObjectives = [...objectiveInputs];
        updatedObjectives[index] = value;
        setObjectiveInputs(updatedObjectives);
    };

    const addObjectiveInput = () => setObjectiveInputs([...objectiveInputs, '']);
    const removeObjectiveInput = (index) => {
        const updatedObjectives = objectiveInputs.filter((_, i) => i !== index);
        setObjectiveInputs(updatedObjectives);
    };

    const validateStep = () => {
        const newErrors = {};
        const currentCollege = editCollege || newCollege;

        if (formStep === 1) {
            if (!currentCollege.college_id) newErrors.college_id = 'College ID is required';
            if (!currentCollege.college_name) newErrors.college_name = 'College Name is required';
            if (!currentCollege.status) newErrors.status = 'Status is required';
        } else if (formStep === 2) {
            if (!currentCollege.description) newErrors.description = 'Description is required';
            if (!currentCollege.history) newErrors.history = 'History is required';
        } else if (formStep === 3) {
            if (!currentCollege.vision) newErrors.vision = 'Vision is required';
            if (!currentCollege.mission) newErrors.mission = 'Mission is required';
        } else if (formStep === 4) {
            if (objectiveInputs.some(input => !input.trim())) newErrors.objectives = 'Each objective must have text';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (validateStep()) {
            if (formStep === 3) {
                setTimeout(() => setFormStep(formStep + 1), 1000);
            } else {
                setFormStep(formStep + 1);
            }
        }
    };

    const handleOfficeChange = (e) => {
        const collegeId = e.target.value;
        setSelectedCollegeId(collegeId);
        fetchDean(collegeId);
    };

    const handleAddNewCollege = () => {
        if (!validateStep()) return;

        const collegeData = {
            ...newCollege,
            objectives: objectiveInputs.filter(input => input.trim() !== '')
        };

        axios.post('http://localhost:5000/about/college', collegeData)
            .then(response => {
                alert(response.data.message);
                fetchColleges();
                closeAddModal();
            })
            .catch(error => {
                console.error("Error adding new college:", error);
                alert('Failed to add new college');
            });
    };

    const handleEditCollege = (college) => {
        setEditCollege(college);
        setFormStep(1);
        setObjectiveInputs(college.objectives || ['']);
        openAddModal();
    };

    const handleUpdateCollege = () => {
        if (!validateStep()) return;

        const updatedCollege = {
            ...editCollege,
            objectives: objectiveInputs.filter(input => input.trim() !== '')
        };

        axios.put(`http://localhost:5000/about/college/${editCollege.college_id}`, updatedCollege)
            .then(response => {
                alert(response.data.message);
                fetchColleges();
                closeAddModal();
            })
            .catch(error => {
                console.error("Error updating college:", error);
                alert('Failed to update college');
            });
    };

    const handleDeleteCollege = (collegeId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this college?");
        if (isConfirmed) {
            axios.delete(`http://localhost:5000/about/college/${collegeId}`)
                .then(() => {
                    alert("College deleted successfully");
                    fetchColleges();
                })
                .catch(error => console.error("Error deleting college:", error));
        }
    };

    const fetchDean = (collegeId) => {
        setLoading(true);
        axios.get(`http://localhost:5000/about/deans?office_id=${collegeId}`)
            .then(response => {
                setDeans(response.data);
            })
            .catch(error => console.error("Error fetching dean:", error))
            .finally(() => setLoading(false));
    };

    const displayMembers = (members, page) => {
        const start = page * itemsPerPage;
        return members.slice(start, start + itemsPerPage);
    };

    const openEditMemberModal = (dean) => {
        setEditDean(dean);
        setEditDeanModalIsOpen(true);
    };

    const closeEditMemberModal = () => {
        setEditDean(null);
        setEditDeanModalIsOpen(false);
    };

    const handleEditMemberChange = (e) => {
        const { name, value } = e.target;
        setEditDean((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditDean = () => {
        const formData = new FormData();
        formData.append('name', editDean.name);
        formData.append('title', editDean.title);
        formData.append('email', editDean.email);
        formData.append('status', editDean.status);
        if (editDean.image instanceof File) {
            formData.append('image', editDean.image);
        }

        axios.put(`http://localhost:5000/about/deans/${editDean.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
            alert(response.data.message);
            fetchDean(selectedCollegeId);
            closeEditMemberModal();
        })
        .catch(error => {
            console.error("Error updating dean:", error);
            alert('Failed to update dean');
        });
    };

    const handleDeleteDean = (memberId) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
            axios.delete(`http://localhost:5000/about/deans/${memberId}`)
            .then(response => {
                alert(response.data.message);
                fetchDean(selectedCollegeId);
            })
            .catch(error => {
                console.error("Error deleting member:", error);
                alert('Failed to delete member');
            });
        }
    };

    const handlePageChange = (status, selectedItem) => {
        if (status === 'active') {
            setActivePage(selectedItem.selected);
        } else {
            setInactivePage(selectedItem.selected);
        }
    };

    return (
        <>
            <div className='w-full flex justify-between items-center mb-8'>
                <h2 className="text-2xl font-bold">Colleges</h2>
                <div className='flex gap-4'>
                    <button onClick={openAddModal} className="bg-blue-500 text-white py-2 px-4 rounded">Add College</button>
                    <button onClick={openUpdateModal} className="bg-blue-500 text-white py-2 px-4 rounded">Update Colleges</button>
                    {selectedCollegeId && (
                        <button onClick={openAddDeanModal} className="bg-blue-500 text-white py-2 px-4 rounded">Add New Dean</button>
                    )}
                </div>
            </div>

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
                        width: '600px',
                        maxWidth: '90%',
                        margin: '0 auto',
                        padding: '20px',
                        borderRadius: '10px',
                        background: 'white',
                    },
                }}
                ariaHideApp={false}
            >
                <h2 className="text-lg font-bold mb-4">Update Colleges</h2>
                <table className="w-full mb-4">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">College ID</th>
                            <th className="border px-4 py-2">College Name</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...activeColleges, ...inactiveColleges].map((college) => (
                            <tr key={college.college_id}>
                                <td className="border px-4 py-2">{college.college_id}</td>
                                <td className="border px-4 py-2">{college.college_name}</td>
                                <td className="border px-4 py-2">{college.status}</td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => handleEditCollege(college)} className="text-blue-500 mr-2">Edit</button>
                                    <button onClick={() => handleDeleteCollege(college.college_id)} className="text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal>

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
                        width: '500px',
                        maxWidth: '90%',
                        margin: '0 auto',
                        padding: '20px',
                        borderRadius: '10px',
                        background: 'white',
                    },
                }}
                ariaHideApp={false}
            >
                <h2 className="text-lg font-bold mb-4">{editCollege ? 'Edit College' : 'Add New College'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); editCollege ? handleUpdateCollege() : handleAddNewCollege(); }}>
                    {formStep === 1 && (
                        <>
                            <label className="block mb-2">
                                College ID:
                                <input type="text" name="college_id" value={(editCollege || newCollege).college_id} onChange={handleCollegeInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                                {errors.college_id && <p className="text-red-500 text-sm">{errors.college_id}</p>}
                            </label>
                            <label className="block mb-2">
                                College Name:
                                <input type="text" name="college_name" value={(editCollege || newCollege).college_name} onChange={handleCollegeInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                                {errors.college_name && <p className="text-red-500 text-sm">{errors.college_name}</p>}
                            </label>
                            <label className="block mb-4">
                                Status:
                                <select name="status" value={(editCollege || newCollege).status} onChange={handleCollegeInputChange} className="border rounded px-2 py-1 w-full mt-1">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                            </label>
                        </>
                    )}

                    {formStep === 2 && (
                        <>
                            <label className="block mb-4">
                                Description:
                                <textarea name="description" value={(editCollege || newCollege).description} onChange={handleCollegeInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                            </label>

                            <label className="block mb-4">
                                History:
                                <textarea name="history" value={(editCollege || newCollege).history} onChange={handleCollegeInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                                {errors.history && <p className="text-red-500 text-sm">{errors.history}</p>}
                            </label>
                        </>
                    )}

                    {formStep === 3 && (
                        <>
                            <label className="block mb-4">
                                Vision:
                                <textarea name="vision" value={(editCollege || newCollege).vision} onChange={handleCollegeInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                                {errors.vision && <p className="text-red-500 text-sm">{errors.vision}</p>}
                            </label>
                            <label className="block mb-4">
                                Mission:
                                <textarea name="mission" value={(editCollege || newCollege).mission} onChange={handleCollegeInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                                {errors.mission && <p className="text-red-500 text-sm">{errors.mission}</p>}
                            </label>
                        </>
                    )}

                    {formStep === 4 && (
                        <div className="mb-4">
                            <label className="block mb-2">Objectives:</label>
                            {objectiveInputs.map((objective, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={objective}
                                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                                        required
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                    {index > 0 && (
                                        <button type="button" onClick={() => removeObjectiveInput(index)} className="ml-2 text-red-500">Remove</button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={addObjectiveInput} className="text-blue-500">Add Objective</button>
                            {errors.objectives && <p className="text-red-500 text-sm">{errors.objectives}</p>}
                        </div>
                    )}

                    <div className="flex justify-between">
                        {formStep > 1 && (
                            <button type="button" onClick={() => setFormStep(formStep - 1)} className="bg-gray-300 text-black py-2 px-4 rounded">Previous</button>
                        )}
                        {formStep === 4 ? (
                            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">{editCollege ? 'Update' : 'Submit'}</button>
                        ) : (
                            <button type="button" onClick={handleNextStep} className="bg-blue-500 text-white py-2 px-4 rounded">Next</button>
                        )}
                    </div>
                </form>
            </Modal>

            <Modal
                isOpen={addDeanModalIsOpen}
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
                <h2 className="text-lg font-bold mb-4">Add New Dean</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleAddNewDean(); }}>
                    <label className="block mb-2">
                        Name:
                        <input type="text" name="name" value={newDean.name} onChange={handleMemberInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                    </label>
                    <label className="block mb-2">
                        Title:
                        <input type="text" name="title" value={newDean.title} onChange={handleMemberInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                    </label>
                    <label className="block mb-2">
                        Email:
                        <input type="email" name="email" value={newDean.email} onChange={handleMemberInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                    </label>
                    <label className="block mb-4">
                        Status:
                        <select name="status" value={newDean.status} onChange={handleMemberInputChange} className="border rounded px-2 py-1 w-full mt-1">
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

            <Modal
                isOpen={editDeanModalIsOpen}
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
                <h2 className="text-lg font-bold mb-4">Edit Dean</h2>
                {editDean && (
                    <form onSubmit={(e) => { e.preventDefault(); handleEditDean(); }}>
                        <label className="block mb-2">
                            Name:
                            <input type="text" name="name" value={editDean.name} onChange={handleEditMemberChange} required className="border rounded px-2 py-1 w-full mt-1" />
                        </label>
                        <label className="block mb-2">
                            Title:
                            <input type="text" name="title" value={editDean.title} onChange={handleEditMemberChange} required className="border rounded px-2 py-1 w-full mt-1" />
                        </label>
                        <label className="block mb-2">
                            Email:
                            <input type="email" name="email" value={editDean.email} onChange={handleEditMemberChange} required className="border rounded px-2 py-1 w-full mt-1" />
                        </label>
                        <label className="block mb-4">
                            Status:
                            <select name="status" value={editDean.status} onChange={handleEditMemberChange} className="border rounded px-2 py-1 w-full mt-1">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </label>
                        <label className="block mb-4">
                            Image:
                            <input type="file" onChange={(e) => setEditDean({ ...editDean, image: e.target.files[0] })} className="border rounded px-2 py-1 w-full mt-1" />
                        </label>
                        <div className="flex justify-end">
                            <button type="button" onClick={closeEditMemberModal} className="bg-gray-300 text-black py-2 px-4 rounded mr-2">Cancel</button>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                        </div>
                    </form>
                )}
            </Modal>

            <div className="mb-4 flex items-center justify-between">
                <label htmlFor="officeDropdown" className="mr-2">Select Active College:</label>
                <select id="officeDropdown" onChange={handleOfficeChange} className="border rounded px-2 py-1">
                    <option value="">Select College</option>
                    {activeColleges.map((college) => (
                        <option key={college.college_id} value={college.college_id}>{college.college_name}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-full"><p>Loading...</p></div>
            ) : selectedCollegeId ? (
                ['active', 'inactive'].map((status) => (
                    <div key={status} className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">{status === 'active' ? 'Active Members' : 'Inactive Members'}</h3>
                        {deans[status]?.length > 0 ? (
                            <ul className="space-y-4">
                                {displayMembers(deans[status], status === 'active' ? activePage : inactivePage).map(member => (
                                    <li key={member.id} className="border p-2 rounded flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <img src={`http://localhost:5000/${member.image}`} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                                            <div>
                                                <p className="font-semibold">{member.name}</p>
                                                <p className="text-sm text-gray-600">{member.title}</p>
                                                <p className="text-sm text-gray-600">{member.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditMemberModal(member)} className="bg-blue-500 text-white py-1 px-2 rounded">Edit</button>
                                            <button onClick={() => handleDeleteDean(member.id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-gray-500">No {status} deans</p>}
                        {deans[status]?.length > itemsPerPage && (
                            <ReactPaginate
                                previousLabel={'«'}
                                nextLabel={'»'}
                                breakLabel={'...'}
                                pageCount={Math.ceil(deans[status].length / itemsPerPage)}
                                onPageChange={(selectedItem) => handlePageChange(status, selectedItem)}
                                containerClassName={'flex justify-center mt-4 space-x-2'}
                                activeClassName={'font-bold text-blue-600'}
                                pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
                            />
                        )}
                    </div>
                ))
            ) : <p className="text-gray-500">Select a college to view deans.</p>}
        </>
    );
};

export default Colleges;