import React from "react";
import { Meta, Story } from "@storybook/react";
import ServiceShowCard, { ServiceShowCardProps } from "./ServiceShowCard";
import {ReactComponent as RobotIcon} from '../recoil/img/svg/robot.svg';

export default {
  component: ServiceShowCard,
  title: "ServiceShowCard",
};

const Template: Story<ServiceShowCardProps> = (args) => <ServiceShowCard {...args} />;


export const Basic = Template.bind({});
Basic.args = {
        serviceName : "LearnMe",
        Icon : RobotIcon,
        cardTitle : "날 공부해줘!",
        cardContent : "컴퓨터에게 내 말투를 가르쳐보세요! 내 트윗으로 컴퓨터를 학습시키면, 내 말투로 대답합니다!",
        cardURL : "/LearnMe"
};
