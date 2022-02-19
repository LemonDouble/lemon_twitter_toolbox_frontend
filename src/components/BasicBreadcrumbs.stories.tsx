import React from "react";
import { Meta, Story } from "@storybook/react";
import BasicBreadcrumbs, { BasicBreadcrumbsProps } from "./BasicBreadcrumbs";

export default {
  component: BasicBreadcrumbs,
  title: "BasicBreadcrumbs",
};

const Template: Story<BasicBreadcrumbsProps> = (args) => <BasicBreadcrumbs {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    pathData :[{title:"Home", href:"/mypage", isLink:true},{title:"Learn-me", href:"/learn-me", isLink:false}]
};
