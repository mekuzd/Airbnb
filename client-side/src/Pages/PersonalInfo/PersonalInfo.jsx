import { useContext, useEffect, useState } from "react";
import NavbarAuth from "../../components/Navbar/NavbarAuth";
import { Context } from "../../Provider/Context";
import "./PersonalInfo.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import httpAuth from "../../Services/config";
import PopModal from "../../components/SignUp";
import LoginFooter from "../../components/LoginFooter/LoginFooter";
import EditName from "../../utils/EditName";
import Email from "../../utils/Email";
import Phone from "../../utils/Phone";
import Address from "../../utils/Address";
import EmergencyContact from "../../utils/EmergContat";
import Footer from "../../components/Footer/Footer";

const PersonalInfo = () => {
  const [editname, seteditname] = useState(false);
  const [editmail, seteditmail] = useState(false);
  const [editphone, seteditphone] = useState(false);
  const [editaddress, seteditaddress] = useState(false);
  const [editcontact, seteditcontact] = useState(false);

  const {
    setUser,
    User,
    setModalShow,
    modalShow,
    authloading,
    setauthloading,
  } = useContext(Context);
  let isMounted = true;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setauthloading(true);
        const response = await httpAuth.get("/user/fetchUser");
        setUser(response.data.user);
        setauthloading(false);
      } catch (error) {
        setauthloading(true);
        setModalShow(true);
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
    <>
      {" "}
      <NavbarAuth />
      {authloading ? (
        <div className=" center-screen">
          <div className="spinner-border "></div>
        </div>
      ) : (
        <section className="mt-5 PersonalInfo">
          <div className="personal-info">
            <Link to={"/Accounts"}>Account </Link>
            <span className="ms-3 mb-1">
              {" "}
              <FaAngleRight />
            </span>
            <span className="mx-3"> Personal Info</span>
          </div>
          <Link to={"/Accounts"} className="angle">
            {" "}
            <FaAngleLeft />
          </Link>
          <h2> Personal Info</h2>

          <section className="d-flex justify-content-between mt-5">
            {/* name */}
            <main className="info">
              <main>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Legal name</span>
                  <button
                    className="text-dark"
                    onClick={() => seteditname(!editname)}
                  >
                    {editname ? "Cancel" : "Edit"}
                  </button>
                </div>
                {editname ? (
                  <EditName seteditname={seteditname} />
                ) : (
                  <p>
                    {User?.FirstName} {User?.LastName}
                  </p>
                )}
              </main>{" "}
              {/* email */}
              <main>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Email Address</span>
                  <button
                    className="text-dark"
                    onClick={() => seteditmail(!editmail)}
                  >
                    {editmail ? "Cancel" : "Edit"}
                  </button>
                </div>
                {editmail ? (
                  <Email seteditmail={seteditmail} />
                ) : (
                  <p>{User?.Email}</p>
                )}
              </main>{" "}
              {/* PhoneNumber */}
              <main>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Phone Number</span>
                  <button
                    className="text-dark"
                    onClick={() => seteditphone(!editphone)}
                  >
                    {editphone ? "Cancel" : "Edit"}
                  </button>
                </div>
                {editphone ? (
                  <Phone seteditphone={seteditphone} />
                ) : (
                  <p>{User.PhoneNumber || "not provided"}</p>
                )}
              </main>{" "}
              {/* Address */}
              <main>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Address</span>
                  <button
                    className="text-dark"
                    onClick={() => seteditaddress(!editaddress)}
                  >
                    {editaddress ? "Cancel" : "Edit"}
                  </button>
                </div>
                {editaddress ? (
                  <Address seteditaddress={seteditaddress} />
                ) : (
                  <p>
                    {User?.Address?.suite +
                      User?.Address?.street +
                      User?.Address?.state +
                      User?.Address?.country || "not provided"}
                  </p>
                )}
              </main>
              {/* //emergency contact */}
              <main>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Emergency Contact</span>
                  <button
                    className="text-dark"
                    onClick={() => seteditcontact(!editcontact)}
                  >
                    {editcontact ? "Cancel" : "Edit"}
                  </button>
                </div>
                {editcontact ? (
                  <EmergencyContact seteditcontact={seteditcontact} />
                ) : (
                  <p>{User?.EmergencyContact?.name || "not provided"}</p>
                )}
              </main>{" "}
            </main>
            <main className="questions border ">
              <div>
                <BsFillShieldLockFill className="fs-3" />
                <h4 className="my-4">Why isn’t my info shown here?</h4>
                <p>
                  We’re hiding some account details to protect your identity.
                </p>
              </div>
              <hr className="my-4" />{" "}
              <div>
                <BsFillShieldLockFill className="fs-3" />
                <h4 className="my-4">Which details can be edited?</h4>
                <p>
                  Details Airbnb uses to verify your identity can’t be changed.
                  Contact info and some personal details can be edited, but we
                  may ask you verify your identity the next time you book or
                  create a listing.
                </p>
              </div>
              <hr className="my-4" />{" "}
              <div>
                <BsFillShieldLockFill className="fs-3" />
                <h4 className="my-4">What info is shared with others?</h4>
                <p>
                  Airbnb only releases contact information for Hosts and guests
                  after a reservation is confirmed.
                </p>
              </div>
              <hr className="my-4" />
            </main>
          </section>
        </section>
      )}
      <Footer />
      <LoginFooter />
      <PopModal show={modalShow} onHide={() => setModalShow(false)} />
      <div className="space"></div>
    </>
  );
};
export default PersonalInfo;
