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
                <span>Hey! We are getting </span> <br />
                
                <span className="header__hero--heading-gradient">
                  Married.{" "}
                </span>
                <span>And we would love to have you </span>
                <br />
                <span>at the wedding.</span>
                
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
                <div
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
                </div>
                <div className="speaker__unmuted">
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 15 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.599976"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect1-anim"
                    />
                    <rect
                      x="9"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect2-anim"
                    />
                    <rect
                      x="4.79999"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect3-anim"
                    />
                    {/* <rect
                      x="13.2"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect4-anim"
                    /> */}
                  </svg>
                </div>
              </div>
            </div>
            <div className="header__footer--right">
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
            </div>
          </div>
        </div>
        <main className="container">
          {/* <p className="about-text">
            Hello! 👋, Write some personal stuff here maye? <br /> 
          </p> */}
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span>And here it begins </span> <small>💼</small>
            </h1>
            <p className="paragraph">
              The what? The When? The where?
            </p>

            {/* EXPERIMENAL */}

            
            {/* EXPERIMENAL */}
            <button className="btn-custom">Save it as a PDF</button>
            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                  MEHENDI
                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/mehendi.webp" alt="mehendi" />
                <img src="webp/mehendi-2.webp" alt="mehendi" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="alexxandria-anim"
                  className="heading-2"
                >
                  Mehendi
                  <br/> Fun, Colourful & Quirky
                </h2>
                {/* <a
                  rel="noopener"
                  target="_blank"
                  href="/mehendi"
                  className="project-card__link"
                >
                  What will happen?
                </a> */}
                {/* <div className="project-card__socials">
                  <a href="/mehendi">
                    <img src="svg/icon-mhendi.svg" alt="mehendi" />
                  </a>
                  <a
                    rel="noopener"
                    target="_blank"
                    href="/mehendi">
                    <img src="svg/icon-swastika.svg" alt="mehendi" />
                  </a>
                  <a
                    rel="noopener"
                    target="_blank"
                    href="/mehendi">
                    <img src="svg/icon-mehendi-2.svg" alt="mehendi" />
                  </a>
                </div> */}
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">SANGEET</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/sangeet.webp" alt="sangeet" />
                <img src="webp/sangeet-2.webp" alt="sangeet" />
              </div>
              <div className="project-card__right">
                
              <a
                  className="project-card__link"
                >
                  Get ready to put on your dancing shoes
                </a>
                
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="safarika-anim"
                  className="heading-2"
                ><br/>
                  Indo-Western, Shimmer & Shine
                </h2>
               
               
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                HALDI & MANGALASNANAM
                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/haldi.webp" alt="haldi" />
                <img src="webp/haldi-2.webp" alt="haldi" />
              </div>
              <div className="project-card__right">
              <a className="project-card__link">
              Celebrate with us the auspicious ceremonies of haldi and Mangalasnanam
                </a>
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="heatrow-anim"
                  className="heading-2"
                >
                  <br /> Ivory, Gold & Yellow
                </h2>
                
               
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                  VARMALA & RECEPTION
                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/varmala.webp" alt="varmala" />
                <img src="webp/varmala-2.webp" alt="varmala" />
              </div>
              <div className="project-card__right">
              <a
                  className="project-card__link"
                >
                  What will happen?
                </a>
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="heatrow-anim"
                  className="heading-2"
                >
                  <br /> 5/12
                </h2>
               
                
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">PHERAS & MUHURTHAM</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/pheras.webp" alt="pheras" />
                <img src="webp/pheras-2.webp" alt="pheras" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="lp-anim"
                  className="heading-2"
                >
                  Pheras &
                  <br /> Muhurtham
                  <br /> 6/12
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  href="/pheras"
                  className="project-card__link"
                >
                  What will happen?
                </a>
                <div className="project-card__socials">
                  <a
                    rel="noopener"
                    target="_blank"
                    href="#"
                  >
                    <img src="svg/icon-mandap.svg" alt="mandap" />
                  </a>
                  <a
                    rel="noopener"
                    target="_blank"
                    href="#"
                  >
                    <img src="svg/icon-kobbari.svg" alt="shubh" />
                  </a>
                  <a
                    rel="noopener"
                    target="_blank"
                    href="#"
                  >
                    <img src="svg/icon-music.svg" alt="phera" />
                  </a>
                  <a
                    rel="noopener"
                    target="_blank"
                    href="#"
                  >
                    <img src="svg/icon-phera.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>

            

            <div className="project-card-peacock">
              <div>
                <img src="/webp/untitled.webp"></img>
                <div><img></img></div>
              </div>

            </div>

            


          </section>
          <section
            data-scroll
            data-scroll-offset="35%"
            data-scroll-repeat={true}
            data-scroll-class="section-reviews__bg"
            className="section-reviews"
          >
            <div className="section-reviews__top">
              <h1 className="heading-1">
                <span>It's a party </span> <small>😊</small>
              </h1>
              <p className="paragraph paragraph__sub">
                same some nice things on here?
              
              </p>
            </div>
            <div className="section-reviews__bottom">
              <div className="section-reviews__bottom-wrapper review-card__anim1">
                {outfits.map ((outfit, id) => (
                  <div className="review-card">
                    <div className="review-card__top">
                      <div className="review-card__top--left">
                        <p className="review-card__p">{outfit.when}</p>
                        <h3 className="review-card__h3">{outfit.occ}</h3>
                      </div>
                      <div className="review-card__top--right">
                        {/* <img src="svg/twitter.svg" alt="twitter icon" /> */}
                      </div>
                    </div>
                    <div className="review-card__bottom">
                      <h2 className="review-card__h2">{outfit.wear}</h2>
                    </div>
                  </div>
                ))}
              </div>
              <div className="section-reviews__bottom-wrapper review-card__anim2">
                {outfits.map ((outfit, id) => (
                  <div className="review-card">
                    <div className="review-card__top">
                      <div className="review-card__top--left">
                        <p className="review-card__p">{outfit.when}</p>
                        <h3 className="review-card__h3">{outfit.occ}</h3>
                      </div>
                      <div className="review-card__top--right">
                        {/* <img src="svg/twitter.svg" alt="twitter icon" /> */}
                      </div>
                    </div>
                    <div className="review-card__bottom">
                      <h2 className="review-card__h2">{outfit.wear}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="section-contact">
            <h1 className="heading-1">
              <span>If you have a moment </span> <small>🙏</small>
            </h1>
            <h2 className="section-contact__h2">
              Please fill this &nbsp;
              <a className= "section-contact__btn" href="/contact"> form &nbsp;</a>
              &nbsp; to help us facilitate your commute in Bangalore. See you very soon.
              
            </h2>
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
