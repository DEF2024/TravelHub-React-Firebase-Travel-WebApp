import { useState } from "react";

const demoUser = {
    name:"Nantha kumar.T",
    email:"nantha2005@gmail.com",
    city:"Trichy",
    favourite:"munnar",
};

const trips =[
    {place:"Munnar Hills", date:"Oct 2026", status:"Upcoming"},
    {place:"Chennai", date:"Jan 2027", status:"Completed"},
    {place:"Mysore", date:"May 2027", status:"Completed"},
];

  function Profile(){
    const [form,setForm]=useState(demoUser);
    const initials = form.name.trim().split(/\s+/).map((word)=>word[0]).join("").slice(0, 2).toUpperCase();
      const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const save = (e) => {
    e.preventDefault();
    alert("Profile saved!");
  };
  return(
    <section className="profile">
        <div className="profile-page">
            <div className="card head">
                <div className="initials">{initials}</div>
                <div className="grow">
                    <h1>{form.name}</h1>
                    <p>{form.email}.{form.city}</p>
                </div>
                 <button  className="btn-8 ghost">Log Out</button>
            </div>
              <div className="card stats">
                <div><b>12</b><span>Trips planned</span></div>
                <div><b>5</b><span>Countries</span></div>
                <div><b>28</b><span>Saved places</span></div>
              </div>

                <form className="card" onSubmit={save}>

                    <h2>EDIT PROFILE</h2>
                    <div className="form">
                        <div><label>Full name</label><input name="name" value={form.name} onChange={change} /></div>
                        <div><label>Email</label><input name="email" type="email" value={form.email} onChange={change} /></div>
                        <div><label>Home city</label><input name="city" value={form.city} onChange={change} /></div>
                        <div><label>Favourite destination</label><input name="favourite" value={form.favourite} onChange={change} /></div>
                    </div>
                    <p style={{ margin: "18px 0 0" }}><button className="btn-8" type="submit">Save changes</button></p>
                </form>

                <div className="card">

                   <h2>MY TRIPS</h2>
                    {trips.map((t) => (
                   <div className="trip" key={t.place}>
                   <div>{t.place}<small>{t.date}</small></div>
                   <span className="tag">{t.status}</span>
                    </div>
                    ))}
                </div>

        </div>
    </section>
  );
}
export default Profile;