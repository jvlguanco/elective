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
    end_date: Date;
}

interface PostId {
    post_id: string;
    end_date: Date;
}

const TimeAnnouncements = () => {
    const [postIds, setPostIds] = useState<PostId[] | null>(null);
    const [postDetails, setPostDetails] = useState<PostData[] | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoadingPostIds, setIsLoadingPostIds] = useState(true);
    const [isLoadingPostDetails, setIsLoadingPostDetails] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    const fetchPostIds = () => {
        setIsLoadingPostIds(true);
        axios.get(`${import.meta.env.VITE_API_ROOT}/facebook/time-post`)
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
                    ).then((response) => ({
                        ...response.data,
                        end_date: new Date(post.end_date)
                    }))
                });

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

    if (isLoadingPostIds || isLoadingPostDetails) {
        return (
            <div className="text-center py-6 w-full">Loading...</div>
        );
    }

    const displayPosts = postDetails 
        ? postDetails
            .filter(post => post.end_date >= new Date()) 
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        : [];

    const handleView = (post_url: string) => {
        window.open(post_url, '_blank');
    };

    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    return (
        <div className='w-full flex justify-center items-center flex-col'>
            <div className="grid grid-cols-3 gap-20 p-4 w-fit">
            {displayPosts?.map((post, index) => {
                const [title, ...restSections] = post.message.split('\n\n');
                const remainingText = restSections.join('\n\n');
                const image = post.attachments.data[0].media.image.src;
                
                return(
                    <div key={index} className="shadow-xl rounded-lg w-[375px] h-[425px] overflow-hidden flex flex-col">
                        <img src={image} alt="" className='h-[200px] w-full object-cover'/>

                        <div className='w-full h-[225px] p-4 flex flex-col justify-between'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='font-inter font-semibold text-[16px]'>{title}</h1>

                                <p className='text-[14px] line-clamp-4 overflow-hidden text-ellipsis'>
                                    {remainingText}
                                </p>
                            </div>

                            <div className='flex justify-between'>
                                <span
                                    className="text-red-600 cursor-pointer hover:underline font-inter font-semibold text-[14px]"
                                    onClick={() => handleView(post.permalink_url)}
                                >
                                    View Post
                                </span>
                
                                <div className='flex gap-4 items-center justify-center'>
                                    <EventIcon style={{ fontSize: 20, color: 'black' }} />
                                    <p className="text-[14px] font-inter">{format(post.created_time, "MMMM d, yyyy")}</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                )
            })}
            </div>

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
}

export default TimeAnnouncements;