// @ts-nocheck
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
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

    const FADE_UP_ANIMATION_VARIANTS = {
        hidden: { opacity: 0, y: -10 },
        show: { opacity: 1, y: 0, transition: { type: "spring" } },
      };
  
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

  // db stuff again in functional component
  
  const [guests, setGuests] = useState([
    // { gname: 'abc', when: '4.12' },
    // { gname: 'def', when: '5.12' },
]);
const [newGuest, setNewGuest] = useState({gname : '', email: '', phone:'', date:'', flight:'', time:'', message:'' })

//add items to db


//read items from db



let answers = document.querySelectorAll(".accordion"); 
answers.forEach((event) => { 
  event.addEventListener("click", () => { 
    if (event.classList.contains("active")) { 
      event.classList.remove("active"); 
    } else { 
      event.classList.add("active"); 
    } 
  }); 
});




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

          <section className="itenerary">
          
          </section>
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span>F.A.Q.</span>
            </h1>

            

            
            {/* scss form */}
            <div>

            <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
            <div class="acclayout"> 
           
    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
        <p>1. What is the wedding venue like?</p> 
  
      </motion.div> 
      <div class="accordion__answer"> 
        <p>Le Roma Gardenia is a beautiful resort with lovely open garden areas, a Courtyard, a pool, Clubhouse and residential blocks. The resort also has a Lounge area along with a Library, a Snooker table, a Movie theater, etc. If you are not too busy enjoying the wedding festivities, you can take a stroll around the resort to enjoy these. All wedding functions will be taking place in the outdoor gardens and Courtyard area. We recommend wearing comfortable shoes (or heels if you are a pro) to allow movement around the resort. </p> 
      </div> 
    </motion.div> 
  
    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
        <p>2. Where are we staying?</p> 
      </motion.div> 
  
      <div class="accordion__answer"> 
        <p> 
        The guests traveling in from outside Bangalore are going to be staying in<a className="accordian-link" href="https://maps.app.goo.gl/XdLEdxSfqu7UNemYA"> Clarion Hotel</a> in Yelahanka, approximately 6-7 minutes away from the wedding venue. The hotel has been booked for our guests for 2 nights, that is 4th and 5th December. The room charges have been taken care of, but should you require any room services, we request you to settle the bills during check out.

Check in: 12 noon (4th December, 2023)
Check out: 11 am (6th December, 2023)

Some close family members and guests who need special assistance will be staying at the wedding venue at Le Roma Gardenia along with the Bride, Groom and their families. 

        </p> 
      </div> 

      
    </motion.div> 
    

    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <p>3. What time should I arrive?</p>
      </motion.div>
      <div class="accordion__answer"> 
        <p>The Check In time for the hotel is from 12 noon. We request you to book your transport accordingly so that you have enough time to check in and make it in time for Mehendi and Welcome Lunch (1 PM onwards). Please fill this<a className="accordian-link" href="/contact"> form</a> to update us on your travel details so we are better equipped to make your journey comfortable! </p> 
      </div> 
    </motion.div> 

    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
        <p>4. When does the wedding end?</p> 
  
      </motion.div> 
      <div class="accordion__answer"> 
        <p> The wedding festivities end with the Pheras around 6 am on 6th December. Post that, guests are welcome to join us for breakfast from 7 am onwards. The Check out time from the hotel is 11 am so we request you all to plan your future travel accordingly. Transportation will be available to take you to the airports in the morning. </p> 
      </div> 
    </motion.div> 

    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
        <p>5. How do I get to the wedding venue?</p> 
  
      </motion.div> 
      <div class="accordion__answer"> 
        <p> Once you arrive at the Kempegowda International Airport, there will be cars which will take you to your hotel. Between the hotel and the wedding venue, there will be designated cars which will be available to take you back and forth as needed according to the timings of the wedding functions. </p> 
        <br></br>
        <p>P.S. These cars have specifically been booked to escort guests between the hotel, the wedding venue and Airport ONLY. They will not be available for personal use. </p>
      </div> 
    </motion.div> 

    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
        <p>6.  What should I wear? Is there a dress code?</p> 
  
      </motion.div> 
      <div class="accordion__answer"> 
        <p>Indian wedding ceremonies are a festive occasion, so colorful outfits are welcome! <a className="accordian-link" href="/wardrobe">TheWardrobe Planner </a>should help you understand the different themes and includes suggestions for preferred colours for your outfits. Some suggestions are:
Women: Kurta sets, Shararas, Evening gowns, Lehengas, Dresses, Sarees
Men: Kurtas, Nehru jackets, Blazers, Indo-Western Kurtas, Jackets, Suits
Hope these help! At the end of the day, we want you to be comfortable so just pick something you love and can dance in! If you're looking for a more detailed answer, just ask the bride -I am sure she has a few excels ready!
 </p> 
      </div> 
    </motion.div> 

    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}>  
        <p>7. Can we visit other places of interest in Bangalore during the wedding dates?</p> 
  
      </motion.div> 
      <div class="accordion__answer"> 
        <p>Bangalore is a bustling city with amazing places to visit. However, the traffic is a HUGE issue. Most places of interest will be atleast 1.5/2 hours away from the Hotel and wedding venue. Hence, we recommend planning any city activities before or after the wedding dates in order to not make it super hectic for yourself.  </p> 
      </div> 
    </motion.div> 

    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
        <p>8. Extra</p> 
  
      </motion.div> 
      <div class="accordion__answer"> 
        <p> </p> 
      </div> 
    </motion.div> 

    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
        <p>9. Extra</p> 
  
      </motion.div> 
      <div class="accordion__answer"> 
        <p> </p> 
      </div> 
    </motion.div> 

   
  </div> 
  </motion.div>

           
            
            </div>


             {/* scss form */}

            
          </section>
         
          <section className="section-contact">
            
          <h1 className="heading-1">
              <span>Get in touch</span> <small>👋</small>
            </h1>
           
            <div className="section-socials--links">
              <a
                href="mailto:lmarriesp@gmail.com"
                rel="noopener"
                target="_blank"
              >
                E-mail
              </a>
              <a
                href="tel:+918383048570"
                rel="noopener"
                target="_blank"
              >
                Call Us
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
