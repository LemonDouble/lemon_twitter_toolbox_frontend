import React from "react";
import { Meta, Story } from "@storybook/react";
import ChatbotBody, { ChatbotBodyProps } from "./ChatbotBody";

export default {
  component: ChatbotBody,
  title: "ChatbotBody",
};

const Template: Story<ChatbotBodyProps> = (args) => <ChatbotBody {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  chatData: [
    {
        isMyChat : false,
        isImage : false,
        Message : "안녕하세요! 저는 당신의 트윗을 학습한 인공지능 로봇입니다!!"
    },{
        isMyChat : false,
        isImage : false,
        Message : "이제부터 제가 당신의 여러 질문에 대한 답변을 할 거에요. 단, 첫 질문의 답변은 기술적인 문제로 조금 오래 걸릴 수 있어요."
    },{
        isMyChat : false,
        isImage : false,
        Message : "그러면, 아래 채팅창에 아무 질문이나 적어 주세요!"
    },],
    avatarImageURL : "https://via.placeholder.com/400"
};
