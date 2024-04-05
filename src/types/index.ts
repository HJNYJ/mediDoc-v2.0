export type TabState = {
  selectedTab: "default" | "image" | "review";
  selectTab: (tab: "default" | "image" | "review") => void;
};

export type TabList = Pick<TabState, "selectedTab">;

export interface ConsultRequest {
  consult_id: string; // DB 등록 UUID
  consult_title: string;
  consult_content: string;
  user_email: string;
  user_name: string;
  bodyParts: string;
  consult_photos: string[];
  hashtags: string[];
}

export interface ConsultResponse {
  postId: string;
  consultTitle: string;
  consultContent: string;
  userName: string;
  bodyParts: string;
  consult_photos: string[];
  created_at: string;
}

export interface HashtagButtonsProps {
  hashtags: { [key: string]: string };
}

export interface UploadedFileUrlProps {
  uploadedFileUrl: string[];
  setUploadedFileUrl: React.Dispatch<React.SetStateAction<string[]>>;
}
