import { ObjectFactory } from "@/decorators/object-factory";
import serviceHandler from "@/decorators/service-handle";
import BaseService from "@/services/base-service";
import { useExperimentStore } from "@/store/modules/experiment";
export class HeaderService extends BaseService {
    public store = useExperimentStore();
    // public scenarioId = localStorage.getItem("scenarioId");
    // public code = localStorage.getItem("scenarioCode");

    @serviceHandler("query", { title: "获取当前阵营信息", showErrorMsg: true, showTip: true })
    getInit() {
        const scenarioId = localStorage.getItem("scenarioId");
        return this._get<any>(`/unity/experiment-team/team/${scenarioId}`);
    }

    @serviceHandler("query", { title: "获取当前阵营信息", showErrorMsg: true, showTip: true })
    getEtcd() {
        return this._get<any>(`/unity/situation/etcd/list`);
    }

    @serviceHandler("query", { title: "获取当前运行仿真", showErrorMsg: true, showTip: true })
    
    getCurrentSimulation() {
        const code = localStorage.getItem("scenarioCode");
        return this._get<any>(`/unity/situation/ready/` + code);
    }

    // @serviceHandler("query", { title: "运行当前仿真", showErrorMsg: true, showTip: true })
    // getCurrentSimulation() {
    //     return this._get<any>(`/unity/situation/ready/` + this.code);
    // }
}
const headerService = ObjectFactory.get(HeaderService);
export default headerService;
