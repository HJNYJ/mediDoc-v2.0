export interface ConsultRequest {
  consult_id: string; // DB 등록 UUID
  consult_title: string;
  consult_content: string;
  user_email: string;
  user_name: string;
  bodypart: string;
  Field: string[];
  date: string;
}

export interface ConsultResponse {
  postId: string;
  consultTitle: string;
  consultContent: string;
  userName: string;
  bodyParts: string;
  consultPhotos: string[];
  date: string;
}

export interface HashtagButtonsProps {
  hashtags: { [key: string]: string };
}
