import React from "react";
import { Meta, Story } from "@storybook/react";
import ServiceShowCard, { ServiceShowCardProps } from "./ServiceShowCard";

export default {
  component: ServiceShowCard,
  title: "ServiceShowCard",
};

const Template: Story<ServiceShowCardProps> = (args) => <ServiceShowCard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  serviceName : "LearnMe",
  cardLogoImgPath : "/img/services/robot.svg",
  cardTitle : "날 공부해줘!",
  cardContent : "자신의 트윗을 바탕으로 공부한 컴퓨터는 어떤 이야기를 할까요? 지금 알아보세요!",
  cardURL : "/LearnMe"
};
