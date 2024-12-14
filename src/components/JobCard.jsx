import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow flex justify-between rounded-lg p-3">
      <div>
        <h2 className="text-lg font-bold">{job.title}</h2>
        <p className="text-sm text-gray-600">{job.company}</p>
        <p className="text-sm text-gray-600">{job.location}</p>
      </div>

      <Link
        to={`/job/${job.id}`}
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
