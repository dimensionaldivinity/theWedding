// @ts-nocheck
import React, { useState, useEffect } from "react";
import Head from "next/head";
// import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import useSwr from "swr";
import ReactGa from "react-ga";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface indexProps {}


// db stuff
// function Guestdb(){
// const [guests, setGuests] = useState([
//     { gname: 'abc', when: 4.12 },
//     { gname: 'def', when: 5.12 },
// ]);
// };


const locomotiveScroll =
  typeof window !== `undefined` ? require("locomotive-scroll").default : null;

const hoverEffect =
  typeof window !== `undefined` ? require("hover-effect").default : null;



const fetcher = (url: any) => fetch(url).then((res) => res.json());

const index: React.FC<indexProps> = ({}) => {
  
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

  // db stuff again in functional component
  
  const [guests, setGuests] = useState([
    // { gname: 'abc', when: '4.12' },
    // { gname: 'def', when: '5.12' },
]);
const [newGuest, setNewGuest] = useState({gname : '', email: '', phone:'', date:'', flight:'', time:'', message:'' })

//add items to db

const addGuest = async (e) => {
  e.preventDefault();
  if (newGuest.gname !== '', newGuest.email !== '', newGuest.phone !== '', newGuest.date !== '', newGuest.flight !== '', newGuest.time !== '', newGuest.message !== '' ) {
    // setGuests([...guests, newGuest]);
    await addDoc(collection(db, 'guests'), {
      gname: newGuest.gname.trim(),
      email: newGuest.email,
      phone: newGuest.phone,
      date: newGuest.date,
      flight: newGuest.flight,
      time: newGuest.time,
      message: newGuest.message,
    });
    setNewGuest({gname:'', email:'', phone:'', date:'', flight:'', time:'', message:'' });
  }
}
//read items from db

useEffect(() => {
 const queryData = query(collection(db, 'guests'))
 const unsubscribe = onSnapshot(queryData, (querySnapshot) => {
   let guestsArr = [];
   
   querySnapshot.forEach ((doc) => {
    guestsArr.push({...doc.data(), id: doc.id})
   });
   setGuests(guestsArr);
 })
},[]);


  // ends here
  const { data: reviews, error } = useSwr("/api/tweets", fetcher);

  if (error) console.log(error);

  const refScroll = React.useRef(null);
  let lscroll: any;

  React.useEffect(() => {
    ReactGa.initialize("G-V46HDLQVHY");
    ReactGa.pageview(window.location.pathname + window.location.search);

    if (!refScroll.current) return;
    // @ts-ignore
    lscroll = new locomotiveScroll({
      el: refScroll.current,
      smooth: true,
      reloadOnContextChange: true,
      multiplier: 0.75,
      inertia: 0.5,
    });

    // update locomotive scroll
    window.addEventListener("load", () => {
      let image = document.querySelector("img");
      // @ts-ignore
      const isLoaded = image!.complete && image!.naturalHeight !== 0;
      lscroll.update();
    });

    // image hover effect
    Array.from(document.querySelectorAll(".project-card__middle")).forEach(
      (el: any) => {
        const imgs: any = Array.from(el.querySelectorAll("img"));
        new hoverEffect({
          parent: el,
          intensity: 0.2,
          speedIn: el.dataset.speedin || undefined,
          speedOut: el.dataset.speedout || undefined,
          easing: el.dataset.easing || undefined,
          hover: el.dataset.hover || undefined,
          image1: imgs[0].getAttribute("src"),
          image2: imgs[1].getAttribute("src"),
          displacementImage: el.dataset.displacement,
        });
      }
    );

    // header cursor
    const cursor = document.querySelector(".cursor");
    window.onmousemove = (e: any) => {
      cursor!.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px;`);
    };

    console.clear();
    console.log.apply(console, [
      "%c The answer is not 42 %c %c🚀 %c\n",
      "color: #fff; background: #8000ff; padding:5px 0;",
      "color: #fff; background: #242424; padding:5px 0 5px 5px;",
      "background: #242424; padding:5px 0",
      "background: #242424; padding:5px 5px 5px 0",
    ]);
   
  }, []);

  

  function toggleBodyScroll(isToggleOpen: boolean) {
    if (isToggleOpen === false) {
      setIsToggleOpen(true);
    } else if (isToggleOpen === true) {
      setIsToggleOpen(false);
    }
  }

  return (
    <>
      <div id="menu-target" data-scroll-container ref={refScroll}>
        <Head>
        <link rel="icon" href="svg/favicon.svg" />
          <link href="https://dprasad.me/" rel="canonical" />
          <meta name="theme-color" content="#10101A" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#10101A"
          />
          <title>L+P Wedding website</title>
          <meta
            name="description"
            content="L + P Wedding"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="L+P Wedding website"
          />
          <meta property="og:url" content="https://dprasad,em/" />
          <meta property="og:image" content="webp/preview-image.png" />
          <meta
            property="og:description"
            content="L + P Wedding"
          />
          <meta
            name="twitter:title"
            content="L+P Wedding website"
          />
          <meta
            name="twitter:description"
            content="This is for the wedding "
          />
        </Head>
        
        <div className="cursor"></div>
        <Navigation
          isOpen={isToggleOpen}
          toggleOpen={() => toggleBodyScroll(isToggleOpen)}
        />
        <div className="header-wrapper">
          <header className="header">
            <div className="header__hero">
              <div className="header__hero--heading">
                <span>Let us know your travel </span> <br />
                <span>details for the </span>
                <span className="header__hero--heading-gradient">
                  wedding.{" "}
                </span>
                <br />
                <span>See you soon</span>
              </div>
              {/* <a
                data-scroll-to
                className="header__hero--cta"
                href="#sectionProjects"
              >
                VIEW PROJECTS
              </a> */}
            </div>
          </header>
          
        </div>
        <main className="container">
          {/* <p className="about-text">
            Hello stranger! 👋, welcome to the wedding
          </p> */}
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span>It will be easier for us to arrange your stay while you are here</span>
            </h1> <h1><small>💼</small></h1>
            <p className="paragraph">
            
            </p>

            
            {/* scss form */}
            <div>

            <form action="">
  <div className="group">
    <input 
    value={newGuest.gname}
    onChange={(e) => setNewGuest({...newGuest, gname : e.target.value})}
    type="text" className="name_hid" name="name" autocomplete="off" placeholder="" required></input>
    <span class="bar"></span>
    <label>Name*</label>
  </div>
  <div className="group">
    <input 
    value={newGuest.email}
    onChange={(e) => setNewGuest({...newGuest, email : e.target.value})}
    type="email" placeholder="" name="email" autocomplete="off"></input>
    <span className="bar"></span>
    <label>Email</label>
  </div>
  <div className="group">
    <input 
    value={newGuest.phone}
    onChange={(e) => setNewGuest({...newGuest, phone : e.target.value})} 
    type="phone" name="phone" class="input--tel" autocomplete="off" placeholder="" minlength="10" required></input>
    <span className="bar"></span>
    <label>Phone*</label>
  </div>
  <div className="group">
    <input 
    value={newGuest.date}
    onChange={(e) => setNewGuest({...newGuest, date : e.target.value})} 
    type="date" name="date" autocomplete="off"  placeholder="" min="2023-12-03" max="2023-12-05" required></input>
    <span className="bar"></span>
    <label>Date of Arrival</label>
  </div>
  <div className="group">
    <input 
    value={newGuest.flight}
    onChange={(e) => setNewGuest({...newGuest, flight : e.target.value})} 
    type="text" placeholder="" name="flight" autocomplete="off" required></input>
    <span className="bar"></span>
    <label>Flight/Train no.</label>
  </div>
  <div className="group">
    <input 
    value={newGuest.time}
    onChange={(e) => setNewGuest({...newGuest, time : e.target.value})} 
    type="time" placeholder="" name="time" autocomplete="off" required></input>
    <span className="bar"></span>
    <label>Estimated time of arrival</label>
  </div>
  
  <div className="group">
    <input 
    value={newGuest.message}
    onChange={(e) => setNewGuest({...newGuest, message : e.target.value})} 
    type="textarea" rows="10" cols="40" placeholder="" name="message" autocomplete="off"></input>
    <span className="bar"></span>
    <label>Anything else you wanna let us know?</label>
  </div>
  <button className="btn-custom" onClick={addGuest}>Send it</button>
</form>
            
            </div>


             {/* scss form */}

            
            {/* <div>
              <dialog open>
                <p>Greetings, one and all!</p>
                   <form method="dialog">
                     <button>OK</button>
                   </form>
              </dialog>
            </div> */}
            <section className="section-contact">
            <h1 className="heading-1">
              <span>Thank you </span> <small>🙏</small>
            </h1>
            <h2 className="section-contact__h2">
              Thanks you for filling the form out, its a huge help. We hope to see you soon, If you need any further details or if you want to just have a chat, please give us a
              <a href="tel:+918383048570"> call </a>
              or send me an
              <a
                href="mailto:lmarriesp@gmail.com"
                rel="noopener"
                target="_blank"
              >
                &nbsp; email 📧
              </a>
              .
            </h2>
          </section>

            

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">4th Dec - 6th Dec 2023</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/contact.webp" alt="Gardenia" />
                <img src="webp/contact-1.webp" alt="Gardenia" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="lp-anim"
                  className="heading-2"
                >
                  Le Roma Gardenia, Bangalore
                </h2>
                
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://maps.app.goo.gl/KkN7GJcDGo2CjqJX8"
                  className="contact-card-anchor"
                >
                  Take me to maps.
                </a>
                
              </div>
            </div>
          </section>
         
         
          <section className="section-socials">
            <h1 className="heading-1">
              <span>Dont be a stranger!</span> <small>👋</small>
            </h1>
            <p className="paragraph">come have a chat</p>
            <div className="section-socials--links">
              <a
                href="mailto:lmarriesp@gmail.com"
                rel="noopener"
                target="_blank"
              >
                👾 E-mail
              </a>
              <a
                href="tel:+918383048570"
                rel="noopener"
                target="_blank"
              >
                🐦 Call Us
              </a>
              
              <a
                href="https://www.instagram.com/"
                rel="noopener"
                target="_blank"
              >
                📸 Instagram
              </a>
            </div>
          </section>
        </main>
        <footer className="footer">
          <img
            src="svg/lp-logo-footer.svg"
            alt="LP wedding"
          />
          <div className="footer__socials">
            <a
              href=""
              target="_blank"
              rel="noopener"
            >
              <img src="svg/ganesha.svg" alt="ganesha" />
            </a>
            
          </div>
        </footer>
      </div>
    </>
  );
};

export default index;
