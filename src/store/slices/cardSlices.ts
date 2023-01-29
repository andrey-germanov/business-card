import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ICardResponse } from "../../types/types";

export interface ICard {
  name?: string;
  description?: string;
  avatar?: string;
  style: {
    backgroundColor: string;
    buttonColor: string;
    textColor: string;
  };
}

const updatedAt = {
  seconds: 0,
  nanoseconds: 0,
};
const createdAt = {
  seconds: 0,
  nanoseconds: 0,
};
const data = {
  name: "name",
  description: "description",
};
const style = {
  backgroundColor: "#4e68de",
  backgroundImage: '',
  textColor: "#fff",
  buttonColor: "#6486e3",
};
const initialState: ICardResponse = {
  avatar: "",
  nickname: "",
  updatedAt: updatedAt,
  data: data,
  clientId: "",
  createdAt: createdAt,
  style: style,
  links: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setFetchedCard(state, action) {
      state.nickname = action.payload.nickname;
      state.avatar = action.payload.avatar;
      state.data.name = action.payload.data.name;
      state.data.description = action.payload.data.description;
      state.links = action.payload.links;
      state.style.backgroundColor = action.payload.style.backgroundColor;
      state.style.backgroundImage = action.payload.style.backgroundImage;
      state.style.buttonColor = action.payload.style.buttonColor;
      state.style.textColor = action.payload.style.textColor;
    },
    setCard(state, action) {
      state.nickname = action.payload.nickname;
      state.data.name = action.payload.data.name;
      state.data.description = action.payload.data.description;
    },
    setAvatar(state, action) {
      state.avatar = action.payload.avatar;
    },
    setStyles(state, action) {
      state.style.backgroundColor = action.payload.backgroundColor;
    },
    setButtonColor(state, action) {
      state.style.buttonColor = action.payload.buttonColor;
    },
    setBackgroundImage(state, action) {
      state.style.backgroundImage = action.payload;
    },
    setTextColor(state, action){
      state.style.textColor = action.payload.textColor;
    },
    setLinks(state, action) {
      state.links = [...state.links, ...action.payload];
    },
    updateLink(state, action) {
      state.links = state.links.map((link) => {
        if (link.id === action.payload.id) return action.payload;
        return link;
      });
    },
    deleteLink(state, action) {
      state.links = state.links.filter((item) => action.payload !== item.id);
    },
  },
});

export const {
  setFetchedCard,
  setCard,
  setStyles,
  setLinks,
  setAvatar,
  updateLink,
  deleteLink,
  setBackgroundImage,
  setButtonColor,
  setTextColor
} = cardSlice.actions;

export const cardSelector = (state: RootState) => state.card;
export const linksSelector = (state: RootState) => state.card.links;

export default cardSlice.reducer;
