"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Button from "@/components/layout/Buttons";
import { useRouter } from "next/navigation";
import LandingPageOne from "../landing/LandingPageOne";
import LandingPageTwo from "../landing/LandingPageTwo";
import LandingPageThree from "../landing/LandingPageThree";
import LandingPageFour from "../landing/LandingPageFour";

const Slider = () => {
  const router = useRouter();
  return (
    <div>
      <Swiper>
        <SwiperSlide>
          <LandingPageOne />
        </SwiperSlide>
        <SwiperSlide>
          <LandingPageTwo />
        </SwiperSlide>
        <SwiperSlide>
          <LandingPageThree />
        </SwiperSlide>
        <SwiperSlide>
          <LandingPageFour />
          <div className="mb-4">
            <Button
              type="button"
              buttonType="filled"
              size="base"
              label="MediDoc 시작하기"
              onClick={() => router.push("/home")}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Slider;
