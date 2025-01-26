import { useQuery } from "@tanstack/react-query";
import { FaClinicMedical } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const axiosPublic = useAxiosPublic();

  const { data: camps = [] } = useQuery({
    queryKey: ["past-camps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/past-camps");
      return res.data;
    },
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <Slider {...settings} className="overflow-hidden">
      {camps.map((camp) => (
        <div key={camp._id} className="relative">
          {/* Image */}
          <img
            src={camp.image}
            alt={camp.campName}
            className="w-full h-96 md:h-[520px] object-center"
          />

          <div className="absolute inset-0 bg-slate-700 bg-opacity-40">
            <div className="absolute inset-0 flex items-center justify-center text-white p-8">
              <div className="text-center max-w-3xl p-3 md:p-8 bg-black bg-opacity-50 rounded-xl">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  {camp.campName}
                </h2>
                <p className="md:text-lg mb-6">
                  {camp.achievements.join(" | ")}
                </p>

                {/* Positive outcomes */}
                <div className="mb-6 hidden md:block">
                  <h3 className="text-2xl font-semibold">Positive Outcomes</h3>
                  <ul className="list-disc pl-8 mt-2 text-sm">
                    {camp.positiveOutcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>

                {/* Healthcare professional */}
                <div className="flex justify-center gap-6">
                  <div className="flex items-center gap-2 md:text-2xl">
                    <FaClinicMedical />
                    <p>{camp.healthCareProfessional}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
