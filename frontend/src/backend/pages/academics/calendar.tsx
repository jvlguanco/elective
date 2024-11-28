import React, { useState, useEffect } from "react";
import axios from "axios";

interface CalendarRow {
    id: number;
    term: string;
    event: string;
    start_date: string | null;
    end_date: string | null;
}

interface EditableTableProps {
    type: "semestral" | "trimestral";
}

const Calendar: React.FC<EditableTableProps> = ({ type }) => {
    const [rows, setRows] = useState<CalendarRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRows = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_ROOT}/academic/calendar/${type}`);
            const formattedRows = response.data.map((row: CalendarRow) => ({
                ...row,
                start_date: row.start_date ? new Date(row.start_date).toLocaleDateString('en-CA') : null,
                end_date: row.end_date ? new Date(row.end_date).toLocaleDateString('en-CA') : null,
            }));
            setRows(formattedRows);
        } catch (err) {
            setError("Failed to fetch data. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRows();
    }, [type]);

    const handleDateChange = (id: number, field: "start_date" | "end_date", value: string) => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    };

    const saveAllRows = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_API_ROOT}/academic/calendar`, rows);
            alert("All rows updated successfully!");
        } catch (err) {
            console.error("Failed to save rows:", err);
            alert("Failed to update rows.");
        }
    };

    const groupedRows = rows.reduce<Record<string, CalendarRow[]>>((acc, row) => {
        acc[row.term] = acc[row.term] || [];
        acc[row.term].push(row);
        return acc;
    }, {});

    Object.keys(groupedRows).forEach((term) => {
        groupedRows[term] = groupedRows[term].sort((a, b) => {
            if (a.event === "Semester Duration") return -1;
            if (b.event === "Semester Duration") return 1;
            return a.id - b.id;
        });
    });

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Calendar
                </h2>
                <div className="mt-4 text-right">
                    <button
                        onClick={saveAllRows}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Save All
                    </button>
                </div>
            </div>
            
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div>
                    <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="p-2 border border-gray-300 w-1/6 text-left">Term</th>
                                <th className="p-2 border border-gray-300 w-2/6 text-left">Event</th>
                                <th className="p-2 border border-gray-300 w-1/6 text-left">Start Date</th>
                                <th className="p-2 border border-gray-300 w-1/6 text-left">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(groupedRows).map(([term, rows]) => (
                                <React.Fragment key={term}>
                                    <tr className="bg-gray-100">
                                        <td
                                            colSpan={4}
                                            className="font-bold text-left px-2 py-1 border border-gray-300"
                                        >
                                            {term}
                                        </td>
                                    </tr>
                                    {rows.map((row) => (
                                        <tr
                                            key={row.id}
                                            className="hover:bg-gray-50 transition duration-150"
                                        >
                                            <td className="p-2 border border-gray-300">{row.term}</td>
                                            <td className="p-2 border border-gray-300">{row.event}</td>
                                            <td className="p-2 border border-gray-300">
                                                <input
                                                    type="date"
                                                    className="border border-gray-300 rounded p-1 w-full"
                                                    value={row.start_date || ""}
                                                    onChange={(e) =>
                                                        handleDateChange(
                                                            row.id,
                                                            "start_date",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                                <input
                                                    type="date"
                                                    className="border border-gray-300 rounded p-1 w-full"
                                                    value={row.end_date || ""}
                                                    onChange={(e) =>
                                                        handleDateChange(
                                                            row.id,
                                                            "end_date",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Calendar;