import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

interface PostData {
    id: string;
    message: string;
    attachments: any;
    permalink_url: string;
}

interface PostId {
    post_id: string;
}

const NormalPostTable = () => {
    const [postIds, setPostIds] = useState<PostId[] | null>(null);
    const [postDetails, setPostDetails] = useState<PostData[] | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoadingPostIds, setIsLoadingPostIds] = useState(true);
    const [isLoadingPostDetails, setIsLoadingPostDetails] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 7;

    useEffect(() => {
        axios.get('http://localhost:5000/facebook/time-post')
            .then((response) => {
                setPostIds(response.data.data);
                setAccessToken(response.data.token);
                setIsLoadingPostIds(false);
            })
            .catch((error) => {
                console.error('Error fetching about data:', error);
                setIsLoadingPostIds(false);
            });
    }, []);

    useEffect(() => {
        if (postIds && accessToken) {
            const fetchPosts = async () => {
                const requests = postIds.map((post) => {
                    return axios.get(
                        `https://graph.facebook.com/v21.0/${post.post_id}?fields=id,message,attachments,permalink_url&access_token=${accessToken}`
                    );
                });

                try {
                    const responses = await Promise.all(requests);
                    const postData = responses.map((response) => response.data);
                    setPostDetails(postData);
                    setIsLoadingPostDetails(false);
                } catch (error) {
                    console.error('Error fetching posts:', error);
                    setIsLoadingPostDetails(false);
                }
            };
            fetchPosts();
        }
    }, [postIds, accessToken]);

    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const displayPosts = postDetails ? postDetails.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];

    const handleView = (post_url: string) => {
        window.open(post_url, '_blank');
    };

    const handleDelete = (postId: string) => {
        console.log(`Deleting post with ID: ${postId}`);
    };

    if (isLoadingPostIds || isLoadingPostDetails) {
        return <div className="text-center py-6 text-gray-500">Loading...</div>;
    }

    if (!postDetails || postDetails.length === 0) {
        return <div className="text-center py-6 text-gray-500">No posts available</div>;
    }

    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="px-6 py-3 border-b font-semibold">Post ID</th>
                        <th className="px-6 py-3 border-b font-semibold">Title</th>
                        <th className="px-6 py-3 border-b font-semibold">Attachments</th>
                        <th className="px-6 py-3 border-b font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-100 transition duration-150">
                            <td className="px-6 py-4 border-b text-center text-gray-700">{post.id}</td>
                            <td className="px-6 py-4 border-b text-gray-700">
                                {post.message.split('\n\n')[0] || "No Title"}
                            </td>
                            <td className="px-6 py-4 border-b text-center text-gray-700">
                                {post.attachments?.data[0].subattachments
                                    ? post.attachments.data[0].subattachments.data.length
                                    : 1}
                            </td>
                            <td className="px-6 py-4 border-b text-center">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 mr-2 rounded hover:bg-blue-600 transition duration-150"
                                    onClick={() => handleView(post.permalink_url)}
                                >
                                    View
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-150"
                                    onClick={() => handleDelete(post.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {postDetails.length > itemsPerPage && (
                <div className="mt-6 flex justify-center">
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={Math.ceil(postDetails.length / itemsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'flex items-center space-x-1'}
                        activeClassName={'font-bold text-blue-600'}
                        pageClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100"
                        pageLinkClassName="text-gray-700"
                        activeLinkClassName="text-blue-600 font-semibold"
                        previousClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100"
                        nextClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100"
                    />
                </div>
            )}
        </div>
    );
};

export default NormalPostTable;