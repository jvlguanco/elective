import EventIcon from '@mui/icons-material/Event';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { NavLink } from 'react-router-dom';

interface PostData {
    id: string;
    message: string;
    attachments: any;
    permalink_url: string;
}

interface PostId {
    post_id: string;
}

const AnnouncementSection = () => {
    const [postIds, setPostIds] = useState<PostId[] | null>(null);
    const [highlightIds, setHighlightIds] = useState<PostId[] | null>(null);
    const [postDetails, setPostDetails] = useState<PostData[] | null>(null);
    const [highlightDetails, setHighlightDetails] = useState<PostData[] | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchPostIds = async () => {
        try {
            setIsLoading(true);
            const [allPostsResponse, announcementPostsResponse] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_ROOT}/facebook/all-post`),
                axios.get(`${import.meta.env.VITE_API_ROOT}/facebook/announcement-post`)
            ]);

            if (allPostsResponse.data.data[0] && announcementPostsResponse.data.data) {
                setPostIds(allPostsResponse.data.data[0]);
                setHighlightIds(announcementPostsResponse.data.data);
                setAccessToken(allPostsResponse.data.token);
            } else {
                setErrorMessage('No posts available.');
            }
        } catch (error) {
            console.error('Error fetching post IDs:', error);
            setErrorMessage('Failed to fetch posts. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPosts = async () => {
        if (!postIds || !highlightIds || !accessToken) return;

        try {
            const mainPostResponse = await axios.get(
                `https://graph.facebook.com/v21.0/${postIds.post_id}?fields=id,message,attachments,permalink_url,created_time&access_token=${accessToken}`
            );

            setPostDetails([mainPostResponse.data]);

            const highlightRequests = highlightIds.map((post) =>
                axios.get(
                    `https://graph.facebook.com/v21.0/${post.post_id}?fields=id,message,attachments,permalink_url,created_time&access_token=${accessToken}`
                )
            );

            const highlightResponses = await Promise.all(highlightRequests);
            setHighlightDetails(highlightResponses.map((response) => response.data));
        } catch (error) {
            console.error('Error fetching posts:', error);
            setErrorMessage('Failed to fetch posts from Facebook API. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPostIds();
    }, []);

    useEffect(() => {
        if (!isLoading && postIds && highlightIds && accessToken) {
            fetchPosts();
        }
    }, [isLoading, postIds, highlightIds, accessToken]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>{errorMessage}</p>
            </div>
        );
    }

    if (!postDetails || !postDetails.length || !highlightDetails || !highlightDetails.length) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>No posts available.</p>
            </div>
        );
    }

    const [firstSection, ...restSections] = postDetails[0].message.split('\n\n');
    const remainingText = restSections.join('\n\n');

    const handleView = (post_url: string) => {
        window.open(post_url, '_blank');
    };

    return (
        <div className="px-4 sm:px-12 mt-10 flex flex-col gap-6 sm:gap-10 sm:flex-row">
            {/* Latest News Section */}
            <div className="flex flex-col w-full sm:w-1/2">
                <h1 className="font-inter text-navy-blue font-bold text-[22px] sm:text-[28px] mb-2">
                    LATEST NEWS
                </h1>
                <img
                    src={postDetails[0].attachments.data[0].media.image.src}
                    alt=""
                    className="w-full h-[200px] sm:h-[450px] object-cover"
                />
                <h3 className="font-inter font-bold text-[16px] sm:text-[22px]">
                    {firstSection}
                </h3>
                <p className="text-[12px] sm:text-[15px] line-clamp-4 overflow-hidden text-ellipsis">
                    {remainingText}
                </p>
                <div className="w-full flex justify-between mt-4 sm:mt-8">
                    <span
                        className="text-red-600 cursor-pointer hover:underline font-inter font-semibold text-sm sm:text-base"
                        onClick={() => handleView(postDetails[0].permalink_url)}
                    >
                        View Post
                    </span>
                    <div className="flex gap-4 items-center justify-center">
                        <EventIcon style={{ fontSize: 16, color: 'black' }} />
                        <p className="text-[12px] sm:text-[15px]">
                            {format(postDetails[0].created_time, 'MMMM d, yyyy')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Highlighted News Section */}
            <div className="flex flex-col w-full sm:w-1/2">
                <h1 className="font-inter text-navy-blue font-bold text-[22px] sm:text-[28px] mb-2">
                    HIGHLIGHTED NEWS
                </h1>
                <div className="flex flex-col gap-4">
                    {highlightDetails.map((post, index) => {
                        const [firstSection, ...restSections] = post.message.split('\n\n');
                        const remainingText = restSections.join('\n\n');

                        return (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row gap-4 pb-4 border-b-2 border-black"
                            >
                                <img
                                    src={post.attachments.data[0].media.image.src}
                                    className="w-full sm:w-2/5 h-[150px] sm:h-[165px] object-cover"
                                />
                                <div className="flex flex-col justify-between w-full">
                                    <div>
                                        <h3 className="font-inter font-bold text-[16px] sm:text-[18px]">
                                            {firstSection}
                                        </h3>
                                        <p className="text-[12px] sm:text-[15px] line-clamp-4">
                                            {remainingText}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span
                                            className="text-red-600 cursor-pointer hover:underline font-inter font-semibold"
                                            onClick={() => handleView(post.permalink_url)}
                                        >
                                            View Post
                                        </span>
                                        <div className="flex gap-2 items-center">
                                            <EventIcon style={{ fontSize: 16, color: 'black' }} />
                                            <p className="text-[12px] sm:text-[15px]">
                                                {format(post.created_time, 'MMMM d, yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <NavLink
                    to="/announcement"
                    className="bg-navy-blue px-4 py-2 rounded-full flex items-center justify-center w-fit font-inter font-semibold text-yellow-500 mt-4"
                >
                    View All Announcements
                </NavLink>
            </div>
        </div>
    );
};

export default AnnouncementSection;