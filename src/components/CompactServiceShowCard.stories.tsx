import React from "react";
import { Meta, Story } from "@storybook/react";
import CompactServiceShowCard, { CompactServiceShowCardProps } from "./CompactServiceShowCard";


export default {
  component: CompactServiceShowCard,
  title: "CompactServiceShowCard",
};

const Template: Story<CompactServiceShowCardProps> = (args) => <CompactServiceShowCard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    serviceName : "LearnMe",
    cardLogoImgPath : "/img/services/robot.svg",
    cardTitle : "날 공부해줘!",
    cardURL : "/LearnMe"
};
