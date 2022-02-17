import React from "react";
import { Meta, Story } from "@storybook/react";
import ChatMyMessage, { ChatMyMessageProps } from "./ChatMyMessage";

export default {
  component: ChatMyMessage,
  title: "ChatMymessage",
};

const Template: Story<ChatMyMessageProps> = (args) => <ChatMyMessage {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  Message: "매우 감동적인 메세지"
};
