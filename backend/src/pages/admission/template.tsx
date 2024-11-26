import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admission = ({ id }) => {
    const [admissionData, setAdmissionData] = useState({
        name: "",
        description: "",
        requirements: "",
        qualifications: "",
        process: "",
        email: "",
        status: "close",
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchAdmission = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/admission/information/${id}`);
                setAdmissionData(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchAdmission();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "requirements" || name === "qualifications") {
            const formattedValue = value
                .split("\n")
                .map((line) => (line.trim() ? (line.trim().startsWith("-") ? line : `- ${line}`) : ""))
                .join("\n");
            setAdmissionData((prev) => ({ ...prev, [name]: formattedValue }));
        } else if (name === "process") {
            const formattedValue = value
                .split("\n")
                .map((line, index) =>
                    line.trim() ? (line.trim().match(/^\d+\./) ? line : `${index + 1}. ${line}`) : ""
                )
                .join("\n");
            setAdmissionData((prev) => ({ ...prev, [name]: formattedValue }));
        } else {
            setAdmissionData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleStatusChange = async () => {
        try {
            const updatedStatus = admissionData.status === "open" ? "close" : "open";
            await axios.patch(`http://localhost:5000/admission/information/${id}/status`, { status: updatedStatus });
            setAdmissionData((prev) => ({ ...prev, status: updatedStatus }));
            alert("Status Changed");
        } catch (err) {
            alert(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/admission/information/${id}`, admissionData);
            alert("Admission updated successfully.");
        } catch (err) {
            console.error(err);
            setErrors(err.response?.data?.errors || {});
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold">{admissionData.name}</h2>

                <button
                    type="button"
                    onClick={handleStatusChange}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                    aria-label="Change Admission Status"
                >
                    Change Status
                </button>

                <h2 className="text-lg font-semibold text-gray-700">
                    Current Status: {admissionData.status.toUpperCase()}
                </h2>
            </div>

            <div className="flex gap-4 justify-between w-full">
                <div className="w-1/2">
                    <label className="block mb-4">
                        Description:
                        <textarea
                            name="description"
                            value={admissionData.description}
                            onChange={handleInputChange}
                            required
                            className="border h-72 rounded px-2 py-1 w-full mt-1"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description}</p>
                        )}
                    </label>
                </div>

                <div className="w-1/2">
                    <label className="block mb-4">
                        Requirements (Bullet Points):
                        <textarea
                            name="requirements"
                            value={admissionData.requirements}
                            onChange={handleInputChange}
                            required
                            className="border h-72 rounded px-2 py-1 w-full mt-1"
                        />
                        {errors.requirements && (
                            <p className="text-red-500 text-sm">{errors.requirements}</p>
                        )}
                    </label>
                </div>
            </div>

            <div className="flex gap-4 justify-between w-full">
                <div className="w-1/2">
                    <label className="block mb-4">
                        Qualifications (Bullet Points):
                        <textarea
                            name="qualifications"
                            value={admissionData.qualifications}
                            onChange={handleInputChange}
                            required
                            className="border h-72 rounded px-2 py-1 w-full mt-1"
                        />
                        {errors.qualifications && (
                            <p className="text-red-500 text-sm">{errors.qualifications}</p>
                        )}
                    </label>
                </div>

                <div className="w-1/2">
                    <label className="block mb-4">
                        Application Process (Numbered):
                        <textarea
                            name="process"
                            value={admissionData.process}
                            onChange={handleInputChange}
                            required
                            className="border h-72 rounded px-2 py-1 w-full mt-1"
                        />
                        {errors.process && (
                            <p className="text-red-500 text-sm">{errors.process}</p>
                        )}
                    </label>
                </div>
            </div>

            <div className="flex justify-between w-full">
                <div className="flex items-center gap-4">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={admissionData.email}
                        onChange={handleInputChange}
                        required
                        className="border rounded px-2 py-1 w-full mt-1"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Update
                </button>
            </div>

            {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
        </form>
    );
};

export default Admission;