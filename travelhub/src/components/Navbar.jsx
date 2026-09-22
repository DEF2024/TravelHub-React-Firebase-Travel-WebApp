  

  function Navbar() {
    return (
      <nav class="wrapper">
        <i class="fa-regular fa-globe"><a href="">TravelHub</a></i>
        <ul>
          <li><a href="Home">Home</a></li>
          <li><a href="Destinations">Destinations</a></li>
        </ul>
        <div class="btn-container">
          <a href="#" class="btn-1">Sign In</a>
          <button class="btn-2">Get Started</button>
        </div>
      </nav>
    );
  }

  export default Navbar;