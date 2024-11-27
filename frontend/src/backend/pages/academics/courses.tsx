import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';

const Courses: React.FC = () => {
    const [colleges, setColleges] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCollegeId, setSelectedCollegeId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ course_id: "", course_name: "" });
    const [editingCourse, setEditingCourse] = useState(false);
    const [page, setPage] = useState(0);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchColleges();
    }, []);

    useEffect(() => {
        if (selectedCollegeId) {
            setLoading(true);
            fetchCourses(selectedCollegeId);
        }
    }, [selectedCollegeId]);

    const fetchColleges = async () => {
        try {
        const response = await axios.get("http://localhost:5000/about/college");
        setColleges(response.data.active);
        } catch (error) {
        console.error("Error fetching colleges:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCourses = async (collegeId: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/academic/courses?college_id=${collegeId}`);
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setFormData({ course_id: "", course_name: "" });
        setEditingCourse(false);
    };

    const handleModalOpen = (course: any = null) => {
        if (course) {
            setFormData(course);
            setEditingCourse(true);
        } else {
            setFormData({ course_id: "", course_name: "" });
            setEditingCourse(false);
        }
        setShowModal(true);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedCollegeId) {
            alert("Please select a college first.");
            return;
        }

        try {
            const payload = { ...formData, college_id: selectedCollegeId };

            if (editingCourse) {
                await axios.put(`http://localhost:5000/academic/courses/${formData.course_id}`, payload);
            } else {
                await axios.post(`http://localhost:5000/academic/courses`, payload);
            }

            fetchCourses(selectedCollegeId);
            handleModalClose();
        } catch (error) {
            console.error("Error saving course:", error);
        }
    };

    const handleDelete = async (courseId: string) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
        try {
            await axios.delete(`http://localhost:5000/academic/courses/${courseId}`);
            fetchCourses(selectedCollegeId);
        } catch (error) {
            console.error("Error deleting course:", error);
        }
        }
    };

    const handleOfficeChange = (e) => {
        const collegeId = e.target.value;
        setSelectedCollegeId(collegeId);
        fetchCourses(collegeId);
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected);
    };

    const displayItems = (courses, page) =>
        courses.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <>
            <div className='w-full flex justify-between items-center mb-8'>
                <h2 className="text-2xl font-bold">Courses</h2>
                <div className='flex gap-4'>
                    {selectedCollegeId && (
                        <button onClick={() => handleModalOpen()} className="bg-blue-500 text-white py-2 px-4 rounded">Add College</button>
                    )}
                </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <label htmlFor="officeDropdown" className="mr-2">Select Active College:</label>
                <select id="officeDropdown" onChange={handleOfficeChange} className="border rounded px-2 py-1">
                    <option value="">Select College</option>
                    {colleges.map((college) => (
                        <option key={college.college_id} value={college.college_id}>{college.college_name}</option>
                    ))}
                </select>
            </div>

            <Modal
                isOpen={showModal}
                onRequestClose={handleModalClose}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    content: {
                        position: 'relative',
                        width: '500px',
                        maxWidth: '90%',
                        margin: '0 auto',
                        padding: '20px',
                        borderRadius: '10px',
                        background: 'white',
                        overflow: 'hidden',
                    },
                }}
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        {editingCourse ? 'Edit Course' : 'Add Course'}
                    </h2>
                    <input type="text" name="course_id" onChange={handleFormChange} value={formData.course_id} placeholder="College Id" className="w-full mb-4 p-2 border rounded" required />
                    <input type="text" name="course_name" onChange={handleFormChange} value={formData.course_name} placeholder="College Name" className="w-full mb-4 p-2 border rounded" required />

                    <div className="flex gap-2">
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">{editingCourse ? 'Update' : 'Submit'}</button>
                        <button type="button" onClick={handleModalClose} className="w-full bg-gray-500 text-white p-2 rounded">Cancel</button>
                    </div>
                </form>
            </Modal>

            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="mb-6">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-2 border border-gray-200">ID</th>
                                <th className="p-2 border border-gray-200">Course Name</th>
                                <th className="p-2 border border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayItems(courses, page).map((course) => (
                                <tr key={course.course_id} className="hover:bg-gray-50">
                                    <td className="p-2 border border-gray-200">{course.course_id}</td>
                                    <td className="p-2 border border-gray-200">{course.course_name}</td>
                                    <td className="p-2 border border-gray-200">
                                        <button
                                            onClick={() => handleModalOpen(course)}
                                            className="text-blue-500 hover:text-blue-600 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course.course_id)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {courses.length > itemsPerPage && (
                        <ReactPaginate
                            previousLabel={'«'}
                            nextLabel={'»'}
                            breakLabel={'...'}
                            pageCount={Math.ceil(courses.length / itemsPerPage)}
                            onPageChange={handlePageChange}
                            containerClassName={'flex justify-center mt-4 space-x-2'}
                            activeClassName={'font-bold text-blue-600'}
                            pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Courses;