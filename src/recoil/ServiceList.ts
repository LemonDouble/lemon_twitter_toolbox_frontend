import { atom } from "recoil";
import { ServiceShowCardProps } from "../components/ServiceShowCard";

import {ReactComponent as EraserIcon} from './img/svg/eraser.svg';
import {ReactComponent as RobotIcon} from './img/svg/robot.svg';
import {ReactComponent as MagnifyingGlass} from './img/svg/magnifyingGlass.svg';



export const AllServiceList = atom<ServiceShowCardProps[]>({
    key : 'AllServiceList',
    default : [{
        serviceName : "learn-me",
        Icon : RobotIcon,
        cardTitle : "날 공부해줘!",
        cardContent : "컴퓨터에게 내 말투를 가르쳐보세요! 내 트윗으로 컴퓨터를 학습시키면, 내 말투로 대답합니다!",
        cardURL : "/learn-me"
    }, {
        serviceName : "auto-delete-tweet",
        Icon : EraserIcon,
        cardTitle : "자동 트윗 지우개",
        cardContent : "매일 자동으로 트윗을 지워줘요! 혹시 실언을 했더라도 이제 걱정 끝!",
        cardURL : "/auto-delete-tweet"
    }, {
        serviceName : "follower-tracker",
        Icon : MagnifyingGlass,
        cardTitle : "팔로워 추적기",
        cardContent : "주기적으로 누가 팔로우했는지, 누가 언팔로우했는지 알려줘요! 계폭한 사람이 누군지 이제 고민할 필요 없어요!",
        cardURL : "/follower-tracker"
    },]
})