import React from "react";
import { Meta, Story } from "@storybook/react";
import ResponsiveIntroduceImageContainer, { ResponsiveIntroduceImageContainerProps } from "./ResponsiveIntroduceImageContainer";

export default {
  component: ResponsiveIntroduceImageContainer,
  title: "ResponsiveIntroduceImageContainer",
};

const Template: Story<ResponsiveIntroduceImageContainerProps> = (args) => <ResponsiveIntroduceImageContainer {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    imageURL: "/img/learn-me.png"
};
