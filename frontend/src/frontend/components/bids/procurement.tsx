import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

interface ProcurementPlan {
    id: number;
    title: string;
    file: string;
}

const Procurement = () => {
    const [procurementPlans, setProcurementPlans] = useState<{ items: ProcurementPlan[] }>({
        items: [],
    });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const itemsPerPage = 10;

    const fetchProcurementPlans = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_ROOT}/bid/procurement`);
            setProcurementPlans({ items: res.data });
        } catch (err) {
            console.error(err);
            alert('Error fetching procurement plans');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProcurementPlans();
    }, []);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected);
    };

    const displayItems = (items: ProcurementPlan[], page: number) =>
        items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <div className="w-full pt-8 px-4 md:px-12">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[24px] md:text-[32px] text-navy-blue mb-6">
                Annual Procurement Plan
            </h1>

            <p className="mb-8 text-sm md:text-base">
                The Annual Procurement Plan (APP) reflects the university's procurement activities for a specific calendar year.<br /><br />
                The plan, along with other pertinent procurement-related documents, is publicly available on PLM's website for transparency and accountability, as prescribed by Republic Act No. 9184 or the Government Procurement Reform Act.
            </p>

            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500 font-semibold">Loading...</p>
                </div>
            ) : (
                <>
                    {procurementPlans.items.length > 0 ? (
                        <div className="mb-6">
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="p-2 border border-gray-300 text-sm md:text-base">Procurement Plan</th>
                                        <th className="p-2 border border-gray-300 text-sm md:text-base">File</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayItems(procurementPlans.items, page).map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="p-2 border border-gray-300 text-sm md:text-base">{item.title}</td>
                                            <td className="p-2 border border-gray-300 text-sm md:text-base">
                                                <a
                                                    href={`${import.meta.env.VITE_API_ROOT}/${item.file}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:text-blue-600"
                                                >
                                                    View Procurement
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {procurementPlans.items.length > itemsPerPage && (
                                <ReactPaginate
                                    previousLabel={'«'}
                                    nextLabel={'»'}
                                    breakLabel={'...'}
                                    pageCount={Math.ceil(procurementPlans.items.length / itemsPerPage)}
                                    onPageChange={handlePageChange}
                                    containerClassName={'flex justify-center mt-4 space-x-2'}
                                    activeClassName={'font-bold text-blue-600'}
                                    pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
                                />
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-500 font-semibold mt-4">No procurement plans available.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Procurement;