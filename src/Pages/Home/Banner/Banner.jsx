import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./styles.css";
import banner2 from "../../../assets/Banner/banner2.jpg";
import banner5 from "../../../assets/Banner/banner5.jpg";
import b2 from "../../../assets/Banner/b.jpg";
import b3 from "../../../assets/Banner/b3.jpg";
import b3copy from "../../../assets/Banner/b3(copy).jpg";

const Banner = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <>
      <div ref={sliderRef} className="keen-slider relative z-10">
        <div className="keen-slider__slide number-slide1">
          <img
            src={banner2}
            className="object-cover hidden md:block bg-center w-full h-full"
            alt=""
          />
          <img
            src={banner5}
            className="object-cover md:hidden bg-center w-full h-full"
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide2">
          <img
            src={b2}
            className="object-cover bg-center w-full h-full"
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide3">
          {" "}
          <img
            src={b3}
            className="object-cover md:hidden bg-center w-full h-full"
            alt=""
          />
          <img
            src={b3copy}
            className="object-cover hidden md:block bg-center w-full h-full"
            alt=""
          />
        </div>
      </div>
    </>
  );
};
export default Banner;
