// @ts-nocheck
import React, { useState, useEffect } from "react";
import Head from "next/head";
// import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import useSwr from "swr";
import ReactGa from "react-ga";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import signIn from "./api/auth/signin";
import { useRouter } from 'next/router';

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

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/guestlist")
    }
  
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

  // db stuff again in functional component
  
  const [guests, setGuests] = useState([
    // { gname: 'abc', when: '4.12' },
    // { gname: 'def', when: '5.12' },
]);
const [newGuest, setNewGuest] = useState({gname : '', email: '', phone:'', date:'', flight:'', time:'', message:'' })

//add items to db


//read items from db




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
        
        <main className="container">
          {/* <p className="about-text">
            Hello stranger! 👋, welcome to the wedding
          </p> */}
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span>Sign in</span>
            </h1>
            <p className="paragraph">
              
            </p>

            
            {/* scss form */}
            <div>

            <form onSubmit={handleForm}>
                <div className="group">
                 <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="" />
                   <span class="bar"></span>
                   <label>Email</label>
                </div>
                <div className="group">
                  <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="" />
                    <span className="bar"></span>
                    <label>Password</label>
                </div>
  
 
                <button className="btn-custom" type="submit">Sign in</button>
            </form>
            
            </div>


             {/* scss form */}

            
            

            

            
          </section>
         
          <section className="section-contact">
            
            
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
