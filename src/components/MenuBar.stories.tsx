import React from "react";
import { Meta, Story } from "@storybook/react";
import MenuBar, { MenuBarProps } from "./MenuBar";

export default {
  component: MenuBar,
  title: "MenuBar",
};

const Template: Story<MenuBarProps> = (args) => <MenuBar {...args} />;

export const Basic = Template.bind({});
Basic.args = {
};
