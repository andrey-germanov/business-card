export type Card = {
  nickname: string;
  name: string;
  description: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
};

export type Style = {
  backgroundColor: string;
  buttonColor: string;
  textColor: string;
};
export interface IResponseCards {
  clientId: string;
  data: Card;
  style: Style;
}
