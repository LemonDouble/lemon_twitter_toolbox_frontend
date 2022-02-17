import React from "react";
import { Meta, Story } from "@storybook/react";
import ChatbotInputSpace, { ChatbotInputSpaceProps } from "./ChatbotInputSpace";

export default {
  component: ChatbotInputSpace,
  title: "ChatbotInputSpace",
};

const Template: Story<ChatbotInputSpaceProps> = (args) => <ChatbotInputSpace {...args} />;

export const Basic = Template.bind({});
Basic.args = {
};
