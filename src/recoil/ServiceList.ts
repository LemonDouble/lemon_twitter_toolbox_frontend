import { atom } from "recoil";
import { ServiceShowCardProps } from "../components/ServiceShowCard";

import {ReactComponent as EraserIcon} from './img/svg/eraser.svg';
import {ReactComponent as RobotIcon} from './img/svg/robot.svg';
import {ReactComponent as MagnifyingGlass} from './img/svg/magnifyingGlass.svg';



export const AllServiceList = atom<ServiceShowCardProps[]>({
    key : 'AllServiceList',
    default : [{
        serviceName : "LEARNME",
        Icon : RobotIcon,
        cardTitle : "Learn Me!",
        cardContent : "컴퓨터에게 내 말투를 가르쳐보세요! 내 트윗으로 컴퓨터를 학습시키면, 내 말투로 대답합니다!",
        cardURL : "/learn-me"
    }, /*{
        serviceName : "AUTOTWEETDELETER",
        Icon : EraserIcon,
        cardTitle : "자동 트윗 지우개",
        cardContent : "매일 자동으로 트윗을 지워줘요!",
        cardURL : "/auto-delete-tweet"
    }, {
        serviceName : "FOLLOWERTRACKER",
        Icon : MagnifyingGlass,
        cardTitle : "팔로워 추적기",
        cardContent : "주기적으로 누가 팔로우했는지, 누가 언팔로우했는지 알려줘요! 이제 누가 사라졌는지 기억을 더듬을 필요가 없어요!",
        cardURL : "/follower-tracker"
    },*/]
})


