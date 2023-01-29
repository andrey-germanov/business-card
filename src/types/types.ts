export type UpdatedAt = {
  seconds: number;
  nanoseconds: number;
}

export interface Data {
  name: string;
  description: string;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export type Style = {
  backgroundColor: string;
  backgroundImage: string;
  textColor: string;
  buttonColor: string;
}


export type Link = {
  id: number;
  titleLink: string;
  descriptionLink: string;
  link: string;
}
export interface ICardResponse {
  avatar: string;
  nickname: string;
  updatedAt: UpdatedAt;
  data: Data;
  clientId: string;
  createdAt: CreatedAt;
  style: Style;
  links: Link[];
}
