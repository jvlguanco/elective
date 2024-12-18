import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AboutEdit from '../pages/home/about';
import HeroEdit from '../pages/home/hero';
import PostAnnouncement from '../pages/announcement/post';
import NormalPostTable from '../pages/announcement/normal';
import HighlightedPostTable from '../pages/announcement/highlighted';
import TimePostTable from '../pages/announcement/time';
import JobForm from '../pages/career/create';
import JobTable from '../pages/career/all_listing';
import BoardOfRegents from '../pages/administration/board';
import Presidents from '../pages/administration/president';
import ManagementCommittee from '../pages/administration/committee';
import DirectorsAndChiefs from '../pages/administration/director';
import Colleges from '../pages/academics/colleges';
import BidItems from '../pages/bids/bid_items';
import ConsolidatedUpdates from '../pages/bids/consolidated_updates';
import Procurement from '../pages/bids/procurement';
import ProjectMonitoring from '../pages/bids/project_monitoring';
import CompetitiveBidding from '../pages/bids/competitive_bidding';
import Courses from '../pages/academics/courses';
import OrganizationalChart from '../pages/administration/org_chart';
import SupportStaff from '../pages/administration/support';
import Offices from '../pages/administration/offices';
import Admission from '../pages/admission/template';
import Partner from '../pages/partner/partner';
import PrivacyPolicy from '../pages/privacy_policy/privacy';
import Scholarship from '../pages/scholarship/scholarship';
import Downloads from '../pages/downloads/download';
import Calendar from '../pages/academics/calendar';

const routes = {
    admin: {
        '/admin': ['About Section', 'Hero Section'],
        '/admin/about': ['Board of Regents Member', 'President', 'Management Committee', 'Directors and Chiefs', 'Organizational Chart', 'Support Staff', 'Offices'],
        '/admin/academics': ['Colleges', 'Courses',  'Academic Calendar for Semestral', 'Academic Calendar for Trimestral'],
        '/admin/admissions': ['PLMAT', 'CMAT', 'CLAT'],
        '/admin/announcement': ['Create Post', 'View Normal Post', 'View Highlighted Posts', 'View Time-Restricted Posts'],
        '/admin/others': ['Create Opening', 'Manage Openings', 'Bid Items', 'Annual Procurement Plan', 'Project Monitoring Report', 'Consolidated Updates of APP', 'Competitive Bidding', 'Downloads', 'Scholarship', 'Partners', 'Privacy Policy']
    },

    others: {
        '/admin': ['About Section', 'Hero Section'],
        '/admin/about': ['Board of Regents Member' , 'President', 'Management Committee', 'Directors and Chiefs', 'Organizational Chart', 'Support Staff', 'Offices'],
        '/admin/academics': ['Colleges', 'Courses', 'Academic Calendar for Semestral', 'Academic Calendar for Trimestral'],
        '/admin/admissions': ['PLMAT', 'CMAT', 'CLAT'],
        '/admin/announcement': ['Create Post', 'View Normal Post', 'View Highlighted Posts', 'View Time-Restricted Posts'],
    },

    career: {
        '/admin': ['Create Opening', 'Manage Openings']
    },

    bid_awards: {
        '/admin': ['Bid Items', 'Annual Procurement Plan', 'Project Monitoring Report', 'Consolidated Updates of APP', 'Competitive Bidding'],
    },

};

const sidebarItemContent = {
    'About Section': <AboutEdit/>,
    'Hero Section': <HeroEdit/>,
    'Create Post': <PostAnnouncement/>,
    'View Normal Post': <NormalPostTable/>,
    'View Highlighted Posts': <HighlightedPostTable/>,
    'View Time-Restricted Posts' : <TimePostTable/>,                                      
    'Create Opening': <JobForm/>,
    'Manage Openings': <JobTable/>,
    'Board of Regents Member': <BoardOfRegents/>,
    'President': <Presidents/>,
    'Management Committee': <ManagementCommittee/>,
    'Directors and Chiefs': <DirectorsAndChiefs/>,
    'Colleges': <Colleges/>,
    'Bid Items': <BidItems/>,
    'Annual Procurement Plan': <Procurement/>,
    'Project Monitoring Report': <ProjectMonitoring/>,
    'Consolidated Updates of APP': <ConsolidatedUpdates/>,
    'Competitive Bidding': <CompetitiveBidding/>,
    'Courses': <Courses/>,
    'Organizational Chart': <OrganizationalChart/>,
    'Support Staff': <SupportStaff/>,
    'Offices': <Offices/>,
    'PLMAT': <Admission id="PLMAT"/>,
    'CLAT': <Admission id="CLAT"/>,
    'CMAT': <Admission id="CMAT"/>,
    'Scholarship': <Scholarship/>,
    'Downloads': <Downloads/>,
    'Partners': <Partner/>,
    'Privacy Policy': <PrivacyPolicy/>,
    'Academic Calendar for Semestral': <Calendar type={'semestral'}/>,
    'Academic Calendar for Trimestral': <Calendar type={'trimestral'}/>
};

const Sidebar = ({role}) => {
    const location = useLocation();
    const items = routes[role]?.[location.pathname];

    const [selectedItem, setSelectedItem] = useState(items[0]);
    const [activeItem, setActiveItem] = useState(items[0]);

    useEffect(() => {
        const defaultItem = items[0];
        setSelectedItem(defaultItem);
        setActiveItem(defaultItem);
    }, [items]);

    const handleItemClick = (item: string) => {
        setActiveItem(item);
        setSelectedItem(item);
    };

    return (
        <div className='flex w-full'>
            <div className='w-1/6 h-screen-minus-82 flex flex-col gap-12 px-12 py-8'>
                <ul>
                    {items.map(item => (
                        <li
                            key={item}
                            className={`p-4 cursor-pointer ${activeItem === item ? 'text-red-500 font-bold' : 'text-black'}`}
                            onClick={() => handleItemClick(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className='px-12 py-6 w-5/6'>
                {sidebarItemContent[selectedItem]}
            </div>
        </div>
    );
}

export default Sidebar