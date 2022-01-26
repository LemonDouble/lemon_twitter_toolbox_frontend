import React from "react";
import { Meta, Story } from "@storybook/react";
import UsingServiceNoticeBoard, { UsingServiceNoticeBoardProps } from "./UsingServiceNoticeBoard";

export default {
  component: UsingServiceNoticeBoard,
  title: "UsingServiceNoticeBoard",
};

const Template: Story<UsingServiceNoticeBoardProps> = (args) => <UsingServiceNoticeBoard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    UsingServiceArray : []
};
