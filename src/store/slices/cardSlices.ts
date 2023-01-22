import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ICardResponse } from '../../types/types';

export interface ICard {
  name?: string;
  description?: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
  style: {
    backgroundColor: string;
    buttonColor: string;
    textColor: string;
  };
}

const updatedAt = {
  seconds: 0,
  nanoseconds: 0
}
const createdAt = {
  seconds: 0,
  nanoseconds: 0
}
const data = {
  linkedin: '',
  description: 'description',
  youtube: '',
  name: 'name',
  github: '',
}
const style = {
  backgroundColor: '#4e68de',
  textColor: '#fff',
  buttonColor: '#6486e3',
}
const initialState: ICardResponse = {
  nickname: '',
  updatedAt: updatedAt,
  data: data,
  clientId: '',
  createdAt: createdAt,
  style: style,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCard(state, action) {
      state.nickname = action.payload.nickname;
      state.data.name = action.payload.data.name;
      state.data.description = action.payload.data.description;
      // state.data.avatar = action.payload.avatar;
      state.data.linkedin = action.payload.data.linkedin;
      state.data.github = action.payload.data.github;
      state.data.youtube = action.payload.data.youtube;
      state.style.backgroundColor = action.payload.style.backgroundColor;
      state.style.buttonColor = action.payload.style.buttonColor;
      state.style.textColor = action.payload.style.textColor;
    },
    // removeCard(state) {
    //   state.name = action.payload.name;
    //   state.description = action.payload.description;
    //   state.avatar = action.payload.avatar;
    //   state.linkedin = action.payload.linkedin;
    //   state.github = action.payload.github;
    //   state.youtube = action.payload.youtube;
    // },
  },
});

export const { setCard } = cardSlice.actions;

export const cardSelector = (state: RootState) => state.card;

export default cardSlice.reducer;
