import React from "react";
import { Meta, Story } from "@storybook/react";
import LoadingComponent, { LoadingComponentProps } from "./LoadingComponent";

export default {
  component: LoadingComponent,
  title: "LoadingComponent",
};

const Template: Story<LoadingComponentProps> = (args) => <LoadingComponent {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    loadingMessage:"Loading.."
};
