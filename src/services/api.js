import axios from 'axios';

export const fetchJobs = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/c/1d12-fca5-4ae6-ae00'); // Example API
    return response.data.jobs; // Adjust based on your API structure
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};
