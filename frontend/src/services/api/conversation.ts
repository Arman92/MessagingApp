import axios from 'axios';

import config from '@messaging/config/app';
import { ConversationListReqResponse, StartConversationReqParams, StartConversationReqResponse } from './types';

const getConversationList = () => {
  return axios.get<ConversationListReqResponse>(`${config.apiServer}/conversation/list`).then(r => r.data);
};

const startConversation = (params: StartConversationReqParams) => {
  return axios.post<StartConversationReqResponse>(`${config.apiServer}/conversation`, params).then(r => r.data);
};

export const ConversationService = {
  getConversationList,
  startConversation,
};
