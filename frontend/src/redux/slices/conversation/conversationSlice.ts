/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IConversation, IConversationState } from '@messaging/models';

const initialState: IConversationState = {
  activeConversation: null,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setActiveConversation(state, { payload }: PayloadAction<IConversation>) {
      state.activeConversation = payload;
    },
  },
});

export const { setActiveConversation } = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
