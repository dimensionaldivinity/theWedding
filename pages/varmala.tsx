// @ts-nocheck
import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import useSwr from "swr";
import ReactGa from "react-ga";

interface indexProps {}

interface Ireply {
  id: number;
  name: string;
  userName: string;
  reply: string;
}

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
  const [speakerState, setSpeakerState] = useState("muted");
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
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
      "%c The Answer %c %c %c\n",
      "color: #fff; background: #8000ff; padding:5px 0;",
      "color: #fff; background: #242424; padding:5px 0 5px 5px;",
      "background: #242424; padding:5px 0",
      "background: #242424; padding:5px 5px 5px 0",
    ]);
    console.log.apply(console, [
      "%c is not 42, btw.\n",
      "color: #fff; background: #8000ff; padding:5px 0;",
    ]);
  }, []);

  const handleSpeaker = () => {
    const audio = document.querySelector("#audioPlayer") as HTMLVideoElement;

    if (speakerState === "muted") {
      setSpeakerState("unmuted");
      audio.pause();
    } else {
      setSpeakerState("muted");
      audio.play();
    }
  };

  const [outfits, setOutfits] = useState ([
    {when:'4/12 - 1:30PM', occ: 'Mehendi', wear: 'Fun, Colourful & Quiry' },
    {when:'4/12 - 2:30PM', occ: 'Welcome Lunch', wear: 'well, Lunch Clothes? ' },
    {when:'4/12 - 6:00PM', occ: 'Tilak', wear: 'Indo-western, some shimmer ' },
    {when:'4/12 - 6:30PM', occ: 'Sangeet', wear: 'Your shoes are more important than clothes, but bring the bling on ' },
    {when:'5/12 - 10:30AM', occ: 'Haldi', wear: 'Traditional, Ivory, Gold and Ochre ' },
    {when:'5/12 - 6:30PM', occ: 'Varmala', wear: 'well, Lunch Clothes? ' },
    {when:'5/12 - 7:30PM', occ: 'Reception', wear: 'Indian Ethnic and Formals, but dazzle ' },
    {when:'6/12 - 4:26AM', occ: 'Pheras', wear: 'Formals and Traditional wear ' },
]);

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
          <title>L+P Wedding</title>
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
        <audio loop id="audioPlayer" autoPlay style={{ display: "none" }}>
          <source src="sound/preloader.mp3" type="audio/mp3" />
        </audio>
        {/* <motion.div
          data-scroll
          data-scroll-sticky
          data-scroll-target="#menu-target"
          animate={{ top: "-100vh", transition: { ...transition, delay: 9 } }}
          className="preloader"
        >
          <div className="preloader__wrapper">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__left"
            >
              <img src="svg/lp-logo-left.svg" alt="LP" />
            </motion.div>
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__right"
            >
              <p className="preloader__text">Lavneeta</p>
              <p className="preloader__text">And</p>
              <p className="preloader__text">Prasad</p>
              <p className="preloader__text">Are</p>
              <p className="preloader__text">Getting</p>
              <p className="preloader__text">Married.</p>
              
            </motion.div>
          </div>
        </motion.div> */}
        <div className="cursor"></div>
        <Navigation
          isOpen={isToggleOpen}
          toggleOpen={() => toggleBodyScroll(isToggleOpen)}
        />
        <div className="header-wrapper">
          <header className="header">
            <div className="header__hero">
              <div className="header__hero--heading">
                
                
                <span className="header__hero--heading-gradient">
                  Varmala{" "}
                </span>
                <span></span>
               
                
              </div>
              <div className="writeup">
              <p className="paragraph-writeup" align="justify">
              In the vivid tapestries of Indian weddings, the Varmala ceremony stands as a fascinating spectacle, symbolizing the union of two souls. This ritual has its origins in ancient traditions and is seen as an integral part of a hindu wedding. In ancient times, a girl used to choose her groom by locating a garland around his neck. This ceremony was termed as Swayamvar, where ​​Svayaṁ in Sanskrit means 'self' and vara means 'groom'. In many old scriptures and epics, such as Ramayan or the Mahabharat, this has been documented, where by placing a varmala around a man, the woman accepts him as her husband. 
              </p>
            <br />
            <p className="paragraph-writeup" align="justify">
            It's truly fascinating to consider how this ritual underscores the empowerment of Hindu women in ancient times, highlighting their autonomy in selecting their life partners. In modern times, the Varmala ceremony continues to hold immense significance as the bride and groom exchange garlands, symbolizing their mutual recognition and acceptance of each other as life partners. This act is akin to the exchange of wedding rings in many other cultures and beautifully signifies the union of two souls in a Hindu wedding.
Today, the Varmala, or the ceremony of garlands, marks the first ritual that the Groom & the Bride perform together at their wedding ceremony. By exchanging garlands, similar to the exchange of wedding rings, they signify their recognition & acceptance of each other as life partners. 

            </p>
            <br />
            <p className="paragraph-writeup" align="justify">
            

It's a beautiful tradition that underscores the significance of choice and mutual commitment in the journey of matrimony. Varmala ceremony will take place at La Roma Gardenia, 5th December 6.30pm. </p>
            <a href="/pheras">
            <button className="btn-custom">Pheras and Muhurtham</button>
            </a>
              </div>
              {/* <a
                data-scroll-to
                className="header__hero--cta"
                href="#sectionProjects"
              >
                There is a whole list of events :P
              </a> */}
            </div>
          </header>
          <div className="header__footer">
            <div className="header__footer--left">
              <div className="speaker">
                {/* <div
                  onClick={handleSpeaker}
                  className={`${"speaker__toggle"} ${
                    speakerState === "unmuted"
                      ? `${"speaker__toggle--anim"}`
                      : ``
                  }`}
                >
                  &nbsp;
                </div>
                <div className="speaker__muted">
                  <img src="svg/muted.svg" alt="muted icon" />
                </div> */}
                
              </div>
            </div>
            {/* <div className="header__footer--right">
              <a>
                <img src="svg/icon-flowerhand.svg" alt="" />
              </a>{" "}
              <a>
                <img src="svg/icon-mala.svg" alt="" />
              </a>{" "}
              <a>
                <img src="svg/icon-hawan.svg" alt="" />
              </a>{" "}
              <a>
                <img src="svg/icon-tie.svg" alt="" />
              </a>{" "}
              <a>
                <img src="svg/icon-tali.svg" alt="" />
              </a>
            </div> */}
          </div>
        </div>
        <main className="container">
          {/* <p className="about-text">
            Hello! 👋, Write some personal stuff here maye? <br /> 
          </p> */}
          
          {/* <section className="section-contact">
            <h1 className="heading-1">
              <span>If you have a moment </span> <small>🙏</small>
            </h1>
            <h2 className="section-contact__h2">
              Please fill this &nbsp;
              <a className= "section-contact__btn" href="/contact"> form &nbsp;</a>
              &nbsp; to help us facilitate your commute in Bangalore. See you very soon.
              
            </h2>
          </section> */}

        </main>
        <footer className="footer">
          <img
            src="svg/lp-logo-footer.svg"
            alt=" L + P Wedding"
          />
          <div className="footer__socials">
           
              <img src="svg/ganesha.svg" alt="21 logo" />
            
            {/* <a
              href="#"
              target="_blank"
              rel="noopener"
            >
              <img src="svg/21.svg" alt="github logo" />
            </a> */}
          </div>
        </footer>
      </div>
    </>
  );
};

export default index;
