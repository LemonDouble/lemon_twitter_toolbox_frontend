import { atom } from "recoil";
import { ServiceShowCardProps } from "../components/ServiceShowCard";



export const AllServiceList = atom<ServiceShowCardProps[]>({
    key : 'AllServiceList',
    default : [{
        serviceName : "LearnMe",
        cardLogoImgPath : "/img/services/robot.svg",
        cardTitle : "날 공부해줘!",
        cardContent : "자신의 트윗을 바탕으로 공부한 컴퓨터는 어떤 이야기를 할까요? 지금 알아보세요!",
        cardURL : "/LearnMe"
    }, {
        serviceName : "AutoDeleteTweet",
        cardLogoImgPath : "/img/services/eraser.svg",
        cardTitle : "자동 트윗 지우개",
        cardContent : "매일 자동으로 트윗을 지워줘요! 혹시 실언을 했더라도 이제 걱정 끝!",
        cardURL : "/AutoDeleteTweet"
    }, {
        serviceName : "FollowerTracker",
        cardLogoImgPath : "/img/services/magnifyingGlass.svg",
        cardTitle : "팔로워 추적기",
        cardContent : "주기적으로 누가 팔로우했는지, 누가 언팔로우했는지 알려줘요! 계폭한 사람이 누군지 이제 고민할 필요 없어요!",
        cardURL : "/FollowerTracker"
    }]
})