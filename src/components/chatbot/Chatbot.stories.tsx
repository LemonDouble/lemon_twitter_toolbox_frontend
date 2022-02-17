import React from "react";
import { Meta, Story } from "@storybook/react";
import Chatbot, { ChatbotProps } from "./Chatbot";

export default {
  component: Chatbot,
  title: "Chatbot",
};

const Template: Story<ChatbotProps> = (args) => <Chatbot {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  userData : {
    banner_image_url: "https://placeimg.com/1500/500/animals",
    profile_image_url : "https://placeimg.com/400/400/animals",
    screen_name : "@Lemon",
    screen_nickname: "김레몬",
    user_bio : "레몬 주스 먹고싶다",
    follower_count: 100,
    following_count: 200
  }
};
