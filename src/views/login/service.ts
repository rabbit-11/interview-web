import { ObjectFactory } from "@/decorators/object-factory";
import serviceHandler from "@/decorators/service-handle";
import BaseService from "@/services/base-service";
import { userState } from "@/store/modules/user";
import qs from "qs";
import Cookies from "js-cookie";
export class LoginService extends BaseService {
    @serviceHandler("query", { title: "登陆", showErrorMsg: false, showTip: false })
    public login(data: { email: string; password: string }): Promise<userState> {
        const params = {
            email: data.email,
            password: data.password
        };
        return this._post("/login", qs.stringify(params), {headers: { "content-type": "application/x-www-form-urlencoded; charset=UTF-8"}});
    }
    // @serviceHandler("query", { title: "获取加密需要的公钥" })
    // public async getPublicKey(): Promise<any> {
    //     const or = await this._get<any>("/oauth/extras/public-key");
    //     Cookies.set("public-key", or.result || "none");
    //     return or;
    // }
    // @serviceHandler("query", { showErrorMsg: true, showTip: true })
    // getCurrentUser() {
    //     return this._get<any>("/unity/user/composite");
    // }
}
const loginService = ObjectFactory.get(LoginService);
export default loginService;
