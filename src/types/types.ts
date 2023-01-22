export interface UpdatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface Data {
  linkedin: string;
  description: string;
  youtube: string;
  name: string;
  github: string;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface Style {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
}

export interface ICardResponse {
  nickname: string;
  updatedAt: UpdatedAt;
  data: Data;
  clientId: string;
  createdAt: CreatedAt;
  style: Style;
}
