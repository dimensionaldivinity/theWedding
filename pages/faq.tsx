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
        <p>Le Roma Gardenia is a beautiful resort with lovely open garden spaces, a charming courtyard, a pool area, a welcoming clubhouse, and elegant residential blocks. Additionally, the resort offers a cozy lounge area, a well-stocked library, a snooker table for entertainment, and a movie theater for your leisure. If you find a moment amidst the joyous wedding celebrations, a leisurely stroll around the resort will allow you to relish these amenities. It's worth noting that all wedding events will be held in the scenic outdoor gardens and the delightful courtyard area.
        <br />
Location details can be found below.</p> 
      </div> 
    </motion.div> 
  
    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
        <p>2. Where are we staying?</p> 
      </motion.div> 
  
      <div class="accordion__answer"> 
        <p> 
        Our accommodation is arranged across two locations. Some of our family members will be staying at the wedding venue at Le Roma Gardenia along with the Bride, Groom and their parents. All other family members and guests who are traveling in from outside Bangalore will stay in <a className="accordian-link" href="https://maps.app.goo.gl/XdLEdxSfqu7UNemYA">Clarion Hotel</a> in Yelahanka. This hotel is approximately 6-7 minutes away from the wedding venue. The hotel has been booked for our guests for 2 nights, that is 4th and 5th December. The room charges have been covered for your convenience, but if you need any extra room services, we kindly ask you to settle those charges individually at the time of check-out.
        <br />
Location details can be found below.</p>
<p>
Check in: 12 PM (4th December, 2023)
<br />
Check out: 11 Am (6th December, 2023)

</p> 
      </div> 

      
    </motion.div> 
    

    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <p>3. What time should I arrive?</p>
      </motion.div>
      <div class="accordion__answer"> 
        <p>The hotel's check-in time is set for 12 noon on the 4th of December. We kindly ask that you plan your transportation to ensure you have ample time to check in, refresh, and join us for the Mehendi festivities and the Welcome Lunch (starting at 1pm at Le Roma Gardenia). To assist us in making your journey more comfortable, please take a moment to complete this <a className="accordian-link" href="/contact">form</a> with your travel details. </p> 
      </div> 
    </motion.div> 

    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
        <p>4. When does the wedding end?</p> 
  
      </motion.div> 
      <div class="accordion__answer"> 
      <p>The wedding celebrations culminate with the Pheras ceremony around 6am on the 6th of December. Following this, we extend a warm invitation for our guests to join us for breakfast, which will be served from 7am onward. The hotel's check-out time is scheduled for 11am, so we kindly request all guests to arrange their onward travel plans accordingly. Rest assured, transportation will be provided in the morning to ensure a smooth journey to the airports. Your comfort and convenience are our top priorities.</p></div> 
    </motion.div> 

    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
        <p>5. How do I get to the wedding venue?</p> 
  
      </motion.div> 
      <div class="accordion__answer"> 
        <p>Upon your arrival at Kempegowda International Airport or the Bangalore Train Station, dedicated transportation will be in place to convey you to your hotel. Furthermore, there will be designated vehicles operating between the hotel and the wedding venue, ensuring your convenience and timely arrivals as per the wedding event schedule.</p> 
        
        <p>Please note that these cars have been exclusively reserved to facilitate transportation between the hotel, the wedding venue, and the airport only. They will not be available for personal use. Your cooperation in this matter is greatly appreciated.</p>
      </div> 
    </motion.div> 

    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
        <p>6.  What should I wear? Is there a dress code?</p> 
  
      </motion.div> 
      <div class="accordion__answer"> 
        <p>Indian wedding ceremonies are  joyful and festive, and colorful outfits are highly encouraged! To assist you in selecting the perfect attire, our <a className="accordian-link" href="/pdf/wardrobe-planner.pdf">Wardrobe Planner</a> is designed to provide insights into the various wedding themes and offers recommendations for preferred colors to consider.  
        
        </p><p>
        
        Ultimately, our priority is your comfort and enjoyment, so feel free to choose something that resonates with your style and allows you to dance and enjoy. If you desire more detailed information or specific suggestions, don't hesitate to consult the bride; she might have a treasure trove of recommendations and details at her disposal!
        </p>
      </div> 
    </motion.div> 

    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}>  
        <p>7. Can we visit other places of interest in Bangalore during the wedding dates?</p> 
  
      </motion.div> 
      <div class="accordion__answer"> 
      <p>Bangalore is a vibrant city with an array of fantastic places to explore. However, it's worth noting that the city's traffic can pose a substantial challenge. Most of the noteworthy attractions are located at least 1.5 to 2 hours away from the hotel and wedding venue. As a result, we recommend organizing any city-related activities either before or after the wedding dates to avoid adding unnecessary stress to your schedule. This way, you can fully enjoy the wedding festivities without feeling rushed.
