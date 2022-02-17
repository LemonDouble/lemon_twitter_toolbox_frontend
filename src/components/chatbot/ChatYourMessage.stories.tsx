import React from "react";
import { Meta, Story } from "@storybook/react";
import ChatYourMessage, { ChatYourMessageProps } from "./ChatYourMessage";

export default {
  component: ChatYourMessage,
  title: "ChatYourMessage",
};

const Template: Story<ChatYourMessageProps> = (args) => <ChatYourMessage {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  avatarImageURL: "https://placeimg.com/400/400/animals",
  Message: "매우 감동적인 메세지"
};
