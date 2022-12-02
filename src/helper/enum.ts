export enum CategoryType {
  INSTITUTE = "INSTITUTE",
  EVENT = "EVENT",
  QUEST = "QUEST",
}

export type Type = {
  id: string;
  name: string;
  categoryType: CategoryType;
  description: string | null;
};

export type Dynasty = {
  id: string;
  name: string;
  avatar: string | null;
  description: string | null;
};

export enum ReffProgram {
  SUBSCRIBED = "SUBSCRIBED",
  UNSUBSCRIBED = "UNSUBSCRIBED",
}

export enum UpdateFrequency {
  WEEKLY = "WEEKLY",
  REALTIME = "REALTIME",
}

export interface BotSubscriptionPost {
  userId: string;
  fisrtName: string;
  lastName: string;
  username: string;
  dynasty: string[];
  questTypes: string[];
  eventTypes: string[];
  reffProgram: ReffProgram;
  updateFrequency: UpdateFrequency;
}
