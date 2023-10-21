import * as React from "react";
import { motion } from "framer-motion";

const openTransition = {
  duration: 1.1,
  delay: 1.2,
  ease: [0.6, 0.01, -0.05, 0.9],
};

const openTopTransition = {
  duration: 1.1,
  delay: 1.3,
  ease: [0.6, 0.01, -0.05, 0.9],
};

const openBottomTransition = {
  duration: 1.1,
  delay: 1.7,
  ease: [0.6, 0.01, -0.05, 0.9],
};

const closedTansition = {
  duration: 1,
  ease: [0.6, 0.01, -0.05, 0.9],
};

export const MobileNavigation = ({ variants, isOpen }: any) => (
  <motion.div
    data-scroll
    data-scroll-sticky
    data-scroll-target="#menu-target"
    variants={variants}
    className="menu-wrapper"
  >
    <motion.div
      animate={
        isOpen
          ? { opacity: 1, transition: openTransition }
          : { opacity: 0, transition: closedTansition }
      }
    >
      <motion.div
        animate={
          isOpen
            ? { opacity: 1, transition: openTopTransition }
            : { opacity: 0, transition: closedTansition }
        }
        className="navigation-top"
      >
        <div className="navigation-top__left">
          <h4 className="navigation-h4">We are excited to have you!</h4>
          <div className="navigation-top__left--links">
          <a
                href="/pdf/Wedding-Invitation.pdf"
                rel="noopener"
                target="_blank"
              >
                Invitation
              </a>
          </div>
          <div className="navigation-top__left--links">
          <a
                href="/itenerary"
                rel="noopener"
                target="_blank"
              >
                Itenerary
              </a>

          </div>
          <div className="navigation-top__left--links">
          <a
                href="/wardrobe"
                
              >
                Wardrobe Planner
              </a>

          </div>
          <div className="navigation-top__left--links">
          <a
                href="/faq"
                
              >
                F.A.Qs
              </a>

          </div>
          <div className="navigation-top__left--links">
          <a
                href="/contact"
                
              >
                Add Your Travel Details
              </a>

          </div>
          
        </div>
        <div className="navigation-top__right">
          <h4 className="navigation-h4">Tring to reach us?</h4>
          <a
            href="mailto:lmarriesp@gmail.com"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            send us an email
          </a>
        </div>
      </motion.div>

      <motion.div
        animate={
          isOpen
            ? { opacity: 1, transition: openBottomTransition }
            : { opacity: 0, transition: closedTansition }
        }
        className="navigation-bottom"
      >
        <h4 className="navigation-h4">THE EVENTS</h4>
        <div className="navigation-bottom__projects">
          <a
            target="_blank"
            rel="noopener"
            href="/mehendi"
            className="navigation-bottom__projects-card"
          >
            <img src="webp/mehendi.webp" alt="mehendi" />
            <h2>
              Mehendi
              <br />
              4/12
            </h2>
          </a>
          <a
            href="/haldi"
            target="_blank"
            rel="noopener"
            className="navigation-bottom__projects-card"
          >
            <img src="webp/haldi.webp" alt="haldi" />
            <h2>Haldi
              <br />
              5/12

            </h2>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="navigation-bottom__projects-card"
          >
            <img src="webp/sangeet.webp" alt="sangeet" />
            <h2>
              Pheras
              <br />
              6/12
            </h2>
          </a>
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
);
