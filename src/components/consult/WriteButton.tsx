import { useRouter } from "next/navigation";
import { supabase } from "@/api/supabase";

const WriteButton = () => {
  const router = useRouter();

  const goToAskForm = async () => {
    try {
      const session = await supabase.auth.getSession();
      if (session.data.session === null) {
        router.push("/login");
      } else {
        router.push("/consult/ask");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="relative">
      <button onClick={goToAskForm} className="fixed bottom-20 right-3 mr-3">
        <div className="w-16 h-16 relative bg-orange rounded-full">
          <span className="plus_btn"></span>
          <span className="minus_btn"></span>
        </div>
      </button>
    </div>
  );
};

export default WriteButton;
