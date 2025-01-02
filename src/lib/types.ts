export interface Message {
  content: string;
  isUser: boolean;
}

export interface ImageSession {
  imageNumber: number;
  messages: Message[];
}

export interface TATSession {
  id: string;
  time_stamp: Date;
  imageSessions: ImageSession[];
}

export interface EmotionData {
  time_stamp: Date;
  joy: number;
  sadness: number;
  anger: number;
  fear: number;
}

export interface Session {
  id: string;
  user_id: string;
  image_sessions: ImageSession[];
  time_stamp: Date;
  emotions: EmotionData;
}