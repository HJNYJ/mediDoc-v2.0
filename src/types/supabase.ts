export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      consult_answer: {
        Row: {
          answer: string;
          answer_id: string;
          consult_id: string | null;
          department: string;
          hospital_id: string | null;
          hospital_name: string | null;
          user_email: string | null;
          user_id: string | null;
        };
        Insert: {
          answer: string;
          answer_id?: string;
          consult_id?: string | null;
          department: string;
          hospital_id?: string | null;
          hospital_name?: string | null;
          user_email?: string | null;
          user_id?: string | null;
        };
        Update: {
          answer?: string;
          answer_id?: string;
          consult_id?: string | null;
          department?: string;
          hospital_id?: string | null;
          hospital_name?: string | null;
          user_email?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_consult_answer_consult_id_fkey";
            columns: ["consult_id"];
            isOneToOne: false;
            referencedRelation: "consult_info";
            referencedColumns: ["consult_id"];
          },
          {
            foreignKeyName: "public_consult_answer_hospital_id_fkey";
            columns: ["hospital_id"];
            isOneToOne: false;
            referencedRelation: "hospital_info";
            referencedColumns: ["hospital_id"];
          },
          {
            foreignKeyName: "public_consult_answer_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_info";
            referencedColumns: ["user_id"];
          }
        ];
      };
      consult_hashtag: {
        Row: {
          consult_id: string;
          hashtags: string;
          hashtags_id: string;
        };
        Insert: {
          consult_id?: string;
          hashtags?: string;
          hashtags_id?: string;
        };
        Update: {
          consult_id?: string;
          hashtags?: string;
          hashtags_id?: string;
        };
        Relationships: [];
      };
      consult_info: {
        Row: {
          bodyparts: string | null;
          consult_content: string;
          consult_id: string;
          consult_title: string;
          created_at: string;
          hashtags: string | null;
          user_email: string | null;
          user_name: string | null;
        };
        Insert: {
          bodyparts?: string | null | undefined;
          consult_content: string;
          consult_id?: string;
          consult_title: string;
          created_at?: string;
          hashtags?: string[];
          user_email?: string | null;
          user_name?: string | null;
        };
        Update: {
          bodyparts?: string | null;
          consult_content?: string;
          consult_id?: string;
          consult_title?: string;
          created_at?: string;
          hashtags?: string | null;
          user_email?: string | null;
          user_name?: string | null;
        };
        Relationships: [];
      };
      consult_photos: {
        Row: {
          consult_id: string;
          photo_id: string;
          photos: string;
        };
        Insert: {
          consult_id: string;
          photo_id?: string;
          photos: string;
        };
        Update: {
          consult_id?: string;
          photo_id?: string;
          photos?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_consult_photos_consult_id_fkey";
            columns: ["consult_id"];
            isOneToOne: false;
            referencedRelation: "consult_info";
            referencedColumns: ["consult_id"];
          }
        ];
      };
      consult_test: {
        Row: {
          body_section: string;
          id: string;
          tag1: string;
          tag10: string;
          tag2: string;
          tag3: string;
          tag4: string;
          tag5: string;
          tag6: string;
          tag7: string;
          tag8: string;
          tag9: string;
        };
        Insert: {
          body_section: string;
          id?: string;
          tag1?: string;
          tag10: string;
          tag2: string;
          tag3: string;
          tag4?: string;
          tag5?: string;
          tag6: string;
          tag7: string;
          tag8: string;
          tag9: string;
        };
        Update: {
          body_section?: string;
          id?: string;
          tag1?: string;
          tag10?: string;
          tag2?: string;
          tag3?: string;
          tag4?: string;
          tag5?: string;
          tag6?: string;
          tag7?: string;
          tag8?: string;
          tag9?: string;
        };
        Relationships: [];
      };
      course_info: {
        Row: {
          course_detail: string;
          course_id: string;
          course_name: string;
          course_price: number;
          hospital_id: string;
        };
        Insert: {
          course_detail: string;
          course_id?: string;
          course_name: string;
          course_price: number;
          hospital_id: string;
        };
        Update: {
          course_detail?: string;
          course_id?: string;
          course_name?: string;
          course_price?: number;
          hospital_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_course_info_hospital_id_fkey";
            columns: ["hospital_id"];
            isOneToOne: false;
            referencedRelation: "hospital_info";
            referencedColumns: ["hospital_id"];
          }
        ];
      };
      hospital_info: {
        Row: {
          end_time: string;
          hospital_address: string;
          hospital_contact: string;
          hospital_id: string;
          hospital_image: string;
          hospital_introduction: string;
          hospital_latitude: number;
          hospital_longitude: number;
          hospital_name: string;
          region_id: number;
          start_time: string;
        };
        Insert: {
          end_time: string;
          hospital_address: string;
          hospital_contact: string;
          hospital_id?: string;
          hospital_image: string;
          hospital_introduction: string;
          hospital_latitude: number;
          hospital_longitude: number;
          hospital_name: string;
          region_id: number;
          start_time: string;
        };
        Update: {
          end_time?: string;
          hospital_address?: string;
          hospital_contact?: string;
          hospital_id?: string;
          hospital_image?: string;
          hospital_introduction?: string;
          hospital_latitude?: number;
          hospital_longitude?: number;
          hospital_name?: string;
          region_id?: number;
          start_time?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_hospital_info_region_id_fkey";
            columns: ["region_id"];
            isOneToOne: false;
            referencedRelation: "hospital_region";
            referencedColumns: ["region_id"];
          }
        ];
      };
      hospital_region: {
        Row: {
          created_at: string;
          modified_at: string;
          region_id: number;
          region_name: string;
        };
        Insert: {
          created_at?: string;
          modified_at?: string;
          region_id: number;
          region_name: string;
        };
        Update: {
          created_at?: string;
          modified_at?: string;
          region_id?: number;
          region_name?: string;
        };
        Relationships: [];
      };
      possible_disease: {
        Row: {
          bodyparts: string;
          disease_id: string;
          disease_name: string;
          symptom1: boolean;
          symptom10: boolean;
          symptom11: boolean;
          symptom12: boolean;
          symptom2: boolean;
          symptom3: boolean;
          symptom4: boolean;
          symptom5: boolean;
          symptom6: boolean;
          symptom7: boolean;
          symptom8: boolean;
          symptom9: boolean;
        };
        Insert: {
          bodyparts: string;
          disease_id?: string;
          disease_name: string;
          symptom1?: boolean;
          symptom10?: boolean;
          symptom11?: boolean;
          symptom12?: boolean;
          symptom2?: boolean;
          symptom3?: boolean;
          symptom4?: boolean;
          symptom5?: boolean;
          symptom6?: boolean;
          symptom7?: boolean;
          symptom8?: boolean;
          symptom9?: boolean;
        };
        Update: {
          bodyparts?: string;
          disease_id?: string;
          disease_name?: string;
          symptom1?: boolean;
          symptom10?: boolean;
          symptom11?: boolean;
          symptom12?: boolean;
          symptom2?: boolean;
          symptom3?: boolean;
          symptom4?: boolean;
          symptom5?: boolean;
          symptom6?: boolean;
          symptom7?: boolean;
          symptom8?: boolean;
          symptom9?: boolean;
        };
        Relationships: [];
      };
      reservation_info: {
        Row: {
          apply_date: string;
          apply_time: string;
          course_id: string | null;
          hospital_id: string;
          hospital_name: string | null;
          program_detail: string;
          program_id: string;
          program_name: string;
          reservation_id: string;
          status: string;
          subject_birth_date: string;
          subject_name: string;
          subject_phone_number: string;
          user_email: string;
          user_name: string;
        };
        Insert: {
          apply_date: Date;
          apply_time: string;
          course_id?: string | null;
          hospital_id?: string;
          hospital_name?: string | null;
          program_detail: string;
          program_id?: string;
          program_name: string;
          reservation_id?: string;
          status?: string;
          subject_birth_date: string;
          subject_name: string;
          subject_phone_number: string;
          user_email?: string;
          user_name: string;
        };
        Update: {
          apply_date?: string;
          apply_time?: string;
          course_id?: string | null;
          hospital_id?: string;
          hospital_name?: string | null;
          program_detail?: string;
          program_id?: string;
          program_name?: string;
          reservation_id?: string;
          status?: string;
          subject_birth_date?: string;
          subject_name?: string;
          subject_phone_number?: string;
          user_email?: string;
          user_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_reservation_info_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "course_info";
            referencedColumns: ["course_id"];
          }
        ];
      };
      review_hashtags: {
        Row: {
          id: string;
          tag1: string;
          tag10: string;
          tag11: string;
          tag12: string;
          tag2: string;
          tag3: string;
          tag4: string;
          tag5: string;
          tag6: string;
          tag7: string;
          tag8: string;
          tag9: string;
        };
        Insert: {
          id?: string;
          tag1: string;
          tag10: string;
          tag11: string;
          tag12: string;
          tag2: string;
          tag3: string;
          tag4: string;
          tag5: string;
          tag6: string;
          tag7: string;
          tag8: string;
          tag9: string;
        };
        Update: {
          id?: string;
          tag1?: string;
          tag10?: string;
          tag11?: string;
          tag12?: string;
          tag2?: string;
          tag3?: string;
          tag4?: string;
          tag5?: string;
          tag6?: string;
          tag7?: string;
          tag8?: string;
          tag9?: string;
        };
        Relationships: [];
      };
      review_info: {
        Row: {
          content: string;
          created_at: string;
          hashtags: string;
          hospital_id: string | null;
          rating: number;
          review_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          hashtags?: string;
          hospital_id?: string | null;
          rating: number;
          review_id?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          hashtags?: string;
          hospital_id?: string | null;
          rating?: number;
          review_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_review_info_hospital_id_fkey";
            columns: ["hospital_id"];
            isOneToOne: false;
            referencedRelation: "hospital_info";
            referencedColumns: ["hospital_id"];
          }
        ];
      };
      review_photos: {
        Row: {
          hospital_id: string | null;
          photo_id: string;
          photos: string;
          review_id: string;
        };
        Insert: {
          hospital_id?: string | null;
          photo_id?: string;
          photos: string;
          review_id: string;
        };
        Update: {
          hospital_id?: string | null;
          photo_id?: string;
          photos?: string;
          review_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_review_photos_hospital_id_fkey";
            columns: ["hospital_id"];
            isOneToOne: false;
            referencedRelation: "hospital_info";
            referencedColumns: ["hospital_id"];
          },
          {
            foreignKeyName: "public_review_photos_review_id_fkey";
            columns: ["review_id"];
            isOneToOne: false;
            referencedRelation: "review_info";
            referencedColumns: ["review_id"];
          }
        ];
      };
      scrapped_list: {
        Row: {
          hospital_id: string;
          scrap_id: string;
          user_id: string;
        };
        Insert: {
          hospital_id?: string;
          scrap_id?: string;
          user_id: string;
        };
        Update: {
          hospital_id?: string;
          scrap_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_scrapped_list_hospital_id_fkey";
            columns: ["hospital_id"];
            isOneToOne: false;
            referencedRelation: "hospital_info";
            referencedColumns: ["hospital_id"];
          },
          {
            foreignKeyName: "public_scrapped_list_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_info";
            referencedColumns: ["user_id"];
          }
        ];
      };
      symptom_questions: {
        Row: {
          bodyparts: string;
          departments: string;
          symptom_id: string;
          symptoms: string;
          symptoms_abbr: string;
        };
        Insert: {
          bodyparts: string;
          departments: string;
          symptom_id: string;
          symptoms: string;
          symptoms_abbr: string;
        };
        Update: {
          bodyparts?: string;
          departments?: string;
          symptom_id?: string;
          symptoms?: string;
          symptoms_abbr?: string;
        };
        Relationships: [];
      };
      user_info: {
        Row: {
          provider: string;
          user_email: string;
          user_id: string;
          user_name: string;
          user_type: string;
        };
        Insert: {
          provider: string;
          user_email: string;
          user_id: string;
          user_name: string;
          user_type?: string;
        };
        Update: {
          provider?: string;
          user_email?: string;
          user_id?: string;
          user_name?: string;
          user_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_user_info_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
