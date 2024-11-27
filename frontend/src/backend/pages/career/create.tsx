import React, { useState } from "react";
import axios from "axios";

const JobForm = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [minSalary, setMinSalary] = useState<number | undefined>();
  const [maxSalary, setMaxSalary] = useState<number | undefined>();
  const [department, setDepartment] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pdfFile) {
      setMessage("PDF file is required");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("jobTitle", jobTitle);
    formData.append("jobPosition", jobPosition);
    formData.append("minSalary", String(minSalary));
    formData.append("maxSalary", String(maxSalary));
    formData.append("department", department);
    formData.append("pdfFile", pdfFile);

    try {
      const response = await axios.post("http://localhost:5000/career/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error submitting the form", error);
      setMessage("Failed to submit the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Job Request Form</h2>
      {message && <div className="text-center mb-4 text-red-500">{message}</div>}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          <p className="ml-4 text-lg">Uploading... Please wait.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
              placeholder="Enter job title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Position/s</label>
            <input
              type="text"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
              placeholder="Enter job position/s"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Salary (PHP)</label>
              <input
                type="number"
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                placeholder="₱"
                min={0}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Salary (PHP)</label>
              <input
                type="number"
                value={maxSalary}
                onChange={(e) => setMaxSalary(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                placeholder="₱"
                min={0}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Requesting Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
              placeholder="Enter department name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default JobForm;
