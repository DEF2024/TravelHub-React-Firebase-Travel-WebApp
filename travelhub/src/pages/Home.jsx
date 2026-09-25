import MyImage1 from "../assets/bestindia.jpg";
import MyImage2 from "../assets/Islands.jpg";
import MyImage3 from "../assets/istockphoto.jpg";
import MyImage4 from "../assets/Kalka.jpg";
import MyImage5 from "../assets/philippines.png";
import MyImage6 from "../assets/Sonmarg.jpg";

function Home() {
  return (
    <main className="wrapper">
    <section className="home">
        <div className="home-content">  
            <h1>Explore the World, <span>One <br/> Destination </span>at a Time</h1>
            <p>Discover breathtaking destinations,plan memorable trips, and <br/>  create your perfect travel itinerary - all in one place.</p>
            <label>
                <input className="search-input" type="text" placeholder="Search and destinations, state, city" />
            </label> 
            <br />
            <div className="search-container">
                <button className="search-button">Explore Destinations</button>
                <button className="search-button">Start Planning free</button>
            </div>
        </div>
    </section>
    <hr />

    <section className="home-1">
        <div className="home-1-content">
            <svg xmlns="http://www.w3.org/2000/svg" height="54px" viewBox="0 -960 960 960" width="54px" fill="#000000"><path d="m300-300 280-80 80-280-280 80-80 280Zm180-120q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Zm0-320Z"/></svg>
            <h1>500+</h1>
            <p>Destinations</p> 
        </div>
        <div className="home-1-content">
          <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M38-160v-94q0-35 18-63.5t50-42.5q73-32 131.5-46T358-420q62 0 120 14t131 46q32 14 50.5 42.5T678-254v94H38Zm700 0v-94q0-63-32-103.5T622-423q69 8 130 23.5t99 35.5q33 19 52 47t19 63v94H738ZM250-523q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42Zm426 0q-42 42-108 42-11 0-24.5-1.5T519-488q24-25 36.5-61.5T568-631q0-45-12.5-79.5T519-774q11-3 24.5-5t24.5-2q66 0 108 42t42 108q0 66-42 108ZM98-220h520v-34q0-16-9.5-31T585-306q-72-32-121-43t-106-11q-57 0-106.5 11T130-306q-14 6-23 21t-9 31v34Zm324.5-346.5Q448-592 448-631t-25.5-64.5Q397-721 358-721t-64.5 25.5Q268-670 268-631t25.5 64.5Q319-541 358-541t64.5-25.5ZM358-220Zm0-411Z"/></svg>
            <h1>10K+</h1>
            <p>Happy Travelers</p>
        </div>
        <div className="home-1-content">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="m612-120-263-93-179 71q-17 9-33.5-1T120-173v-558q0-13 7.5-23t19.5-15l202-71 263 92 178-71q17-8 33.5 1.5T840-788v565q0 11-7.5 19T814-192l-202 72Zm-34-75v-505l-196-66v505l196 66Zm60 0 142-47v-512l-142 54v505Zm-458-12 142-54v-505l-142 47v512Zm458-493v505-505Zm-316-66v505-505Z"/></svg>           
            <h1>28+</h1>
            <p>States Covered</p>
        </div>
        <div className="home-1-content">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48" viewBox="0 0 24 24" width="48"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2z M18,11.09c0,4-2.55,7.7-6,8.83 c-3.45-1.13-6-4.82-6-8.83V6.31l6-2.12l6,2.12V11.09z M8.82,10.59L7.4,12l3.54,3.54l5.66-5.66l-1.41-1.41l-4.24,4.24L8.82,10.59z"/></g></svg>
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
        <div className="home-2-image">
            <div className="home-2-row-1">
                <div className="home-2-font-row">FILTER BY NEED</div>
                <div className="home-2-button-col">
                    <button className="home-2-button">♿ Wheelchair access</button>
                    <button className="home-2-button">🚻 Accessible toilets</button>
                    <button className="home-2-button">👁 Visual info / signage</button>
                    <button className="home-2-button">🗨 Communication support</button>
                    <button className="home-2-button">🅿 Accessible parking</button>
                </div>
            </div>
            <div className="home-2-row-2">
                <div className="home-2-row-in">
                    <p>RESULTS — DESTINATIONS MATCHING SELECTED NEEDS</p>
                </div>
                <div className="home-2-row-image">
                    <div className="home-2-image-group">
                        <img src={MyImage1} alt="bestlndia" />
                        <p>♿ 🚻</p>
                    </div>
                    <div className="home-2-image-group">
                        <img src={MyImage2} alt="bestlndia" />
                        <p>♿ 🚻</p>
                    </div>
                    <div className="home-2-image-group">
                        <img src={MyImage3} alt="bestlndia" />
                        <p>♿ 🚻</p>
                    </div>
                    <div className="home-2-image-group">
                        <img src={MyImage4} alt="bestlndia" />
                        <p>♿ 🚻</p>
                    </div>
                    <div className="home-2-image-group">
                        <img src={MyImage5} alt="bestlndia" />
                        <p>♿ 🚻</p>
                    </div>
                    <div className="home-2-image-group">
                        <img src={MyImage6} alt="bestlndia" />
                        <p>♿ 🚻</p>
                    </div>
                </div>
            </div>            
        </div>
    </section>
    <hr />  

    <section className="home-3">
        <div className="title-container">
            <h1>Explore by Category</h1>
            <div className="underline"></div>
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
            <div>
                <button className="btu-3">Create Free Account</button>
                <button className="btu-4">Browse Destinations</button>
            </div>
        </div>

    </section>

    </main>


    


    
  );
}

export default Home;