</p>
      </div> 
    </motion.div> 

    <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
        <p>8. If I am arriving in Bangalore a few days before the wedding or staying back after, are there any recommendations for hotels?</p> 
  
      </motion.div> 
      <div class="accordion__answer"> 
        <p>As mentioned above, Bangalore traffic is very congested and one has to keep 1.5 hours approx. for traveling anywhere from the wedding venue and hotel. If you are arriving a few days before the 4th or staying back after the 6th, we recommend booking hotels in the City Centre in order to be closer to eateries, shopping malls, markets, and attractions. Indiranagar, Koramangala and MG Road are some bustling areas which have a good mix of restaurants, breweries, shops, markets, etc. Some recommendations of hotels are:  
        <li><a className="accordian-link" href="https://www.royalorchidhotels.com/regenta-inn-indiranagar-bangalore/overview " target="blank">Regenta Inn, Indiranagar</a></li>
        <li><a className="accordian-link" href="https://www.royalorchidhotels.com/regenta-inn-grand-koramangala-bengaluru/overview "target="blank">Regenta Inn Grand, Kormangala</a></li>
        <li><a className="accordian-link" href="https://www.blupetalhotel.com/ "target="blank">Bluepetal Hotel</a></li>
        </p>
        <p>These options are just indicative, feel free to explore these areas and book whatever suits you best. </p>
      </div> 
    </motion.div> 

    {/* <motion.div class="accordion" variants={FADE_UP_ANIMATION_VARIANTS}> 
      <motion.div class="accordion__question" variants={FADE_UP_ANIMATION_VARIANTS}> 
        <p>9. Extra</p> 
  
      </motion.div> 
      <div class="accordion__answer"> 
        <p> </p> 
      </div> 
    </motion.div>  */}

   
  </div> 
  </motion.div>

           
            
            </div>


             {/* scss form */}

            
          </section>

          <section id="sectionProjects" className="section-projects">
            
          

            
            <div>
            
            <div>
            <h1 className="heading-1">
              <span>Venue & Hotel Details</span>
            </h1>
            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">PHERAS & MUHURTHAM</h4>
              </div>
              
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  // data-scroll-class="lp-anim"
                  className="heading-2"
                >
                  Le Roma Gardenia
                  <br /> IVRI Road, Bangalore
                </h2>
                

                <a
                  rel="noopener"
                  target="_blank"
                  href="https://maps.app.goo.gl/KkN7GJcDGo2CjqJX8"
                  className="contact-card-anchor"
                >
                  View the location on maps
                </a>
                
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">PHERAS & MUHURTHAM</h4>
              </div>
              
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  // data-scroll-class="lp-anim"
                  className="heading-2"
                >
                  Hotel Clarion
                  <br /> Attur Layout, Yelahanka, 
                  <br />Bangalore
                </h2>
                

                <a
                  rel="noopener"
                  target="_blank"
                  href="https://maps.app.goo.gl/XdLEdxSfqu7UNemYA"
                  className="contact-card-anchor"
                >
                  View the location on maps
                </a>
                
              </div>
            </div>
             
            </div>
            </div>
          </section>
         
         
          <section className="section-socials">
            <h1 className="heading-1">
              <span>If you need to reach us!</span> <small>👋</small>
            </h1>
            <p className="paragraph">here is how to contact us</p>
            <div className="section-socials--links">
              <a
                href="mailto:lmarriesp@gmail.com"
                rel="noopener"
                target="_blank"
              >
                📧 E-mail
              </a>
              <a
                href="tel:+917003664695"
                rel="noopener"
                target="_blank"
              >
               📞 Lavneeta
              </a>
              <a
                href="tel:+918383048570"
                rel="noopener"
                target="_blank"
              >
               📞 Prasad
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
