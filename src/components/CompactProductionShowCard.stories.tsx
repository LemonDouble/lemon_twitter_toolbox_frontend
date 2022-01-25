import React from "react";
import { Meta, Story } from "@storybook/react";
import CompactProductionShowCard, { CompactProductionShowCardProps } from "./CompactProductionShowCard";


export default {
  component: CompactProductionShowCard,
  title: "CompactProductionShowCard",
};

const Template: Story<CompactProductionShowCardProps> = (args) => <CompactProductionShowCard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  cardLogoImgPath : "/img/robot.svg",
  cardTitle : "카드 제목",
  cardURL : "/login"
};
