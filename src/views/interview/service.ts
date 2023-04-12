import { ObjectFactory } from "@/decorators/object-factory";
import serviceHandler from "@/decorators/service-handle";
import BaseService from "@/services/base-service";

export class StateService extends BaseService {
    @serviceHandler("query", { title: "发送消息给ChatGPT", showErrorMsg: false, showTip: false })
    postMessage(text: string) {
        return this._post<any>(`/chat`, {
            message: text
        });
    }
    @serviceHandler("query", { title: "获取ChatGPT对话内容", showErrorMsg: false, showTip: false })
    getMessage() {
        return this._get<any>(`/chat/query`);
    }
}
const stateService = ObjectFactory.get(StateService);
export default stateService;
