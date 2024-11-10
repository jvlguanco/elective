import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const Colleges = () => {
    const [activeColleges, setActiveColleges] = useState([]);
    const [inactiveColleges, setInactiveColleges] = useState([]);
    const [selectedCollegeId, setSelectedCollegeId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [newCollege, setNewCollege] = useState({college_id: '', college_name: '', description: '', history: '', vision: '', mission: '', objectives: [], status:'active'});
    const [formStep, setFormStep] = useState(1);
    const [objectiveInputs, setObjectiveInputs] = useState(['']);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchOffices();
    }, []);

    const fetchOffices = () => {
        axios.get('http://localhost:5000/about/college')
            .then(response => {
                setActiveColleges(response.data.active);
                setInactiveColleges(response.data.inactive);
            })
            .catch(error => console.error("Error fetching offices:", error))
            .finally(() => setLoading(false));
    };

    const openAddModal = () => setAddModalIsOpen(true);
    const closeAddModal = () => {
        setAddModalIsOpen(false);
        setNewCollege({college_id: '', college_name: '', description: '', history: '', vision: '', mission: '', objectives: [], status:'active'});
        setObjectiveInputs(['']);
        setFormStep(1);
        setErrors({});
    };

    const handleCollegeInputChange = (e) => {
        const { name, value } = e.target;
        setNewCollege((prev) => ({ ...prev, [name]: value }));
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

        if (formStep === 1) {
            if (!newCollege.college_id) newErrors.college_id = 'College ID is required';
            if (!newCollege.college_name) newErrors.college_name = 'College Name is required';
            if (!newCollege.status) newErrors.status = 'Status is required';
        } else if (formStep === 2) {
            if (!newCollege.description) newErrors.description = 'Description is required';
            if (!newCollege.history) newErrors.history = 'History is required';
        } else if (formStep === 3) {
            if (!newCollege.vision) newErrors.vision = 'Vision is required';
            if (!newCollege.mission) newErrors.mission = 'Mission is required';
        } else if (formStep === 4) {
            if (objectiveInputs.some(input => !input.trim())) newErrors.objectives = 'Each objective must have text';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (validateStep()) {
            setFormStep(formStep + 1);
        }
    };

    const handleOfficeChange = (e) => {
        const collegeId = e.target.value;
        setSelectedCollegeId(collegeId);
        // fetchMembers(officeId);
    };

    const handleAddNewOffice = () => {
        if (!validateStep()) return;

        const collegeData = {
            ...newCollege,
            objectives: objectiveInputs.filter(input => input.trim() !== '').join(';')
        };
    
        axios.post('http://localhost:5000/about/college', collegeData)
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

    return (
        <>
            <div className='w-full flex justify-between items-center mb-8'>
                <h2 className="text-2xl font-bold">Colleges</h2>
                <div className='flex gap-4'>
                    <button onClick={openAddModal} className="bg-blue-500 text-white py-2 px-4 rounded">Add College</button>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded">Update Colleges</button>
                    
                    {selectedCollegeId && (
                        <button className="bg-blue-500 text-white py-2 px-4 rounded">Add Dean</button>
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
                <h2 className="text-lg font-bold mb-4">Add New College</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleAddNewOffice(); }}>
                    {formStep === 1 && (
                        <>
                            <label className="block mb-2">
                                College ID:
                                <input type="text" name="college_id" value={newCollege.college_id} onChange={handleCollegeInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                                {errors.college_id && <p className="text-red-500 text-sm">{errors.college_id}</p>}
                            </label>
                            <label className="block mb-2">
                                College Name:
                                <input type="text" name="college_name" value={newCollege.college_name} onChange={handleCollegeInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                                {errors.college_name && <p className="text-red-500 text-sm">{errors.college_name}</p>}
                            </label>
                            <label className="block mb-4">
                                Status:
                                <select name="status" value={newCollege.status} onChange={handleCollegeInputChange} className="border rounded px-2 py-1 w-full mt-1">
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
                                <textarea name="description" value={newCollege.description} onChange={handleCollegeInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                            </label>

                            <label className="block mb-4">
                                History:
                                <textarea name="history" value={newCollege.history} onChange={handleCollegeInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                                {errors.history && <p className="text-red-500 text-sm">{errors.history}</p>}
                            </label>
                        </>
                    )}

                    {formStep === 3 && (
                        <>
                            <label className="block mb-4">
                                Vision:
                                <textarea name="vision" value={newCollege.vision} onChange={handleCollegeInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
                                {errors.vision && <p className="text-red-500 text-sm">{errors.vision}</p>}
                            </label>
                            <label className="block mb-4">
                                Mission:
                                <textarea name="mission" value={newCollege.mission} onChange={handleCollegeInputChange} required className="border rounded px-2 py-1 w-full mt-1" />
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
                        {formStep < 4 ? (
                            <button type="button" onClick={handleNextStep} className="bg-blue-500 text-white py-2 px-4 rounded">Next</button>
                        ) : (
                            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Submit</button>
                        )}
                    </div>
                </form>
            </Modal>

            <div className="mb-4 flex items-center justify-between">
                <label htmlFor="officeDropdown" className="mr-2">Select Active Office:</label>
                <select id="officeDropdown" onChange={handleOfficeChange} className="border rounded px-2 py-1">
                    <option value="">Select Office</option>
                    {activeColleges.map((college) => (
                        <option key={college.college_id} value={college.college_id}>{college.college_name}</option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Colleges;
