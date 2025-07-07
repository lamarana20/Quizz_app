import { Link } from 'react-router-dom';
import logo from '../assets/quiz-logo.jpg';

const Header = () => (
  <header className="bg-gray-800 text-white shadow-md py-4">
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Quiz Logo" className="h-12 w-12 sm:h-10 sm:w-10 rounded-full" />
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide">Quiz App</h1>
      </div>

      <nav className="flex gap-4 mt-4 sm:mt-0">
        <Link to="/" className="px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
          Football
        </Link>
        <Link to="/basket" className="px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
          Basket
        </Link>
        <Link to="/tennis" className="px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
          Tennis
        </Link>
        <Link to="/culture" className="px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
          Culture
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
