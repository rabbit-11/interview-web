window.commonSetting = {
    baseUrl: "http://127.0.0.1/api",
};
/**
 * 初始化屏幕分辨率
 */
var Screen = {
    designWidth: 1920, // 设计稿屏幕宽度
    designHeight: 1080, // 设计稿屏幕高度
    minHeight: 620, // laptop高度
    resize() {
        window.pageRatio = Math.round((document.documentElement.clientWidth / 19.2) * 100) / 10000;
        document.documentElement.style.fontSize = window.pageRatio * 100 + "px";
    }
};
Screen.resize();
addEventListener("resize", Screen.resize);
