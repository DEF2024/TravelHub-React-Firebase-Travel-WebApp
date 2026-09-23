function Home() {
  return (
    <main className="wrapper">
    <section className="home">
    <div className="home-content">  
      <h1>Explore the World, <span>One <br/> Destination </span>at a Time</h1>
      <p>Discover breathtaking destinations,plan memorable trips, and <br/>  create your perfect travel itinerary - all in one place.</p>
      <label>
        <input type="text" placeholder="Search and destinations, state, city" />
      </label> <br />
      <div className="search-container">
        <button className="search-button">Explore Destinations</button>
        <button className="search-button">Start Planning free</button>
      </div>
    </div>
    </section>
    <hr />

    <section className="home-1">
        <div className="home-1-content">
            <i class="fa-solid fa-compass"></i>
            <h1>500+</h1>
            <p>Destinations</p> 
        </div>
        <div className="home-1-content">
          <div></div>
          <i class="fa-regular fa-user-group"></i>
            <h1>10K+</h1>
            <p>Happy Travelers</p>
        </div>
        <div className="home-1-content">
           <i class="fa-regular fa-map"></i>
            <h1>28+</h1>
            <p>States Covered</p>
        </div>
        <div className="home-1-content">
            <i class="fa-solid fa-compass"></i>
            <h1>100%</h1>
            <p>Safe & Verified</p>
        </div>
    </section>
    <hr />

    <section className="home-2">
        <div className="home-2-content">
            <h1>Featured Destinations</h1>
            <p>Handpicked destinations loved by travelers</p>
        </div>
    </section>
    <hr />  

    <section className="home-3">
        <div className="title-container">
            <h1>Explore by Category</h1>
        <hr className="underline"/>
            <p>Find your perfect type of getaway</p>
        </div>
        <div className="card-1">
        <div className="card-options card">
            <p className="imager">🌿</p>
            <h4>Nature</h4>
            <p>Forests, wildlife & greenery</p>
        </div>
         <div className="card-options card">
            <p className="imager">🏖️</p>
            <h4> Beach</h4>
            <p>Coastal gems & sunsets</p>
        </div>
         <div className="card-options card">
            <p className="imager">🏛️</p>
            <h4>Heritage</h4>
            <p>History & architecture</p>
        </div>
        <div className="card-options card">
            <p className="imager">⛰️</p>
            <h4>Adventure</h4>
            <p>Thrills & exploration</p>
        </div>
          <div className="card-options card-2">
            <p className="imager">🌆</p>
            <h4>City</h4>
            <p>Urban life & culture</p>
        </div>
        <div className="card-options card-2">
            <p className="imager">🌋</p>
            <h4>Hill</h4>
            <p>Scenic hill stations</p>
        </div>
        </div>
        
    </section>
   
    <section className="home-4">
        <div className="box-1">
             <h1>Ready to Start Your Adventure?</h1>
             <p>Join thousands of travelers who plan unforgettable trips with TravelHub</p>
            <button className="btu-3">Create Free Account</button>
            <button className="btu-4">Browse Destinations</button>
        </div>

    </section>

    </main>


    


    
  );
}

export default Home;