// @flow

import React from 'react';

type Props = {
  message: string,
};
const Message: Function = ( { message, }: Props ) => <p>{message}</p>;

export default Message;
