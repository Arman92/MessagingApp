import axios from 'axios';

import config from '@messaging/config/app';
import { ConversationListReqResponse } from './types';

const getConversationList = () => {
  return axios.get<ConversationListReqResponse>(`${config.apiServer}/conversation/list`).then(r => r.data);
};

export const ConversationService = {
  getConversationList,
};
