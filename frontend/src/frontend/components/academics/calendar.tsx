import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CalendarRow {
    id: number;
    term: string;
    event: string;
    start_date: string | null;
    end_date: string | null;
}

const Calendar = () => {
    const [semestralRows, setSemestralRows] = useState<CalendarRow[]>([]);
    const [trimestralRows, setTrimestralRows] = useState<CalendarRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRows = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const semestralResponse = await axios.get(`${import.meta.env.VITE_API_ROOT}/academic/calendar/semestral`);
            const trimestralResponse = await axios.get(`${import.meta.env.VITE_API_ROOT}/academic/calendar/trimestral`);

            const formatDate = (start: string | null, end: string | null) => {
                if (start && end) {
                    return `${new Date(start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${new Date(end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
                }
                if (start) {
                    return new Date(start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                }
                if (end) {
                    return new Date(end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                }
                return '';
            };

            const formatRows = (rows: CalendarRow[]) =>
                rows.map(row => ({
                    ...row,
                    start_date: formatDate(row.start_date, row.end_date),
                }));

            setSemestralRows(formatRows(semestralResponse.data));
            setTrimestralRows(formatRows(trimestralResponse.data));
        } catch (err) {
            setError("Failed to fetch data. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRows();
    }, []);

    const groupByEvent = (rows: CalendarRow[], terms: string[]) => {
        const grouped: { [event: string]: { [term: string]: string } } = {};

        rows.forEach(row => {
            if (!grouped[row.event]) grouped[row.event] = {};
            grouped[row.event][row.term] = row.start_date || '';
        });

        const sortedEvents = Object.keys(grouped).sort((a, b) => {
            if (a === "Semester Duration") return -1;
            if (b === "Semester Duration") return 1;
            return 0;
        });

        return sortedEvents.map(event => (
            <tr key={event} className="hover:bg-gray-100">
                <td className="p-4 border border-gray-300 text-left text-sm md:text-base">{event}</td>
                {terms.map(term => (
                    <td key={term} className="p-4 border border-gray-300 text-left text-sm md:text-base">{grouped[event][term] || ''}</td>
                ))}
            </tr>
        ));
    };

    return (
        <div className="w-full pt-8 px-4 md:px-12">
            {error && <p className="text-red-500 font-semibold">{error}</p>}
            {isLoading && <p className="text-gray-500 font-semibold">Loading...</p>}

            {!isLoading && (
                <>
                    <div className="overflow-x-auto mb-8">
                        <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="p-4 border border-gray-300 text-left text-sm md:text-base">Semestral</th>
                                    <th className="p-4 border border-gray-300 text-left text-sm md:text-base">First Semester</th>
                                    <th className="p-4 border border-gray-300 text-left text-sm md:text-base">Second Semester</th>
                                    <th className="p-4 border border-gray-300 text-left text-sm md:text-base">Midyear Term</th>
                                </tr>
                            </thead>
                            <tbody>{groupByEvent(semestralRows, ['First Semester', 'Second Semester', 'Midyear Term'])}</tbody>
                        </table>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="p-4 border border-gray-300 text-left text-sm md:text-base">Trimestral</th>
                                    <th className="p-4 border border-gray-300 text-left text-sm md:text-base">First Semester</th>
                                    <th className="p-4 border border-gray-300 text-left text-sm md:text-base">Second Semester</th>
                                    <th className="p-4 border border-gray-300 text-left text-sm md:text-base">Third Semester</th>
                                </tr>
                            </thead>
                            <tbody>{groupByEvent(trimestralRows, ['First Semester', 'Second Semester', 'Third Semester'])}</tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default Calendar;
