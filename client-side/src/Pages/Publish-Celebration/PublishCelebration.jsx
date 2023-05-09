import { useContext } from "react";
import "./PublishCelebration.css";
import { useEffect, useState } from "react";
import { Context } from "../../Provider/Context";
import httpAuth from "../../Services/config";
import { TbSignature } from "react-icons/tb";
import { Link } from "react-router-dom";

function PublishCelebration() {
  const [property, setProperty] = useState({});
  const { propertyId } = useContext(Context);
  let isMounted = true;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await httpAuth.get(
          `property/findproperty/${propertyId}`
        );
        setProperty(response.data.prop);
      } catch (error) {
        setProperty({});
        console.log(property);
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
    <main>
      <section className="mainDiv ">
        <div className="divWithin1">
          {/* <video
            src="blob:https://www.airbnb.com/ef6e0ca8-d80e-4673-b9eb-e5b4b65e3d32"
            style={{ width: "100%", height: "100%" }}
          ></video> */}
          {/* <video
            preload="auto"
            // style="object-fit: cover;"
            src="blob:https://www.airbnb.com/ef6e0ca8-d80e-4673-b9eb-e5b4b65e3d32"
          ></video> */}
        </div>
        <div className="divWithin2">
          <div className="divTexts">
            <h1>Congratulations , {property?.host?.LastName} </h1>
            <p className="mt-5">
              From one Host to another—welcome aboard. Thank you for sharing
              your home and helping to create incredible experiences for our
              guests.
            </p>
            <div>
              <TbSignature style={{ fontSize: "60px" }} />
            </div>
            <p className="fw-bold">Tolulope and Emeka, Partners</p>
          </div>
          <section>
            <div className="publishFooter">
              <button className="buttonFooter px-4 py-2">
                Let's get started
              </button>
            </div>
          </section>
        </div>
      </section>
      <section className="sticky-bottom divButtonSwitch2 px-3 text-center">
        {/* <Link to={} className="text-decoration-none"> */}
        <button className="buttonSwitch2">
          <span style={{ color: "white", fontSize: "20px", marginLeft: "5px" }}>
            Let's get started
          </span>
        </button>
        {/* </Link> */}
      </section>
    </main>
  );
}
export default PublishCelebration;
