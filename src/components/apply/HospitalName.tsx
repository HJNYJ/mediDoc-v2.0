"use client";

import { supabase } from "@/api/supabase";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import type { reservation } from "@/types/index";

const HospitalName = () => {
  const { data, isLoadong, isError } = useQuery({
    queryKey: ["reservation"],
    queryFn: async () => {
      const response = await supabase
        .from("reservation_info")
        .select("hospital_name");
      const { data } = response;
      return data;
    }
  });
  return <div>병원 이름</div>;
};

export default HospitalName;
