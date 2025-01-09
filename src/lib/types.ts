export interface Message {
  role: string;
  content: string;
  chatRound: number;
  imageNumber: number;
}
export interface TATSession {
  id: string;
  time_stamp: Date;
  contents: Message[];
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
  contents: Message[];
  time_stamp: Date;
  emotions: EmotionData;
}