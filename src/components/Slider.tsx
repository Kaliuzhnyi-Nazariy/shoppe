import { useKeenSlider } from "keen-slider/react";

const Slider = () => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 2,
      spacing: 15,
    },
  });
  return (
    <div ref={ref} className="keen-slider">
      {/* <div className="keen-slider__slide slide">1</div> */}
      <div className="keen-slider__slide border-black rounded-sm w-35 h-10 text-center items-center flex justify-center">
        1
      </div>
      <div className="keen-slider__slide border-black rounded-sm w-35 h-10 text-center items-center flex justify-center">
        2
      </div>
      {/* <div className="keen-slider__slide number-slide2">2</div>
      <div className="keen-slider__slide number-slide3">3</div>
      <div className="keen-slider__slide number-slide4">4</div>
      <div className="keen-slider__slide number-slide5">5</div>
      <div className="keen-slider__slide number-slide6">6</div> */}
    </div>
  );
};

export default Slider;
