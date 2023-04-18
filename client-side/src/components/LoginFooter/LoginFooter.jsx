import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LoginFooter.css";
import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { BiUserCircle, BiMessageAlt } from "react-icons/bi";
import { FaAirbnb } from "react-icons/fa";
import { Context } from "../../Provider/Context";
import PopModal from "../SignUp";

function LoginFooter() {
  const { Loggedin, modalShow, setModalShow } = useContext(Context);
  const [activeButton, setActiveButton] = useState(
    localStorage.getItem("active")
      ? JSON.parse(localStorage.getItem("active"))
      : "first"
  );
  const [showfooter, setshowfooter] = useState(true);
  const [previouScrollPosition, setpreviousScrollPosition] = useState(
    window.scrollY
  );

  const handleFooter = () => {
    const currentscrollposition = window.scrollY;
    setpreviousScrollPosition(window.scrollY);
    if (currentscrollposition >= previouScrollPosition) {
      setshowfooter(true);
    } else {
      setshowfooter(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("active", JSON.stringify(activeButton));
  }, [activeButton]);
  const clickedIconHandler = (e) => {
    setActiveButton(e.currentTarget.id);
    localStorage.setItem("active", JSON.stringify(e.currentTarget.id));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleFooter);
    return () => {
      window.removeEventListener("scroll", handleFooter);
    };
  }, [window.scrollY]);
  return (
    <>
      {showfooter && (
        <div className="footerDivMain animate__animated animate__fadeInUp ">
          {Loggedin ? (
            <section>
              <div className="footerDiv2 text-dark text-center">
                <div
                  className=" divWithin "
                  id="first"
                  onClick={clickedIconHandler}
                >
                  <Link to={"/"} className="text-decoration-none ">
                    <AiOutlineSearch
                      className={` ${
                        activeButton === "first" ? "iconColor" : "iconFooter"
                      }`}
                    />
                    <div
                      className={`textFooter ${
                        activeButton === "first" ? `text-dark` : ""
                      }`}
                    >
                      Explore
                    </div>
                  </Link>
                </div>

                <div
                  className=" divWithin "
                  id="second"
                  onClick={clickedIconHandler}
                >
                  <AiOutlineHeart
                    className={`iconFooter ${
                      activeButton === "second" ? `text-danger` : ""
                    }`}
                  />
                  <div
                    className={`textFooter ${
                      activeButton === "second" ? `text-dark` : ""
                    }`}
                  >
                    Wishlists
                  </div>
                </div>
                <div
                  className=" divWithin "
                  id="third"
                  onClick={clickedIconHandler}
                >
                  <FaAirbnb
                    className={`iconFooter ${
                      activeButton === "third" ? `text-danger` : ""
                    }`}
                  />
                  <div
                    className={`textFooter ${
                      activeButton === "third" ? `text-danger` : ""
                    }`}
                  >
                    Trips
                  </div>
                </div>
                <div
                  className=" divWithin "
                  id="fourth"
                  onClick={clickedIconHandler}
                >
                  <BiMessageAlt
                    className={`iconFooter ${
                      activeButton === "fourth" ? `text-danger` : ""
                    }`}
                  />
                  <div
                    className={`textFooter ${
                      activeButton === "fourth" ? `text-danger` : ""
                    }`}
                  >
                    Inbox
                  </div>
                </div>
                <div
                  className=" divWithin"
                  id="fifth"
                  onClick={clickedIconHandler}
                >
                  <Link
                    to={"/Accounts"}
                    className="text-decoration-none text-dark"
                  >
                    <BiUserCircle
                      className={`iconFooter ${
                        activeButton === "fifth" ? `text-danger` : ""
                      }`}
                    />
                    <div
                      className={`textFooter ${
                        activeButton === "fifth" ? `text-danger` : ""
                      }`}
                    >
                      profile
                    </div>
                  </Link>
                </div>
              </div>
            </section>
          ) : (
            <section className="bg-white">
              <div className="footerDiv1 text-dark text-center  bg-white">
                <div
                  className=" divWithin "
                  id="sixth"
                  onClick={clickedIconHandler}
                >
                  <Link to={"/"} className="text-decoration-none ">
                    <AiOutlineSearch
                      className={`iconFooter ${
                        activeButton === "sixth" ? `text-danger` : ""
                      }`}
                    />
                    <div
                      className={`textFooter ${
                        activeButton === "sixth" ? `text-danger` : ""
                      }`}
                    >
                      Explore1
                    </div>
                  </Link>
                </div>
                <div
                  className=" divWithin "
                  id="seven"
                  onClick={clickedIconHandler}
                >
                  <AiOutlineHeart
                    className={`iconFooter ${
                      activeButton === "seven" ? `text-danger` : ""
                    }`}
                  />
                  <div
                    className={`textFooter ${
                      activeButton === "seven" ? `text-danger` : ""
                    }`}
                  >
                    Wishlists
                  </div>
                </div>
                <div
                  className=" divWithin "
                  id="eight"
                  onClick={clickedIconHandler}
                >
                  <div
                    onClick={() => {
                      setModalShow(true);
                    }}
                  >
                    <BiUserCircle
                      className={`iconFooter ${
                        activeButton === "eight" ? `text-danger` : ""
                      }`}
                    />
                    <div
                      className={`textFooter ${
                        activeButton === "eight" ? `text-danger` : ""
                      }`}
                    >
                      login
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
      <PopModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default LoginFooter;
