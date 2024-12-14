import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">
          Job Listings
        </Link>
        <nav className="space-x-4">
          <Link to="/favorites" className="hover:underline">
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
