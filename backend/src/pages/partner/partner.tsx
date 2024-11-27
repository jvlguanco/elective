import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Partner = () => {
    const [partnerData, setPartnerData] = useState({
        description: "",
        individuals: "",
        providers: "",
        how: "",
        who: "",
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/other/partner`);
                setPartnerData(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchPartner();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "providers" || name === "individuals") {
            const formattedValue = value
                .split("\n")
                .map((line) => (line.trim() ? (line.trim().startsWith("-") ? line : `- ${line}`) : ""))
                .join("\n");
            setPartnerData((prev) => ({ ...prev, [name]: formattedValue }));
        } else {
            setPartnerData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/other/partner`, partnerData);
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
            <h2 className="text-2xl font-bold mb-4">Edit Partner</h2>

            <div className="flex flex-col gap-4">
                <label className="block mb-2">
                    Description:
                    <textarea
                        name="description"
                        value={partnerData.description}
                        onChange={handleInputChange}
                        required
                        className="border rounded px-2 py-1 w-full mt-1 h-44"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description}</p>
                    )}
                </label>

                <label className="block mb-2">
                    Individuals (Bullet Points):
                    <textarea
                        name="individuals"
                        value={partnerData.individuals}
                        onChange={handleInputChange}
                        required
                        className="border rounded px-2 py-1 w-full mt-1 h-44"
                    />
                    {errors.individuals && (
                        <p className="text-red-500 text-sm">{errors.individuals}</p>
                    )}
                </label>

                <label className="block mb-2">
                    Scholarship Providers (Bullet Points):
                    <textarea
                        name="providers"
                        value={partnerData.providers}
                        onChange={handleInputChange}
                        required
                        className="border rounded px-2 py-1 w-full mt-1 h-44"
                    />
                    {errors.providers && (
                        <p className="text-red-500 text-sm">{errors.providers}</p>
                    )}
                </label>

                <label className="block mb-2">
                    How are scholars selected:
                    <textarea
                        name="how"
                        value={partnerData.how}
                        onChange={handleInputChange}
                        required
                        className="border rounded px-2 py-1 w-full mt-1 h-44"
                    />
                    {errors.how && (
                        <p className="text-red-500 text-sm">{errors.how}</p>
                    )}
                </label>

                <label className="block mb-2">
                    Who can become scholarship providers:
                    <textarea
                        name="who"
                        value={partnerData.who}
                        onChange={handleInputChange}
                        required
                        className="border rounded px-2 py-1 w-full mt-1 h-44"
                    />
                    {errors.who && (
                        <p className="text-red-500 text-sm">{errors.who}</p>
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

export default Partner;