"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Page1 from "@/assets/landing/Page1.png";
import Page2 from "@/assets/landing/Page2.png";
import Page3 from "@/assets/landing/Page3.png";
import Page4 from "@/assets/landing/Page4.png";
import Button from "@/components/layout/Buttons";
import { useRouter } from "next/navigation";

const Slider = () => {
  const router = useRouter();
  return (
    <>
      <Swiper>
        <SwiperSlide>
          <Image src={Page1} alt="Page 1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Page2} alt="Page 2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Page3} alt="Page 3" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Page4} alt="Page 4" />
          <Button
            type="button"
            buttonType="filled"
            size="base"
            label="MediDoc 시작하기"
            onClick={() => router.push("/home")}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default Slider;
