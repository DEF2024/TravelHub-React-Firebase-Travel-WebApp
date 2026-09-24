function Destinations(){
    return(
        <main className="wrapper">
         
        <section className="title">
            <div className="title-travel">
                <h1>Explore <span> Destinations</span></h1>
                <p>Discover hundreds of amazing places across India and beyond</p>
            </div>
            <label className="label-1" htmlFor="">
              <input type="text" placeholder="Search destination ,start,cities..." />
            </label>
            <div className="travel-where">
                <ul>
                    <li className="border"><a href=""></a>All</li>
                    <li className="border"><a href=""></a>Nature</li>
                    <li className="border"><a href=""></a>Beach</li>
                    <li className="border"><a href=""></a>Heritage</li>
                    <li className="border"><a href=""></a>Adventure</li>
                    <li className="border"><a href=""></a>City</li>
                    <li className="border"><a href=""></a>Hill</li>
                </ul>
            </div>
        </section>

        <section className="travel-enjor">
        </section>

        </main>
    )
}

export default Destinations;