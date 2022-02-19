import React from "react";
import { Meta, Story } from "@storybook/react";
import ChatbotHeader, { ChatbotHeaderProps } from "./ChatbotHeader";

export default {
  component: ChatbotHeader,
  title: "ChatbotHeader",
};

const Template: Story<ChatbotHeaderProps> = (args) => <ChatbotHeader {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  avatarImageURL: "https://via.placeholder.com/400",
  userName: "레몬즙"
};
