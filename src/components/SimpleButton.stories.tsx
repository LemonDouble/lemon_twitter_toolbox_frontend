import React from "react";
import { Meta, Story } from "@storybook/react";
import SimpleButton, { SimpleButtonProps } from "./SimpleButton";

export default {
  component: SimpleButton,
  title: "simpleButton",
};

const Template: Story<SimpleButtonProps> = (args) => <SimpleButton {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  onClick: () => {},
  ButtonText: "안녕",
};
