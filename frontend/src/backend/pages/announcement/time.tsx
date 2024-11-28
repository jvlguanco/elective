import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { format } from 'date-fns';

interface PostData {
    id: string;
    message: string;
    attachments: any;
    permalink_url: string;
    end_date: Date
}

interface PostId {
    post_id: string;
    end_date: Date
}

const TimePostTable = () => {
    const [postIds, setPostIds] = useState<PostId[] | null>(null);
    const [postDetails, setPostDetails] = useState<PostData[] | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoadingPostIds, setIsLoadingPostIds] = useState(true);
    const [isLoadingPostDetails, setIsLoadingPostDetails] = useState(true);
    const [isDeletingPost, setIsDeletingPost] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const currentDate = new Date();
    const itemsPerPage = 7;

    const fetchPostIds = () => {
        setIsLoadingPostIds(true);
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
    };

    useEffect(() => {
        fetchPostIds();
    }, []);

    useEffect(() => {
        if (postIds && accessToken) {
            const fetchPosts = async () => {
                const requests = postIds.map((post) =>
                    axios.get(
                        `https://graph.facebook.com/v21.0/${post.post_id}?fields=id,message,attachments,permalink_url,created_time&access_token=${accessToken}`
                    ).then((response) => ({
                        ...response.data,
                        end_date: new Date(post.end_date)
                    }))
                );
    
                try {
                    const responses = await Promise.all(requests);
                    setPostDetails(responses);
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

    const handleDelete = async (postId: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        setIsDeletingPost(true);

        try {
            await axios.delete(`http://localhost:5000/facebook/delete/${postId}`);
            alert("Post deleted successfully.");
            fetchPostIds(); // Re-fetch the posts to update the list
        } catch (error) {
            alert("Error deleting post.");
            console.error('Error deleting post:', error);
        } finally {
            setIsDeletingPost(false);
        }
    };

    if (isLoadingPostIds || isLoadingPostDetails || isDeletingPost) {
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
                        <th className="px-6 py-3 border-b font-semibold">End Date</th>
                        <th className="px-6 py-3 border-b font-semibold">Status</th>
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
                            <td className="px-6 py-4 border-b text-center text-gray-700">{format(post.end_date, "MMMM d, yyyy")}</td>
                            <td className="px-6 py-4 border-b text-center text-gray-700">{currentDate > post.end_date ? 'Expired' : 'Ongoing'}
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
                                    disabled={isDeletingPost}
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

export default TimePostTable;