import axios from 'axios';

import config from '@messaging/config/app';
import {
  ConversationListReqResponse,
  GetConversationMessagesReqResponse,
  SendMessageReqParams,
  SendMessageReqResponse,
  StartConversationReqParams,
  StartConversationReqResponse,
} from './types';

const getConversationList = () => {
  return axios.get<ConversationListReqResponse>(`${config.apiServer}/conversation/list`).then(r => r.data);
};

const startConversation = (params: StartConversationReqParams) => {
  return axios.post<StartConversationReqResponse>(`${config.apiServer}/conversation`, params).then(r => r.data);
};

const getConversationMessages = (conversationId: string) => {
  return axios
    .get<GetConversationMessagesReqResponse>(`${config.apiServer}/conversation/${conversationId}/messages`)
    .then(r => r.data);
};

const sendMessageToConversation = (params: SendMessageReqParams) => {
  return axios
    .post<SendMessageReqResponse>(`${config.apiServer}/conversation/${params.conversationId}/message`, {
      content: params.content,
    })
    .then(r => r.data);
};

export const ConversationService = {
  getConversationList,
  startConversation,
  getConversationMessages,
  sendMessageToConversation,
};
