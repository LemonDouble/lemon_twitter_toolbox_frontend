import React from "react";
import { Meta, Story } from "@storybook/react";
import ProductionShowCard, { ProductionShowCardProps } from "./ProductionShowCard";

export default {
  component: ProductionShowCard,
  title: "ProductionShowCard",
};

const Template: Story<ProductionShowCardProps> = (args) => <ProductionShowCard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  cardLogoImgPath : "/img/robot.svg",
  cardTitle : "도플갱어 만들기",
  cardContent : "자신의 트윗을 바탕으로 도플갱어를 만들어 보세요!",
  cardURL : "/login"
};
