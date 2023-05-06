import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Sun from "/icon-sun.svg"
import Moon from "/icon-moon.svg"

function App() {
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState(null);
  const [theme, setTheme] = useState('DARK');
  const [error, setError] = useState(false); // Add error state

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false); // Reset error state on new search
    try {
      const response = await axios.get(`https://api.github.com/users/${search}`);
      setUserData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
      console.log(error)
      setUserData(null);
      setError(true); // Set error state on error
    }
  };
  const toggleTheme = () => {
    setTheme(theme === 'DARK' ? 'LIGHT' : 'DARK');
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return ` ${day} ${month} ${year}`;
  }
  

  return (
    <main>
      <div className='top'>
        <h3>divfinder</h3>
        <button className='theme_btn' onClick={toggleTheme}>
          <span className='theme'>DARK</span>
          <img src={theme === 'DARK' ? Moon : Sun} alt="Theme icon" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="search_container">
        <img src="/icon-search.svg" alt="" />
        <input
          type="text"
          placeholder='Search Github username...'
          value={search}
          onChange={handleChange}
        />
        {error && <span className="error-message">No results</span>} 
        <button type="submit">Search</button>
      </form>
      
      {userData ? (
        <div className="card">
          <div className="card-top">
            <img src={userData.avatar_url} alt="" />
            <div className="card-top-middle">
              <h2 className="name">{userData.name}</h2>
              <span className="link">{userData.login}</span>
              <p className="bio">{userData.bio ? userData.bio : "This profile has no bio"}</p>
            </div>
            <div className="card-top-right">
              <span className="date">Joined {formatDate(userData.created_at)}</span>
            </div>
          </div>
          <div className="card_middle">
            <div className="repos_container column">
              <span className='reposText'>Repos</span>
              <span className="reposNum">{userData.public_repos}</span>
            </div>
            <div className="followers_container column">
              <span className="followersText">Followers</span>
              <span className="followersNum">{userData.followers}</span>
            </div>
            <div className="following_container column">
              <span className="followingText">Following</span>
              <span className="followingNum">{userData.following}</span>
            </div>
          </div>
          <div className="card_bottom">
            <div className="bottom-left">
              <div className="location_container">
                <img src="/icon-location.svg" alt="" />
                <span className="location">{userData.location}</span>
              </div>
                <div className="website_container">
                    <img src="/icon-website.svg" alt="" />
                    <span className="site">{userData.blog? userData.blog:"Not Available"}</span>
                </div>
            </div>
            <div className="bottom-right">

              <div className="tweeter-container">
                <img src="/icon-twitter.svg" alt="" />
                <span className="tweeter">{userData.twitter_username ? userData.twitter_username : "Not Available"}</span>
              </div>

              <div className="company_container">
                <img src="/icon-company.svg"  alt="" />
                <span className="company">{userData.company ? userData.company:"Not Available"}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      
    </main>
  );
}

export default App;
