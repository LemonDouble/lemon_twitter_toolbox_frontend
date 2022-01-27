import React from "react";
import { Meta, Story } from "@storybook/react";
import RecommendServiceNoticeBoard, { RecommendServiceNoticeBoardProps } from "./RecommendServiceNoticeBoard";

export default {
  component: RecommendServiceNoticeBoard,
  title: "RecommendServiceNoticeBoard",
};

const Template: Story<RecommendServiceNoticeBoardProps> = (args) => <RecommendServiceNoticeBoard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
};
