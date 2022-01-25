import React from "react";
import { Meta, Story } from "@storybook/react";
import MenuBarWithoutNotification, { MenuBarWithoutNotificationProps } from "./MenuBarWithoutNotification";

export default {
  component: MenuBarWithoutNotification,
  title: "MenuBarWithoutNotification",
};

const Template: Story<MenuBarWithoutNotificationProps> = (args) => <MenuBarWithoutNotification {...args} />;

export const Basic = Template.bind({});
Basic.args = {
};
