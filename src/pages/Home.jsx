import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../services/api";
import { setJobs } from "../redux/jobsSlice";
import JobCard from "../components/JobCard";

const Home = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobs);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const jobsPerPage = 5; // Number of jobs per page

  useEffect(() => {
    const fetchJobData = async () => {
      if (jobs.length === 0) {
        const data = await fetchJobs(); // Fetch data using Axios
        dispatch(setJobs(data));
      }
    };
    fetchJobData();
  }, [dispatch, jobs.length]);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Get jobs for the current page
  const currentJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="home py-4 h-screen overflow-hidden">
      <h1 className="text-3xl font-bold mb-4">Job Listings</h1>
      <div className="grid gap-2">
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <div className="flex justify-center gap-2 items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600"
              : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600"
              : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
