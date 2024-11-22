import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

interface BidItem {
    id: number;
    title: string;
    file: string;
}

const BidItem = () => {
    const [bidItems, setBidItems] = useState<{ items: BidItem[] }>({
        items: [],
    });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const itemsPerPage = 10;

    const fetchBidItem = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/bid/bid-items');
            setBidItems({ items: res.data });
        } catch (err) {
            console.error(err);
            alert('Error fetching bid items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBidItem();
    }, []);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected);
    };

    const displayItems = (items: BidItem[], page: number) =>
        items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <div className="w-full pt-8 px-12">
            <h1 className="pb-2 border-b-2 border-gray-400 font-inter font-semibold text-[32px] text-navy-blue mb-12">
                Bid Items
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="mb-6">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-2 border border-gray-200">Bid Description</th>
                                <th className="p-2 border border-gray-200">File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayItems(bidItems.items, page).map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-2 border border-gray-200">{item.title}</td>
                                    <td className="p-2 border border-gray-200">
                                        <a
                                            href={`http://localhost:5000/${item.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            View Bid
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {bidItems.items.length > itemsPerPage && (
                        <ReactPaginate
                            previousLabel={'«'}
                            nextLabel={'»'}
                            breakLabel={'...'}
                            pageCount={Math.ceil(bidItems.items.length / itemsPerPage)}
                            onPageChange={handlePageChange}
                            containerClassName={'flex justify-center mt-4 space-x-2'}
                            activeClassName={'font-bold text-blue-600'}
                            pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default BidItem;