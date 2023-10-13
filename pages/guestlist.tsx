// @ts-nocheck
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import useSwr from "swr";
import ReactGa from "react-ga";
import { collection, addDoc, getDoc, querySnapshot, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import * as XLSX from "xlsx";

interface indexProps {}

interface Ireply {
  id: number;
  name: string;
  userName: string;
  reply: string;
}
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

const transition: { duration: number; ease: number[] } = {
  duration: 1.4,
  ease: [0.6, 0.01, -0.05, 0.9],
};

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
      "%c Designed and Developed by Prasad %c %c🚀 %c\n",
      "color: #fff; background: #8000ff; padding:5px 0;",
      "color: #fff; background: #242424; padding:5px 0 5px 5px;",
      "background: #242424; padding:5px 0",
      "background: #242424; padding:5px 5px 5px 0",
    ]);
    console.log.apply(console, [
      "%c Thanks for stopping by, I’m currently looking to a new team of creative designers and developers.\n",
      "color: #fff; background: #8000ff; padding:5px 0;",
    ]);
  }, []);

  

  function toggleBodyScroll(isToggleOpen: boolean) {
    if (isToggleOpen === false) {
      setIsToggleOpen(true);
    } else if (isToggleOpen === true) {
      setIsToggleOpen(false);
    }
  }

    // making the excel work

    const excelData = guests.map((guests, id) => {
      return guests;
    });
  
    const exportExcel = () => {
      let wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(excelData);
  
      XLSX.utils.book_append_sheet(wb, ws, "Guestlist");
      XLSX.writeFile(wb, "Guestlist.xlsx");
    };
    // ends here

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
          <title>Lavneeta + Prasad</title>
          <meta
            name="description"
            content="for the wedding"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Prasad 🚀 &mdash; Frontend Devloper"
          />
          <meta property="og:url" content="https://dprasad.me/" />
          <meta property="og:image" content="webp/preview-image.png" />
          <meta
            property="og:description"
            content="for the wedding"
          />
          
         
        </Head>
        
        <div className="cursor"></div>
        <Navigation
          isOpen={isToggleOpen}
          toggleOpen={() => toggleBodyScroll(isToggleOpen)}
        />
        {/* <div className="header-wrapper">
          <header className="header">
            <div className="header__hero">
              <div className="header__hero--heading">
                
                <span className="header__hero--heading-gradient">
                  GUEST LIST{" "}
                </span>
                <br />
                <span> </span>
              </div>
              </div>
          </header>
          
        </div> */}
        <main className="container">
          {/* <p className="about-text">
            Hello stranger! 👋, we are geeting married
          </p> */}
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span> The Guest List</span> <small>💼</small>
            </h1>
            
             
          </section>


          <section className="section-contact">
          <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="lp-anim"
                  className="heading-2"
                  padding ="5%"
                >
                  Guest Details
                </h2>
            <div className="table-header">
              <table cellPadding="5" cellSpacing="2" border="0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>phone</th>
                    <th>date</th>
                    <th>flight</th>
                    <th>time</th>
                  </tr>
                </thead>
              </table>
            </div>   
            <div className="table-content">
            <table>
                {guests.map((guests, id) => {
                    return (
                        <tr key={id}>
                            <td>{guests.gname}</td>
                            <td>{guests.phone}</td>
                            <td>{guests.date}</td>
                            <td>{guests.flight}</td>
                            <td>{guests.time}</td>
                        </tr>
                    )
                })}
            </table>
            </div>  
            <div>
              <button className="btn-custom" onClick={exportExcel}>
                Export to Excel
              </button>
            </div>     


          </section>
          
          
          <section className="section-socials">
            <h1 className="heading-1">
              <span>Lmk if you face any problems on here</span>
            </h1>
            
            <div className="section-socials--links">
              
              
            </div>
          </section>
        </main>
        <footer className="footer">
          <img
            src="svg/lp-logo-footer.svg"
            alt="l P Wedding "
          />
          <div className="footer__socials">
          <a
              href="#"
              target="_blank"
              rel="noopener"
            >
              <img src="svg/ganesha.svg" alt="ganesha" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener"
            >
              <img src="svg/21.svg" alt="21" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default index;
