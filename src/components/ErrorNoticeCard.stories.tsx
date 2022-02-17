import React from "react";
import { Meta, Story } from "@storybook/react";
import ErrorNoticeCard, { ErrorNoticeCardProps } from "./ErrorNoticeCard";

export default {
  component: ErrorNoticeCard,
  title: "ErrorNoticeCard",
};

const Template: Story<ErrorNoticeCardProps> = (args) => <ErrorNoticeCard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
};
