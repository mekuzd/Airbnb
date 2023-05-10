import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import LoginFooter from "./components/LoginFooter/LoginFooter";
import httpClient from "./Services/httpclient";
import { FaSlidersH, FaRegHeart } from "react-icons/fa";
import { Context } from "./Provider/Context";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import httpAuth from "./Services/config";
import Alert from "./components/Alert";
import PopModal from "./components/SignUp";
function App() {
  const [loading, setloading] = useState(false);
  const [loadingCatgory, setloadingCategory] = useState(true);
  const [categories, setcategories] = useState([]);
  const [clickedFilter, setclickedFilter] = useState("All");
  const [query, setquery] = useState("");
  const [property, setProperty] = useState([]);
  const [alert, setalert] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const { setFilterShow, modalShow, setModalShow, setActiveButton } =
    useContext(Context);
  const [index, setIndex] = useState(0);
  const [_id, setId] = useState("");
  let isMounted = true;
  let isMountedCat = true;
  let catload = [];

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  function showFilter() {
    setFilterShow(true);
  }
  const handleClickFilter = (category) => {
    if (category == "All") {
      setclickedFilter(category);
      return setquery("");
    }
    setclickedFilter(category);
    setquery(category);
  };

  const closeAlert = () => {
    setalert(false);
  };
  // fetchCategories
  useEffect(() => {
    const FetchCategories = async () => {
      try {
        setloadingCategory(true);
        const response = await httpClient.get(`/category/getallcategory`);
        setcategories(["All", ...response.data.category]);
        setloadingCategory(false);
      } catch (error) {
        setcategories([]);
        setloadingCategory(true);
        console.log(error.response.data.msg);
      }
    };

    if (isMountedCat) {
      FetchCategories();
    }
    return () => {
      isMountedCat = false;
    };
  }, []);

  for (let index = 0; index < 10; index++) {
    catload.push(index);
  }

  // fetchProperties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setloading(true);
        const response = await httpClient.get(
          `property/getallproperty/?structure=${query}`,
        );
        setProperty(response.data.prop);
        setloading(false);
      } catch (error) {
        setProperty([]);
        setloading(true);

        console.log(error.response.data.msg);
      }
    };

    if (isMounted) {
      fetchProperties();
    }
    return () => {
      isMounted = false;
    };
  }, [clickedFilter]);
  // console.log(property);

  const addToWishlist = async (e, _id) => {
    e.preventDefault();
    e.stopPropagation();
    setId(_id);

    try {
      const response = await httpAuth.post("/wishlist/create", { _id });
      setalert(true);
      setalertMessage(response.data.msg);
    } catch (error) {
      if (error.response.data.msg == "unauthorised") {
        return setModalShow(true);
      }
      setalert(true);
      setalertMessage(error.response.data.msg);
    }
  };

  useEffect(() => {
    setActiveButton("first");
  });
  return (
    <>
      <div>
        <main className="main_nav">
          <Navbar />
          {/* categories  */}
          <nav className="navFilter">
            {loadingCatgory ? (
              <>
                <main>
                  {catload.map((_, index) => (
                    <div key={index}>
                      <p className="catload"></p>
                    </div>
                  ))}
                </main>
                <button onClick={showFilter}>
                  <FaSlidersH className="searchIcon2" /> filters
                </button>
              </>
            ) : (
              <>
                <main>
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      onClick={() => handleClickFilter(category)}
                      className={`${
                        category == clickedFilter ? "clickeddiv" : ""
                      }`}
                    >
                      <p>{category}</p>
                    </div>
                  ))}
                </main>
                <button onClick={showFilter}>
                  <FaSlidersH className="searchIcon2" /> filters
                </button>
              </>
            )}
          </nav>
        </main>

        {/* display properties  */}

        {loading ? (
          <div className="center-screen">
            <span className="spinner-border text-danger"></span>
          </div>
        ) : (
          <section className="property">
            {property.length > 0 ? (
              <>
                {alert && (
                  <Alert closeAlert={closeAlert} alertMessage={alertMessage} />
                )}
                {property.map((property) => (
                  <Link
                    to={`/property/${property._id}`}
                    className="prop"
                    key={property._id}
                  >
                    {/* carousel  */}
                    <div className=" shadow position-relative">
                      <Carousel onSelect={handleSelect}>
                        {property.images.map((images) => (
                          <Carousel.Item
                            activeindex={index}
                            style={{ width: "300px", height: "200px" }}
                            key={images}
                          >
                            <img src={images} alt="" />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                      <button
                        className="love"
                        onClick={(e) => addToWishlist(e, property._id)}
                      >
                        <FaRegHeart className="fs-5 " />
                      </button>
                      <div className="foot my-3 p-2">
                        <h3>
                          {property?.Location?.city +
                            "," +
                            " " +
                            property?.Location?.country}{" "}
                        </h3>
                        <h6>
                          stay with {property?.host?.FirstName} . Works as a{" "}
                          {property?.host?.Work}{" "}
                        </h6>
                        <h5>${property?.price} night</h5>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <div className="">
                {" "}
                <h6 className="text-danger">
                  properties of the selected category cant be found
                </h6>
              </div>
            )}
          </section>
        )}
      </div>
      <PopModal show={modalShow} onHide={() => setModalShow(false)} />

      <LoginFooter />
    </>
  );
}

export default App;
