import React from "react";
import { Meta, Story } from "@storybook/react";
import LeftImageIntroduceCard, { LeftImageIntroduceCardProps } from "./LeftImageIntroduceCard";

export default {
  component: LeftImageIntroduceCard,
  title: "LeftImageIntroduceCard",
};

const Template: Story<LeftImageIntroduceCardProps> = (args) => <LeftImageIntroduceCard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    title:"인공지능을 이용한 챗봇 생성기!",
    content:"Learn Me!는 BERT라는 구글이 발표한 인공지능 모델을 사용해서 학습해요.",
    imageURL:"/img/introduce/googleLogo.png"
};
