import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../components/JobCard";

const Favorites = () => {
  const favorites = useSelector((state) => state.jobs.favorites);

  return (
    <div className="favorites-page p-6">
      <h1 className="text-3xl font-bold mb-6">Favorite Jobs</h1>
      {favorites.length > 0 ? (
        <div className="job-list grid gap-4">
          {favorites.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p>No favorite jobs yet!</p>
      )}
    </div>
  );
};

export default Favorites;
