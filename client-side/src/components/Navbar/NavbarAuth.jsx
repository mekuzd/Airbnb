import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Provider/Context";
import "./Navbar.css";
import { TbWorld } from "react-icons/tb";
import { FaBars } from "react-icons/fa";
import Airlogo from "../../../src/assets/airbnb-logo.png";
import UserPics from "../../../src/assets/User.jpg";
import { Existing } from "../../utils/setlocalstorage";
import httpAuth from "../../Services/config";

const NavbarAuth = () => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showWish, setshowWish] = useState(false);

  const {
    Loggedin,
    User,
    setModalShow,
    setexisting,
    setUser,
    setwishlist,
    wishlist,
  } = useContext(Context);

  let isMounted = true;
  const navigate = useNavigate();
  function HideDropdown() {
    setModalShow(true);
    setDropdown(false);
  }
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await httpAuth.get("/wishlist");
        setwishlist(response.data.wish);
      } catch (error) {
        if (error.response.data.msg == "unauthorised") {
          return setshowWish(false);
        }
        setwishlist([]);
        setloading(true);
        console.log(error.response.data.msg);
      }
    };

    if (isMounted) {
      fetchWishlist();
    }
    return () => {
      isMounted = false;
    };
  }, [wishlist]);

  useEffect(() => {
    if (wishlist.length < 1) {
      setshowWish(false);
    } else {
      setshowWish(true);
    }
  }, [wishlist]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedin");
    localStorage.removeItem("img");
    navigate("/");
    location.reload();
    Existing(setexisting);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await httpAuth.get("/fetchUser");
        setUser(response.data.user);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };

    if (isMounted) {
      fetchUser();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <nav className=" p-3 webNav">
      <div>
        <Link to={"/"} className="text-decoration-none">
          <img src={Airlogo} alt="" className="image" />
        </Link>
      </div>

      <div className="webNav1  ">
        {Loggedin ? (
          <div>
            <Link
              to={"/become-a-host"}
              className="text-decoration-none text-dark fw-normal"
            >
              {" "}
              Switch to hosting
            </Link>
          </div>
        ) : (
          <div>
            <Link to={"/"} className="text-decoration-none text-dark">
              {" "}
              Airbnb your home
            </Link>
          </div>
        )}

        {/* world icon  */}
        <div>
          <TbWorld className="tbIcon" />
        </div>
        {/* bars */}
        <div>
          <button
            className="userButton postition-relative "
            onClick={() => setDropdown(!dropdown)}
          >
            <div>
              <FaBars />
            </div>

            {/* display user Image */}

            <div className="user-img">
              <img
                src={User?.Avatar || UserPics}
                alt=""
                style={{ width: "100%" }}
              />
            </div>
            {showWish && (
              <div className="wishlength">
                <span>{wishlist.length} </span>
              </div>
            )}
          </button>
        </div>
        {dropdown && (
          <div ref={dropdownRef} className="dropdown shadow px-0 text-start">
            {Loggedin ? (
              <div>
                <p>
                  {" "}
                  <Link className="fw-bold  text-dark">Messages</Link>
                </p>
                <p>
                  {" "}
                  <Link>Trips</Link>
                </p>
                <p>
                  {" "}
                  <Link to={"/wishlist"}>
                    Wishlist
                    {showWish && (
                      <span className="text-danger mx-3 ">
                        ({wishlist.length})
                      </span>
                    )}
                  </Link>
                </p>
                <hr />
                <p>
                  {" "}
                  <Link to={"/listings"}>Manage listings</Link>
                </p>
                <p>
                  {" "}
                  <Link>Manage experiences</Link>
                </p>
                <p>
                  {" "}
                  <Link to={"/Accounts"}>Account</Link>
                </p>
                <hr />
                <p>
                  {" "}
                  <Link>Help </Link>
                </p>
                <button
                  className="border-0 bg-white mx-2 p-0"
                  onClick={handleLogOut}
                >
                  Log out
                </button>
              </div>
            ) : (
              <div>
                <p onClick={HideDropdown} className="fw-bold text-dark ">
                  {" "}
                  Login{" "}
                </p>{" "}
                <p onClick={HideDropdown}>Sign Up</p>
                <hr />
                <p>
                  <Link>Airbnb your home</Link>
                </p>
                <p>
                  {" "}
                  <Link>Host an experience</Link>{" "}
                </p>
                <p>
                  <Link>Help</Link>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
export default NavbarAuth;
