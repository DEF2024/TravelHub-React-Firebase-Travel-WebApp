import MyImage1 from "../assets/bestindia.jpg";
import MyImage2 from "../assets/Islands.jpg";
import MyImage3 from "../assets/istockphoto.jpg";
import MyImage4 from "../assets/Kalka.jpg";
import MyImage5 from "../assets/philippines.png";
import MyImage6 from "../assets/Sonmarg.jpg";

function Trips() {
  return (
    <main className="wrapper">

        <section className="trips-section">
            <div className="trips-row-1">
                <div className="col-trips-piac-1">
                    <img src={MyImage1} alt="" width="400px" />
                </div>
                <div className="col-trips-piac-2">
                    <div className="col-trips-piac-row-1">
                        <h1>7 Days tour to Explore the Beauty of philippines</h1>
                    </div>
                    <div className="col-trips-piac-row-2">
                        <div className="col-trips-piac-in-1">
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M480-388q62-56 88-81t41-44q14-17 20.5-35.5T636-587q0-35-25.5-60.5T550-673q-21 0-40 9t-30 23q-12-14-30.5-23t-39.5-9q-35 0-60.5 25.5T324-587q0 19 6.5 36t20.5 36q16 21 44 48.5t85 78.5Zm0 197q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323-227 245.5-339.5T168-549q0-134 89-224.5T480-864q133 0 222.5 90.5T792-549q0 97-77 209T480-96Zm0-456Z"/></svg>
                                <p>Maldives, Philippines</p>
                            </div>
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M298.5-418.29q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29Zm156 0q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29Zm156 0q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29ZM216-96q-29.7 0-50.85-21.5Q144-139 144-168v-528q0-29 21.15-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29.7 0 50.85 21.5Q816-725 816-696v528q0 29-21.15 50.5T744-96H216Zm0-72h528v-360H216v360Zm0-432h528v-96H216v96Zm0 0v-96 96Z"/></svg>
                                <p>7 Days</p>
                            </div>
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M96-192v-92q0-25.78 12.5-47.39T143-366q54-32 114.5-49T384-432q66 0 126.5 17T625-366q22 13 34.5 34.61T672-284v92H96Zm648 0v-92q0-42-19.5-78T672-421q39 8 75.5 21.5T817-366q22 13 34.5 34.67Q864-309.65 864-284v92H744ZM282-522q-42-42-42-102t42-102q42-42 102-42t102 42q42 42 42 102t-42 102q-42 42-102 42t-102-42Zm396 0q-42 42-102 42-8 0-15-.5t-15-2.5q25-29 39.5-64.5T600-624q0-41-14.5-76.5T546-765q8-2 15-2.5t15-.5q60 0 102 42t42 102q0 60-42 102ZM168-264h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14t-99 42q-4.95 2.83-7.98 7.91-3.02 5.09-3.02 12V-264Zm267-309.21q21-21.21 21-51T434.79-675q-21.21-21-51-21T333-674.79q-21 21.21-21 51T333.21-573q21.21 21 51 21T435-573.21ZM384-264Zm0-360Z"/></svg>
                                <p>2 People</p>
                            </div>
                            <div className="trips-row-lorem">
                                <p>Travel is the movement of people between relatively distant geographical locations, and can involve travel by foot, bicycle,....</p>
                            </div>
                        </div>
                        <div className="col-trips-piac-in-2">
                            <p className="left">8% off</p>
                            <div className="row-money-off">
                                <h2>₹ 1,100</h2>
                                <h4>₹<del>1,300</del></h4>
                            </div>
                            <h5>Naxt Doparture</h5>
                            <p>July 1, 2026 to July 4, 2026</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="trips-row-2">
                <div className="trips-col-date">
                    <div>
                        <p>Next Departure</p>
                        <p>July 1, 2026 to July 4, 2026</p>
                    </div>
                    <button>VIEW TRIP</button>
                </div>
            </div>
        </section>

        
        <section className="trips-section">
            <div className="trips-row-1">
                <div className="col-trips-piac-1">
                    <img src={MyImage2} alt="" width="400px" />
                </div>
                <div className="col-trips-piac-2">
                    <div className="col-trips-piac-row-1">
                        <h1>7 Days tour to Explore the Beauty of philippines</h1>
                    </div>
                    <div className="col-trips-piac-row-2">
                        <div className="col-trips-piac-in-1">
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M480-388q62-56 88-81t41-44q14-17 20.5-35.5T636-587q0-35-25.5-60.5T550-673q-21 0-40 9t-30 23q-12-14-30.5-23t-39.5-9q-35 0-60.5 25.5T324-587q0 19 6.5 36t20.5 36q16 21 44 48.5t85 78.5Zm0 197q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323-227 245.5-339.5T168-549q0-134 89-224.5T480-864q133 0 222.5 90.5T792-549q0 97-77 209T480-96Zm0-456Z"/></svg>
                                <p>Maldives, Philippines</p>
                            </div>
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M298.5-418.29q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29Zm156 0q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29Zm156 0q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29ZM216-96q-29.7 0-50.85-21.5Q144-139 144-168v-528q0-29 21.15-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29.7 0 50.85 21.5Q816-725 816-696v528q0 29-21.15 50.5T744-96H216Zm0-72h528v-360H216v360Zm0-432h528v-96H216v96Zm0 0v-96 96Z"/></svg>
                                <p>7 Days</p>
                            </div>
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M96-192v-92q0-25.78 12.5-47.39T143-366q54-32 114.5-49T384-432q66 0 126.5 17T625-366q22 13 34.5 34.61T672-284v92H96Zm648 0v-92q0-42-19.5-78T672-421q39 8 75.5 21.5T817-366q22 13 34.5 34.67Q864-309.65 864-284v92H744ZM282-522q-42-42-42-102t42-102q42-42 102-42t102 42q42 42 42 102t-42 102q-42 42-102 42t-102-42Zm396 0q-42 42-102 42-8 0-15-.5t-15-2.5q25-29 39.5-64.5T600-624q0-41-14.5-76.5T546-765q8-2 15-2.5t15-.5q60 0 102 42t42 102q0 60-42 102ZM168-264h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14t-99 42q-4.95 2.83-7.98 7.91-3.02 5.09-3.02 12V-264Zm267-309.21q21-21.21 21-51T434.79-675q-21.21-21-51-21T333-674.79q-21 21.21-21 51T333.21-573q21.21 21 51 21T435-573.21ZM384-264Zm0-360Z"/></svg>
                                <p>2 People</p>
                            </div>
                            <div className="trips-row-lorem">
                                <p>Travel is the movement of people between relatively distant geographical locations, and can involve travel by foot, bicycle,....</p>
                            </div>
                        </div>
                        <div className="col-trips-piac-in-2">
                            <p className="left">8% off</p>
                            <div className="row-money-off">
                                <h2>₹ 1,100</h2>
                                <h4>₹<del>1,300</del></h4>
                            </div>
                            <h5>Naxt Doparture</h5>
                            <p>July 1, 2026 to July 4, 2026</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="trips-row-2">
                <div className="trips-col-date">
                    <div>
                        <p>Next Departure</p>
                        <p>July 1, 2026 to July 4, 2026</p>
                    </div>
                    <button>VIEW TRIP</button>
                </div>
            </div>
        </section>


        <section className="trips-section">
            <div className="trips-row-1">
                <div className="col-trips-piac-1">
                    <img src={MyImage3} alt="" width="400px" />
                </div>
                <div className="col-trips-piac-2">
                    <div className="col-trips-piac-row-1">
                        <h1>7 Days tour to Explore the Beauty of philippines</h1>
                    </div>
                    <div className="col-trips-piac-row-2">
                        <div className="col-trips-piac-in-1">
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M480-388q62-56 88-81t41-44q14-17 20.5-35.5T636-587q0-35-25.5-60.5T550-673q-21 0-40 9t-30 23q-12-14-30.5-23t-39.5-9q-35 0-60.5 25.5T324-587q0 19 6.5 36t20.5 36q16 21 44 48.5t85 78.5Zm0 197q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323-227 245.5-339.5T168-549q0-134 89-224.5T480-864q133 0 222.5 90.5T792-549q0 97-77 209T480-96Zm0-456Z"/></svg>
                                <p>Maldives, Philippines</p>
                            </div>
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M298.5-418.29q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29Zm156 0q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29Zm156 0q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29ZM216-96q-29.7 0-50.85-21.5Q144-139 144-168v-528q0-29 21.15-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29.7 0 50.85 21.5Q816-725 816-696v528q0 29-21.15 50.5T744-96H216Zm0-72h528v-360H216v360Zm0-432h528v-96H216v96Zm0 0v-96 96Z"/></svg>
                                <p>7 Days</p>
                            </div>
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M96-192v-92q0-25.78 12.5-47.39T143-366q54-32 114.5-49T384-432q66 0 126.5 17T625-366q22 13 34.5 34.61T672-284v92H96Zm648 0v-92q0-42-19.5-78T672-421q39 8 75.5 21.5T817-366q22 13 34.5 34.67Q864-309.65 864-284v92H744ZM282-522q-42-42-42-102t42-102q42-42 102-42t102 42q42 42 42 102t-42 102q-42 42-102 42t-102-42Zm396 0q-42 42-102 42-8 0-15-.5t-15-2.5q25-29 39.5-64.5T600-624q0-41-14.5-76.5T546-765q8-2 15-2.5t15-.5q60 0 102 42t42 102q0 60-42 102ZM168-264h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14t-99 42q-4.95 2.83-7.98 7.91-3.02 5.09-3.02 12V-264Zm267-309.21q21-21.21 21-51T434.79-675q-21.21-21-51-21T333-674.79q-21 21.21-21 51T333.21-573q21.21 21 51 21T435-573.21ZM384-264Zm0-360Z"/></svg>
                                <p>2 People</p>
                            </div>
                            <div className="trips-row-lorem">
                                <p>Travel is the movement of people between relatively distant geographical locations, and can involve travel by foot, bicycle,....</p>
                            </div>
                        </div>
                        <div className="col-trips-piac-in-2">
                            <p className="left">8% off</p>
                            <div className="row-money-off">
                                <h2>₹ 1,100</h2>
                                <h4>₹<del>1,300</del></h4>
                            </div>
                            <h5>Naxt Doparture</h5>
                            <p>July 1, 2026 to July 4, 2026</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="trips-row-2">
                <div className="trips-col-date">
                    <div>
                        <p>Next Departure</p>
                        <p>July 1, 2026 to July 4, 2026</p>
                    </div>
                    <button>VIEW TRIP</button>
                </div>
            </div>
        </section>


        <section className="trips-section">
            <div className="trips-row-1">
                <div className="col-trips-piac-1">
                    <img src={MyImage4} alt="" width="400px" />
                </div>
                <div className="col-trips-piac-2">
                    <div className="col-trips-piac-row-1">
                        <h1>7 Days tour to Explore the Beauty of philippines</h1>
                    </div>
                    <div className="col-trips-piac-row-2">
                        <div className="col-trips-piac-in-1">
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M480-388q62-56 88-81t41-44q14-17 20.5-35.5T636-587q0-35-25.5-60.5T550-673q-21 0-40 9t-30 23q-12-14-30.5-23t-39.5-9q-35 0-60.5 25.5T324-587q0 19 6.5 36t20.5 36q16 21 44 48.5t85 78.5Zm0 197q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323-227 245.5-339.5T168-549q0-134 89-224.5T480-864q133 0 222.5 90.5T792-549q0 97-77 209T480-96Zm0-456Z"/></svg>
                                <p>Maldives, Philippines</p>
                            </div>
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M298.5-418.29q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29Zm156 0q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29Zm156 0q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29ZM216-96q-29.7 0-50.85-21.5Q144-139 144-168v-528q0-29 21.15-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29.7 0 50.85 21.5Q816-725 816-696v528q0 29-21.15 50.5T744-96H216Zm0-72h528v-360H216v360Zm0-432h528v-96H216v96Zm0 0v-96 96Z"/></svg>
                                <p>7 Days</p>
                            </div>
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M96-192v-92q0-25.78 12.5-47.39T143-366q54-32 114.5-49T384-432q66 0 126.5 17T625-366q22 13 34.5 34.61T672-284v92H96Zm648 0v-92q0-42-19.5-78T672-421q39 8 75.5 21.5T817-366q22 13 34.5 34.67Q864-309.65 864-284v92H744ZM282-522q-42-42-42-102t42-102q42-42 102-42t102 42q42 42 42 102t-42 102q-42 42-102 42t-102-42Zm396 0q-42 42-102 42-8 0-15-.5t-15-2.5q25-29 39.5-64.5T600-624q0-41-14.5-76.5T546-765q8-2 15-2.5t15-.5q60 0 102 42t42 102q0 60-42 102ZM168-264h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14t-99 42q-4.95 2.83-7.98 7.91-3.02 5.09-3.02 12V-264Zm267-309.21q21-21.21 21-51T434.79-675q-21.21-21-51-21T333-674.79q-21 21.21-21 51T333.21-573q21.21 21 51 21T435-573.21ZM384-264Zm0-360Z"/></svg>
                                <p>2 People</p>
                            </div>
                            <div className="trips-row-lorem">
                                <p>Travel is the movement of people between relatively distant geographical locations, and can involve travel by foot, bicycle,....</p>
                            </div>
                        </div>
                        <div className="col-trips-piac-in-2">
                            <p className="left">8% off</p>
                            <div className="row-money-off">
                                <h2>₹ 1,100</h2>
                                <h4>₹<del>1,300</del></h4>
                            </div>
                            <h5>Naxt Doparture</h5>
                            <p>July 1, 2026 to July 4, 2026</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="trips-row-2">
                <div className="trips-col-date">
                    <div>
                        <p>Next Departure</p>
                        <p>July 1, 2026 to July 4, 2026</p>
                    </div>
                    <button>VIEW TRIP</button>
                </div>
            </div>
        </section>

        <section className="trips-section">
            <div className="trips-row-1">
                <div className="col-trips-piac-1">
                    <img src={MyImage5} alt="" width="400px" />
                </div>
                <div className="col-trips-piac-2">
                    <div className="col-trips-piac-row-1">
                        <h1>7 Days tour to Explore the Beauty of philippines</h1>
                    </div>
                    <div className="col-trips-piac-row-2">
                        <div className="col-trips-piac-in-1">
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M480-388q62-56 88-81t41-44q14-17 20.5-35.5T636-587q0-35-25.5-60.5T550-673q-21 0-40 9t-30 23q-12-14-30.5-23t-39.5-9q-35 0-60.5 25.5T324-587q0 19 6.5 36t20.5 36q16 21 44 48.5t85 78.5Zm0 197q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323-227 245.5-339.5T168-549q0-134 89-224.5T480-864q133 0 222.5 90.5T792-549q0 97-77 209T480-96Zm0-456Z"/></svg>
                                <p>Maldives, Philippines</p>
                            </div>
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M298.5-418.29q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29Zm156 0q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29Zm156 0q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29ZM216-96q-29.7 0-50.85-21.5Q144-139 144-168v-528q0-29 21.15-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29.7 0 50.85 21.5Q816-725 816-696v528q0 29-21.15 50.5T744-96H216Zm0-72h528v-360H216v360Zm0-432h528v-96H216v96Zm0 0v-96 96Z"/></svg>
                                <p>7 Days</p>
                            </div>
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M96-192v-92q0-25.78 12.5-47.39T143-366q54-32 114.5-49T384-432q66 0 126.5 17T625-366q22 13 34.5 34.61T672-284v92H96Zm648 0v-92q0-42-19.5-78T672-421q39 8 75.5 21.5T817-366q22 13 34.5 34.67Q864-309.65 864-284v92H744ZM282-522q-42-42-42-102t42-102q42-42 102-42t102 42q42 42 42 102t-42 102q-42 42-102 42t-102-42Zm396 0q-42 42-102 42-8 0-15-.5t-15-2.5q25-29 39.5-64.5T600-624q0-41-14.5-76.5T546-765q8-2 15-2.5t15-.5q60 0 102 42t42 102q0 60-42 102ZM168-264h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14t-99 42q-4.95 2.83-7.98 7.91-3.02 5.09-3.02 12V-264Zm267-309.21q21-21.21 21-51T434.79-675q-21.21-21-51-21T333-674.79q-21 21.21-21 51T333.21-573q21.21 21 51 21T435-573.21ZM384-264Zm0-360Z"/></svg>
                                <p>2 People</p>
                            </div>
                            <div className="trips-row-lorem">
                                <p>Travel is the movement of people between relatively distant geographical locations, and can involve travel by foot, bicycle,....</p>
                            </div>
                        </div>
                        <div className="col-trips-piac-in-2">
                            <p className="left">8% off</p>
                            <div className="row-money-off">
                                <h2>₹ 1,100</h2>
                                <h4>₹<del>1,300</del></h4>
                            </div>
                            <h5>Naxt Doparture</h5>
                            <p>July 1, 2026 to July 4, 2026</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="trips-row-2">
                <div className="trips-col-date">
                    <div>
                        <p>Next Departure</p>
                        <p>July 1, 2026 to July 4, 2026</p>
                    </div>
                    <button>VIEW TRIP</button>
                </div>
            </div>
        </section>

        <section className="trips-section">
            <div className="trips-row-1">
                <div className="col-trips-piac-1">
                    <img src={MyImage6} alt="" width="400px" />
                </div>
                <div className="col-trips-piac-2">
                    <div className="col-trips-piac-row-1">
                        <h1>7 Days tour to Explore the Beauty of philippines</h1>
                    </div>
                    <div className="col-trips-piac-row-2">
                        <div className="col-trips-piac-in-1">
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M480-388q62-56 88-81t41-44q14-17 20.5-35.5T636-587q0-35-25.5-60.5T550-673q-21 0-40 9t-30 23q-12-14-30.5-23t-39.5-9q-35 0-60.5 25.5T324-587q0 19 6.5 36t20.5 36q16 21 44 48.5t85 78.5Zm0 197q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323-227 245.5-339.5T168-549q0-134 89-224.5T480-864q133 0 222.5 90.5T792-549q0 97-77 209T480-96Zm0-456Z"/></svg>
                                <p>Maldives, Philippines</p>
                            </div>
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M298.5-418.29q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29Zm156 0q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29Zm156 0q-10.5-10.29-10.5-25.5t10.29-25.71q10.29-10.5 25.5-10.5t25.71 10.29q10.5 10.29 10.5 25.5t-10.29 25.71q-10.29 10.5-25.5 10.5t-25.71-10.29ZM216-96q-29.7 0-50.85-21.5Q144-139 144-168v-528q0-29 21.15-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29.7 0 50.85 21.5Q816-725 816-696v528q0 29-21.15 50.5T744-96H216Zm0-72h528v-360H216v360Zm0-432h528v-96H216v96Zm0 0v-96 96Z"/></svg>
                                <p>7 Days</p>
                            </div>
                            <div className="trips-row-map">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M96-192v-92q0-25.78 12.5-47.39T143-366q54-32 114.5-49T384-432q66 0 126.5 17T625-366q22 13 34.5 34.61T672-284v92H96Zm648 0v-92q0-42-19.5-78T672-421q39 8 75.5 21.5T817-366q22 13 34.5 34.67Q864-309.65 864-284v92H744ZM282-522q-42-42-42-102t42-102q42-42 102-42t102 42q42 42 42 102t-42 102q-42 42-102 42t-102-42Zm396 0q-42 42-102 42-8 0-15-.5t-15-2.5q25-29 39.5-64.5T600-624q0-41-14.5-76.5T546-765q8-2 15-2.5t15-.5q60 0 102 42t42 102q0 60-42 102ZM168-264h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14t-99 42q-4.95 2.83-7.98 7.91-3.02 5.09-3.02 12V-264Zm267-309.21q21-21.21 21-51T434.79-675q-21.21-21-51-21T333-674.79q-21 21.21-21 51T333.21-573q21.21 21 51 21T435-573.21ZM384-264Zm0-360Z"/></svg>
                                <p>2 People</p>
                            </div>
                            <div className="trips-row-lorem">
                                <p>Travel is the movement of people between relatively distant geographical locations, and can involve travel by foot, bicycle,....</p>
                            </div>
                        </div>
                        <div className="col-trips-piac-in-2">
                            <p className="left">8% off</p>
                            <div className="row-money-off">
                                <h2>₹ 1,100</h2>
                                <h4>₹<del>1,300</del></h4>
                            </div>
                            <h5>Naxt Doparture</h5>
                            <p>July 1, 2026 to July 4, 2026</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="trips-row-2">
                <div className="trips-col-date">
                    <div>
                        <p>Next Departure</p>
                        <p>July 1, 2026 to July 4, 2026</p>
                    </div>
                    <button>VIEW TRIP</button>
                </div>
            </div>
        </section>
        
    </main>
    );
}

export default Trips;