import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../services/api";
import { addFavorite, removeFavorite } from "../redux/jobsSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jobs, favorites } = useSelector((state) => state.jobs);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if the job is marked as favorite
  const isFavorite = favorites.some((favorite) => favorite.id.toString() === id);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);

        // Check if jobs are already in Redux state; if not, fetch
        if (!jobs.length) {
          const jobData = await fetchJobs();
          dispatch({ type: "jobs/setJobs", payload: jobData });
        }

        const selectedJob = jobs.find((job) => job.id.toString() === id);
        if (selectedJob) {
          setJob(selectedJob);
        } else {
          setError("Job not found");
        }
      } catch (err) {
        setError("Error fetching job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, jobs, dispatch]);

  // Formik for handling Apply for Job form
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      resume: null,
      coverLetter: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      coverLetter: Yup.string().required("Cover Letter is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form Submitted:", values);
      alert("Your application has been submitted successfully!");
      resetForm();
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="job-details p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{job.title}</h2>
        <button
          onClick={() =>
            isFavorite
              ? dispatch(removeFavorite(job.id))
              : dispatch(addFavorite(job))
          }
          className={`py-2 px-4 rounded ${
            isFavorite
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
      <p className="mt-2 text-lg">{job.description}</p>
      <p className="mt-2">Company: {job.company}</p>
      <p className="mt-2">Location: {job.location}</p>

      {/* Apply for Job Form */}
      <div className="apply-job mt-8 p-4 border rounded-lg">
        <h3 className="text-xl font-bold mb-4">Apply for Job</h3>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-md p-2 mt-1"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-md p-2 mt-1"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="resume" className="block text-sm font-medium">
              Resume (optional)
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={(event) =>
                formik.setFieldValue("resume", event.currentTarget.files[0])
              }
              className="w-full border rounded-md p-2 mt-1"
            />
          </div>

          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium">
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formik.values.coverLetter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-md p-2 mt-1"
              rows="4"
            ></textarea>
            {formik.touched.coverLetter && formik.errors.coverLetter && (
              <p className="text-red-500 text-sm">
                {formik.errors.coverLetter}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit 
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobDetails;
