import { commonSetting } from "@/settings";

export function getUrl(fileId: string) {
    return commonSetting.baseResourceHost + `/files/${fileId}`;
}
