import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrivacyPolicy = () => {
    const [policyData, setPolicyData] = useState({
        policy: "",
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/other/policy`);
                setPolicyData(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchPolicy();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPolicyData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/other/policy`, policyData);
            setSuccess("Partner updated successfully.");
            setErrors({});
        } catch (err) {
            console.error(err);
            setErrors(err.response?.data?.errors || {});
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Edit Privacy Policy</h2>

            <div className="flex flex-col gap-4">
                <label className="block mb-2">
                    <textarea
                        name="policy"
                        value={policyData.policy}
                        onChange={handleInputChange}
                        required
                        className="border rounded px-2 py-1 w-full mt-1 h-96"
                    />
                    {errors.policy && (
                        <p className="text-red-500 text-sm">{errors.policy}</p>
                    )}
                </label>
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            >
                Update
            </button>

            {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
        </form>
    );
};

export default PrivacyPolicy;