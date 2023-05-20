import '../styles/home.css';


function HomePage() {

  return (


    <div className="home">
      <div className="welcome-msg">
        <h1>Welcome to VogueVista</h1>
        <p>Explore the latest trends in fashion for men, women and kids.</p>
      </div>
      <footer>
        <p>&copy; VogueVista 2023. All rights reserved.</p>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </footer>
    </div>

  );

}

export default HomePage;

