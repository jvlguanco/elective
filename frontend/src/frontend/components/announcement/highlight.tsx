import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import EventIcon from '@mui/icons-material/Event';

interface PostData {
    id: string;
    message: string;
    attachments: any;
    permalink_url: string;
    created_time: Date;
}

interface PostId {
    post_id: string;
}

const HighlightedAnnouncements = () => {
    const [postIds, setPostIds] = useState<PostId[] | null>(null);
    const [postDetails, setPostDetails] = useState<PostData[] | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoadingPostIds, setIsLoadingPostIds] = useState(true);
    const [isLoadingPostDetails, setIsLoadingPostDetails] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    const fetchPostIds = () => {
        setIsLoadingPostIds(true);
        axios.get(`${import.meta.env.VITE_API_ROOT}/facebook/highlighted-post`)
            .then((response) => {
                setPostIds(response.data.data);
                setAccessToken(response.data.token);
                setIsLoadingPostIds(false);
            })
            .catch((error) => {
                console.error('Error fetching post IDs:', error);
                setIsLoadingPostIds(false);
            });
    };

    useEffect(() => {
        fetchPostIds();
    }, []);

    useEffect(() => {
        if (postIds && accessToken) {
            const fetchPosts = async () => {
                const requests = postIds.map((post) => {
                    return axios.get(
                        `https://graph.facebook.com/v21.0/${post.post_id}?fields=id,message,attachments,permalink_url,created_time&access_token=${accessToken}`
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

    if (isLoadingPostIds || isLoadingPostDetails) {
        return (
            <div className="text-center py-6 w-full">Loading...</div>
        );
    }

    const displayPosts = postDetails ? postDetails.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];

    const handleView = (post_url: string) => {
        window.open(post_url, '_blank');
    };

    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-4 w-full">
    {displayPosts?.map((post, index) => {
        const [title, ...restSections] = post.message.split('\n\n');
        const remainingText = restSections.join('\n\n');
        const image = post.attachments.data[0].media.image.src;

        return (
            <div
                key={index}
                className="shadow-xl rounded-lg w-full h-[425px] overflow-hidden flex flex-col"
            >
                <img
                    src={image}
                    alt=""
                    className="h-[200px] w-full object-cover"
                />
                <div className="p-4 flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-inter font-semibold text-[16px]">
                            {title}
                        </h1>
                        <p className="text-[14px] line-clamp-4 overflow-hidden text-ellipsis">
                            {remainingText}
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <span
                            className="text-red-600 cursor-pointer hover:underline font-inter font-semibold text-[14px]"
                            onClick={() => handleView(post.permalink_url)}
                        >
                            View Post
                        </span>
                        <div className="flex gap-2 items-center">
                            <EventIcon style={{ fontSize: 20, color: 'black' }} />
                            <p className="text-[14px] font-inter">
                                {format(post.created_time, 'MMMM d, yyyy')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    })}
</div>
      );
}

export default HighlightedAnnouncements;