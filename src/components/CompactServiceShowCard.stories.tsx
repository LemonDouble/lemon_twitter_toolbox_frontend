import React from "react";
import { Meta, Story } from "@storybook/react";
import CompactServiceShowCard, { CompactServiceShowCardProps } from "./CompactServiceShowCard";
import {ReactComponent as RobotIcon} from '../recoil/img/svg/robot.svg';

export default {
  component: CompactServiceShowCard,
  title: "CompactServiceShowCard",
};

const Template: Story<CompactServiceShowCardProps> = (args) => <CompactServiceShowCard {...args} />;


export const Basic = Template.bind({});
Basic.args = {
        serviceName : "LearnMe",
        Icon : RobotIcon,
        cardTitle : "날 공부해줘!",
        cardURL : "/LearnMe"
};