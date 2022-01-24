import React from "react";
import { Meta, Story } from "@storybook/react";
import SimpleButton, { SimpleButtonProps } from "./SimpleButton";
import UserShowCard, { UserShowCardProps } from "./UserShowCard";

export default {
  component: UserShowCard,
  title: "UserShowCard",
};

const Template: Story<UserShowCardProps> = (args) => <UserShowCard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    profileImageUrlPath: "https://pbs.twimg.com/profile_images/1484725702830485506/NsDpyK73_400x400.jpg",
    UserName:"레몬둘",
    UserBio : "매일매일 조금씩 #뭔가하기",
    FollowingCount: 123,
    FollowerCount: 234
};

export const LongBio = Template.bind({});
LongBio.args = {
    profileImageUrlPath: "https://pbs.twimg.com/profile_images/1482580721466486784/q36x-Uux_400x400.jpg",
    UserName: "어어어어어어어어어엄청기이이이이이인닉네이이이이임",
    UserBio : "Vホロライブプロダクション/1期生ゲーマーズ白上フブキ/狐です🦊 ❖担当絵師:凪白みと@lemon_mito 【ツイ担当】🦊は黒上🌽はユニコン 【絵】#絵フブキ 【生放送】#フブキch #fubukich 【切り抜き】#フブ切り【ファン】#すこん部 #FBKBFF",
    FollowingCount: 876,
    FollowerCount: 1173351
};
