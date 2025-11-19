import React, { useState, useCallback, Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';

// --- Helper Icons (as inline SVGs) ---
const SearchIcon = () => (
  <svg
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const LoadingSpinner = ({ className = 'h-6 w-6' }) => (
  <svg
    className={`animate-spin ${className} text-white`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-6 h-6"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.001 4.529c2.349-2.532 6.149-2.532 8.498 0 2.349 2.531 2.349 6.642 0 9.173l-6.764 7.29a1.5 1.5 0 01-2.204 0l-6.764-7.29c-2.349-2.531-2.349-6.642 0-9.173 2.349-2.532 6.149-2.532 8.498 0z"
    />
  </svg>
);

// --- Theme Toggle ---
const ThemeToggle = ({ theme, setTheme }) => {
  const isDark = theme === 'dark';
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm md:text-base font-medium shadow-sm hover:shadow-md transition"
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

// --- Splash Screen ---
const SplashScreen = ({ theme }) => (
  <div className="min-h-screen flex items-center justify-center bg-emerald-600 dark:bg-slate-900 transition-colors">
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
        Recipe Finder
      </h1>
      <p className="text-emerald-100 mt-4 text-lg md:text-xl">
        Cooking up something tasty for you...
      </p>
    </div>
  </div>
);

// --- Login Screen ---
const LoginScreen = ({ onLogin, theme, setTheme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    onLogin({ email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-700 dark:text-emerald-400">
            Recipe Finder
          </h1>
          <p className="text-slate-500 dark:text-slate-300 mt-2 text-base md:text-lg">
            Login to start your cooking journey 🍳
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-base md:text-lg">
          <div>
            <label className="block mb-1 text-sm md:text-base font-medium text-slate-700 dark:text-slate-200">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm md:text-base font-medium text-slate-700 dark:text-slate-200">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-600 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg py-2.5 text-base md:text-lg shadow-md transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// --- UI Components ---

// Skeleton Card for loading state
const SkeletonCard = () => (
  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden animate-pulse border border-slate-100 dark:border-slate-700">
    <div className="w-full h-52 bg-slate-200 dark:bg-slate-700"></div>
    <div className="p-4">
      <div className="h-6 rounded-md bg-slate-200 dark:bg-slate-700 w-3/4"></div>
    </div>
  </div>
);

// Recipe Card Component
const RecipeCard = ({ recipe, onSelect, onToggleFavorite, isFavorite }) => (
  <div
    onClick={() => onSelect(recipe.idMeal)}
    className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.03] transition-transform duration-300 group cursor-pointer border border-slate-100 dark:border-slate-700"
  >
    <img
      src={recipe.strMealThumb}
      alt={recipe.strMeal}
      className="w-full h-52 object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src =
          'https://placehold.co/600x400/f8f9fa/343a40?text=Image+Not+Found';
      }}
    />
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleFavorite(recipe);
      }}
      className="absolute top-3 right-3 bg-white/80 dark:bg-slate-900/80 rounded-full p-2 shadow-md hover:scale-110 transition"
    >
      <HeartIcon filled={isFavorite} />
    </button>
    <div className="p-4">
      <h3 className="font-bold text-xl md:text-2xl text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
        {recipe.strMeal}
      </h3>
    </div>
  </div>
);

// Recipe Modal Component
const RecipeModal = ({ recipe, onClose, isOpen, onToggleFavorite, isFavorite }) => {
  if (!recipe) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ ingredient, measure });
    } else {
      break;
    }
  }

  const instructionsSteps = recipe.strInstructions
    .split('\n')
    .map((step) => step.trim())
    .filter((step) => step.length > 0 && !/^\s*STEP\s*\d+\s*$/.test(step));

  return (
    <Transition show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          ></div>
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-100 dark:border-slate-700">
            <div className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
                  {recipe.strMeal}
                </h2>
                <button
                  onClick={() => onToggleFavorite(recipe)}
                  className="ml-2 bg-slate-100 dark:bg-slate-800 rounded-full p-2 hover:scale-110 transition"
                  title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <HeartIcon filled={isFavorite} />
                </button>
              </div>
              <button
                onClick={onClose}
                className="text-slate-500 hover:text-slate-200 text-3xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="p-6 md:p-8">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-64 md:h-80 object-cover rounded-xl mb-8 shadow-md"
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 text-center border-b pb-6 border-slate-200 dark:border-slate-700">
                <div>
                  <h3 className="font-bold text-xl mb-2 text-emerald-800 dark:text-emerald-400">
                    Category
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-lg">
                    {recipe.strCategory}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-emerald-800 dark:text-emerald-400">
                    Cuisine
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-lg">
                    {recipe.strArea}
                  </p>
                </div>
                {recipe.strSource && (
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-emerald-800 dark:text-emerald-400">
                      Source
                    </h3>
                    <a
                      href={recipe.strSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline text-lg"
                    >
                      View Website
                    </a>
                  </div>
                )}
                {recipe.strYoutube && (
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-emerald-800 dark:text-emerald-400">
                      Video
                    </h3>
                    <a
                      href={recipe.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:underline text-lg"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-1">
                  <h3 className="font-bold text-2xl mb-4 text-emerald-800 dark:text-emerald-400 border-b pb-2 border-slate-200 dark:border-slate-700">
                    Ingredients
                  </h3>
                  <ul className="space-y-3 text-lg">
                    {ingredients.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start text-slate-700 dark:text-slate-200"
                      >
                        <span className="font-semibold text-slate-900 dark:text-slate-100 mr-2">
                          {item.measure}
                        </span>
                        <span>{item.ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-bold text-2xl mb-4 text-emerald-800 dark:text-emerald-400 border-b pb-2 border-slate-200 dark:border-slate-700">
                    Instructions
                  </h3>
                  <ol className="space-y-4 text-slate-700 dark:text-slate-200 leading-relaxed text-lg">
                    {instructionsSteps.map((step, index) => (
                      <li key={index} className="flex">
                        <span className="bg-emerald-600 text-white rounded-full w-7 h-7 text-sm font-bold flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

// --- Main App Component ---
export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isRandomLoading, setIsRandomLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [favorites, setFavorites] = useState([]); // {idMeal, strMeal, strMealThumb}[]
  const [theme, setTheme] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Load theme, auth, history, favorites, categories
  useEffect(() => {
    // Theme
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme);
    }

    // Auth
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);

    // Search history
    try {
      const history =
        JSON.parse(localStorage.getItem('recipeSearchHistory')) || [];
      setSearchHistory(history);
    } catch (error) {
      console.error('Could not parse search history:', error);
      setSearchHistory([]);
    }

    // Favorites
    try {
      const favs =
        JSON.parse(localStorage.getItem('recipeFavorites')) || [];
      setFavorites(favs);
    } catch (error) {
      console.error('Could not parse favorites:', error);
      setFavorites([]);
    }

    // Categories
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}list.php?c=list`);
        const data = await response.json();
        setCategories(data.meals || []);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchCategories();
  }, []);

  // Sync theme with <html> class for dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const updateSearchHistory = (term) => {
    const newHistory = [
      term,
      ...searchHistory.filter((item) => item !== term),
    ].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem(
      'recipeSearchHistory',
      JSON.stringify(newHistory)
    );
  };

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.idMeal === recipe.idMeal);
      let updated;
      if (exists) {
        updated = prev.filter((f) => f.idMeal !== recipe.idMeal);
      } else {
        updated = [
          ...prev,
          {
            idMeal: recipe.idMeal,
            strMeal: recipe.strMeal,
            strMealThumb: recipe.strMealThumb,
          },
        ];
      }
      localStorage.setItem('recipeFavorites', JSON.stringify(updated));
      return updated;
    });
  };

  const performSearch = useCallback(
    async (term) => {
      setHasSearched(true);
      if (!term) {
        setError('Please enter a dish name.');
        return;
      }
      setLoading(true);
      setError(null);
      setRecipes([]);

      try {
        const response = await fetch(`${API_BASE_URL}search.php?s=${term}`);
        const data = await response.json();
        if (data.meals) {
          setRecipes(data.meals);
          updateSearchHistory(term);
        } else {
          setError(`No recipes found for "${term}".`);
        }
      } catch (err) {
        setError('Failed to fetch recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    },
    [searchHistory]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchTerm.trim());
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    performSearch(term);
  };

  const handleCategorySearch = useCallback(async (category) => {
    setSelectedCategory(category);
    if (!category) {
      setRecipes([]);
    setHasSearched(false);
      return;
    }
    setHasSearched(true);
    setLoading(true);
    setError(null);
    setRecipes([]);
    try {
      const response = await fetch(
        `${API_BASE_URL}filter.php?c=${category}`
      );
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectRecipe = useCallback(async (mealId) => {
    setIsModalOpen(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}lookup.php?i=${mealId}`
      );
      const data = await response.json();
      if (data.meals && data.meals[0]) {
        setSelectedRecipe(data.meals[0]);
      } else {
        throw new Error('Could not find recipe details.');
      }
    } catch (err) {
      setError('Failed to fetch recipe details.');
      setIsModalOpen(false);
    }
  }, []);

  const handleRandomRecipe = useCallback(async () => {
    setIsRandomLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}random.php`);
      const data = await response.json();
      if (data.meals && data.meals[0]) {
        handleSelectRecipe(data.meals[0].idMeal);
      } else {
        throw new Error('Could not fetch a random recipe.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRandomLoading(false);
    }
  }, [handleSelectRecipe]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', user.email);
  };

  const isFavorite = (idMeal) =>
    favorites.some((f) => f.idMeal === idMeal);

  // --- Conditional screens: Splash -> Login -> App ---
  if (showSplash) {
    return <SplashScreen theme={theme} />;
  }

  if (!isAuthenticated) {
    return (
      <LoginScreen onLogin={handleLogin} theme={theme} setTheme={setTheme} />
    );
  }

  // --- Main App UI ---
  return (
    <div className="bg-slate-50 dark:bg-slate-900 font-sans antialiased text-slate-800 dark:text-slate-100 min-h-screen">
      <div className="container mx-auto p-4 md:p-8 max-w-6xl">
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold text-emerald-700 dark:text-emerald-400 tracking-tight">
              Recipe Finder
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-4 text-xl md:text-2xl max-w-2xl">
              Discover thousands of delicious recipes from around the world.
              Just enter a dish name to get started!
            </p>
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </header>

        <div className="max-w-2xl mx-auto mb-10">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white dark:bg-slate-800 rounded-full shadow-2xl p-2 md:p-3 gap-2 border border-slate-100 dark:border-slate-700"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a dish... (e.g., Pizza)"
              className="w-full bg-transparent px-4 py-3 md:py-4 text-lg md:text-xl border-none focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 text-white font-bold px-4 py-3 md:px-5 md:py-4 rounded-full text-lg md:text-xl shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:bg-emerald-300 transition-all duration-300 flex items-center justify-center aspect-square"
            >
              {loading ? <LoadingSpinner /> : <SearchIcon />}
            </button>
          </form>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-5">
            <select
              onChange={(e) => handleCategorySearch(e.target.value)}
              value={selectedCategory}
              className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 text-base md:text-lg rounded-xl px-4 py-3 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            >
              <option value="">Browse by Category</option>
              {categories.map((cat) => (
                <option
                  key={cat.strCategory}
                  value={cat.strCategory}
                >
                  {cat.strCategory}
                </option>
              ))}
            </select>

            <button
              onClick={handleRandomRecipe}
              disabled={isRandomLoading || loading}
              className="text-emerald-700 dark:text-emerald-300 font-semibold text-base md:text-lg hover:text-emerald-800 dark:hover:text-emerald-200 transition-colors disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              {isRandomLoading ? 'Fetching...' : 'Or get a random recipe ✨'}
            </button>
          </div>

          {searchHistory.length > 0 && (
            <div className="text-center mt-6">
              <span className="text-sm md:text-base text-slate-500 dark:text-slate-300 mr-2">
                Recent searches:
              </span>
              <div className="inline-flex flex-wrap gap-2 justify-center">
                {searchHistory.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleHistoryClick(term)}
                    className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-100 text-sm md:text-base font-medium px-3 py-1.5 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Your Favorites ❤️
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {favorites.map((fav) => (
                <div
                  key={fav.idMeal}
                  onClick={() => handleSelectRecipe(fav.idMeal)}
                  className="min-w-[180px] bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition transform"
                >
                  <img
                    src={fav.strMealThumb}
                    alt={fav.strMeal}
                    className="w-full h-28 object-cover rounded-t-xl"
                  />
                  <div className="p-3">
                    <p className="font-semibold text-sm md:text-base text-slate-800 dark:text-slate-100 line-clamp-2">
                      {fav.strMeal}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <main>
          {error && (
            <div className="text-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 p-4 rounded-xl max-w-xl mx-auto mb-6 text-lg">
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    onSelect={handleSelectRecipe}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={isFavorite(recipe.idMeal)}
                  />
                ))}
          </div>

          {!loading && recipes.length === 0 && !hasSearched && (
            <div className="text-center text-slate-500 dark:text-slate-300 pt-10">
              <p className="text-2xl font-semibold">
                Your culinary adventure awaits!
              </p>
              <p className="text-lg mt-1">
                Type a dish name or select a category to discover delicious
                recipes.
              </p>
            </div>
          )}
        </main>

        <RecipeModal
          recipe={selectedRecipe}
          onClose={closeModal}
          isOpen={isModalOpen}
          onToggleFavorite={toggleFavorite}
          isFavorite={selectedRecipe ? isFavorite(selectedRecipe.idMeal) : false}
        />
      </div>
    </div>
  );
}
