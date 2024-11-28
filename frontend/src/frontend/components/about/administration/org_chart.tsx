import { useState, useEffect } from 'react';
import axios from 'axios';

const OrganizationalChart = () => {
    const [chartPath, setChartPath] = useState<string | null>(null);
    const location = "OrganizationalChart";

    useEffect(() => {
        const fetchChart = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_ROOT}/home/photos/${location}`);
                if (response.data[0]?.file_path) {
                    setChartPath(response.data[0].file_path);
                } else {
                    setChartPath(null);
                }
            } catch (error) {
                console.error('Error fetching organizational chart:', error);
                setChartPath(null);
            }
        };

        fetchChart();
    }, [location]);

    return(
        <div className="w-full pt-8 pr-12">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[32px] text-navy-blue mb-4">
                ORGANIZATIONAL CHART
            </h1>

            <div>
                {chartPath ? (
                    <img
                        src={`${import.meta.env.VITE_API_ROOT}/${chartPath}`}
                        alt="Organizational Chart"
                        className="w-full h-[1000px] object-contain border rounded"
                    />
                ) : (
                    <p>No organizational chart found</p>
                )}
            </div>
        </div>
    )
}

export default OrganizationalChart;  