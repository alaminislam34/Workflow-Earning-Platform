import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
// import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { AuthContext } from "../../../Auth/AuthContext";
import TestimonialForm from "./ReviewForm";

const Testimonial = () => {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const { theme } = useContext(AuthContext);
  const [sliderRef, sliderInstance] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 13,
    },
    breakpoints: {
      "(min-width: 620px)": {
        slides: {
          perView: 2,
          spacing: 13,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 13,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: (t) => t * (2 - t),
    },
  });

  useEffect(() => {
    axios(`clientReview.json`)
      .then((res) => setClients(res.data))
      .catch((error) => console.error("Error loading JSON file:", error));
  }, []);

  useEffect(() => {
    if (clients.length > 0 && sliderInstance.current) {
      const interval = setInterval(() => {
        sliderInstance.current.next();
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [sliderInstance, clients]);

  useEffect(() => {
    if (clients.length > 0 && sliderInstance.current) {
      sliderInstance.current.update();
    }
  }, [clients, sliderInstance]);

  return (
    <div className="mx-4 md:mx-auto">
      <br />
      <SectionTitle
        Title={"Testimonial"}
        description={
          "Insights and feedback from our esteemed clients hold immense value, guiding us to improve and deliver exceptional service consistently."
        }
      />
      <br />

      {clients.length > 0 ? (
        <section
          ref={sliderRef}
          className="keen-slider py-4"
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
        >
          {clients.map((client, index) => (
            <div
              style={{ height: "300px" }}
              key={index}
              className={`${
                theme === "light"
                  ? "bg-white shadow-md"
                  : "bg-gray-800 text-white"
              } keen-slider__slide number-slide${
                index + 1
              } rounded-xl text-center flex flex-col justify-center items-center p-4 space-y-3`}
            >
              <img
                className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover bg-cover bg-center"
                src={client.img}
                alt="client"
                referrerPolicy="no-referrer"
              />
              <Rating
                style={{ maxWidth: 100 }}
                value={client.rating}
                readOnly
              />
              <h4 className="text-lg md:text-xl font-semibold text-black">
                {client.name}
              </h4>
              <p className="text-sm md:text-base text-gray-500">
                {client.description.slice(0, 100)}....
              </p>
            </div>
          ))}
        </section>
      ) : (
        <p>Loading testimonials...</p>
      )}
      <div className="flex justify-center items-center">
        <button
          onClick={() => setOpen(true)}
          className="btn btn-md text-white lg:btn-lg bg-btnColor hover:bg-primaryColor rounded-xl"
        >
          Post Your Review
        </button>
      </div>
      <div
        className={`${
          open ? "block" : "hidden"
        } fixed top-0 left-0 bg-black/40 z-50 w-screen h-screen flex justify-center items-center`}
      >
        <div className="w-full h-full flex justify-center items-center">
          <TestimonialForm setOpen={setOpen} />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Testimonial;
