<template>
    <header>
        <nav class="header">
            <div class="decorate"></div>
            <div class="left">
                <div class="time">
                    <span>{{ yearTimeData }}</span>
                    <span style="display: inline-block; width: 0.6rem">{{ TimeData }}</span>
                    <span>东八区</span>
                    <span class="home" @click="toHome">
                        <span class="img"></span>
                        <span>首页</span>
                    </span>
                </div>
                <div
                    v-if="page !== 'visibilityAnalysis'"
                    :class="['page', { selected: page === 'design' }]"
                    @click="toDesign"
                >
                    <span>想定编辑</span>
                </div>
                <div
                    v-if="page !== 'visibilityAnalysis'"
                    :class="['page', { selected: page === 'control' }]"
                    @click="toControl"
                >
                    <span>运行管控</span>
                </div>
            </div>
            <div class="center">{{ title }}</div>
            <div class="right">
                <div class="camp">
                    <a-select
                        ref="select"
                        v-model:value="viewType"
                        style="width: 0.81rem"
                        :disabled="team === 0 || team === 1"
                    >
                        <a-select-option v-for="item in camp" :key="item.value" :value="item.value">{{
                            item.label
                        }}</a-select-option>
                    </a-select>
                </div>
                <div class="icon"></div>
                <div v-if="page === 'design'" class="play-tool">
                    <ul>
                        <li :class="['withdraw']" @click="withdraw">
                            <div class="tool-tip-1">上一步</div>
                            <!-- <div v-if="viewType !== 2" class="tool-tip-1">上一步</div> -->
                            <!-- <div v-else class="tool-tip-1">请先选择阵营</div> -->
                        </li>
                        <li :class="['resume']" @click="resume">
                            <div class="tool-tip-2">下一步</div>
                            <!-- <div v-if="viewType !== 2" class="tool-tip-2">下一步</div> -->
                            <!-- <div v-else class="tool-tip-2">请先选择阵营</div> -->
                        </li>
                        <!-- <li @click="edit" class="edit">
                            <div class="tool-tip-3">编辑</div>
                        </li> -->
                        <li :class="['save']" @click="save">
                            <div class="tool-tip-4">保存</div>
                            <!-- <div v-if="viewType !== 2" class="tool-tip-4">保存</div> -->
                            <!-- <div v-else class="tool-tip-4">请先选择阵营</div> -->
                        </li>
                        <li :class="['deleteFeature']" @click="deleteFeature">
                            <div class="tool-tip-5">删除</div>
                            <!-- <div v-if="viewType !== 2" class="tool-tip-5">删除</div> -->
                            <!-- <div v-else class="tool-tip-5">请先选择阵营</div> -->
                        </li>
                    </ul>
                </div>
                <ul v-if="page === 'control'" class="run-box">
                    <li class="start" @click="getEtcd"></li>
                    <li
                        v-show="status === 'stop' || status === 'end'"
                        class="run"
                        :disabled="viewType !== 2 || store.order == ''"
                        @click="continues"
                    ></li>
                    <li v-show="status === 'run'|| status === 'continues'" class="stop" :disabled="viewType !== 2 || store.order == ''" @click="stop"></li>
                    <li class="slow" :disabled="viewType !== 2 || store.order == ''" @click="slow"></li>
                    <li class="accelerate" :disabled="viewType !== 2 || store.order == ''" @click="accelerate"></li>
                    <li class="end" :disabled="viewType !== 2 || store.order == ''" @click="end"></li>
                    <!-- <li class="speed-box" :disabled="viewType !== 2">
                        <!~~ <div class="speed">{{speedData}}X</div>
                        <div class="downIcon"></div> ~~>
                        <a-select v-model:value="speedDefault" style="width: 0.81rem" :disabled="viewType !== 2">
                            <a-select-option v-for="item in rate" :key="item.value" :value="item.value">{{
                                item.label
                            }}</a-select-option>
                        </a-select>
                    </li>  -->
                </ul>
                <div class="icon"></div>
                <div class="mapping-tool-box">
                    <a-dropdown trigger="click" placement="bottom">
                        <a class="ant-dropdown-link" @click.prevent
                        >测量工具
                            <DownOutlined />
                        </a>
                        <template #overlay>
                            <a-menu class="menu1">
                                <a-menu-item @click="mesure('LineString')">
                                    <span class="icon1"></span>
                                    <a href="javascript:;">测距</a>
                                </a-menu-item>
                                <a-menu-item @click="mesure('Polygon')">
                                    <span class="icon2"></span>
                                    <a href="javascript:;">测面</a>
                                </a-menu-item>
                                <a-menu-item @click="mesure('Angle')">
                                    <span class="icon3"></span>
                                    <a href="javascript:;">角度</a>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                    <a-dropdown trigger="click" placement="bottom">
                        <a class="ant-dropdown-link" @click.prevent
                        >绘制工具
                            <DownOutlined />
                        </a>
                        <template #overlay>
                            <a-menu class="menu2">
                                <div class="point-mark">
                                    <div class="point-mark-titel">
                                        <span class="icon"></span>
                                        <span class="text">点标</span>
                                    </div>
                                    <div class="point-mark-content">
                                        <a-menu-item @click="activate('Point', 'area')"
                                        ><a href="javascript:;">点</a></a-menu-item
                                        >
                                    </div>
                                </div>
                                <div class="line-mark">
                                    <div class="line-mark-titel">
                                        <span class="icon"></span>
                                        <span class="text">线标</span>
                                    </div>
                                    <div class="line-mark-content">
                                        <a-menu-item @click="activate('Polyline', 'mark')"
                                        ><a href="javascript:;">折线</a></a-menu-item>
                                        <!-- <a-menu-item @click="activate('Curve', 'mark')"
                                        ><a href="javascript:;">曲线</a></a-menu-item>
                                        <a-menu-item @click="activate('Arc', 'mark')"
                                        ><a href="javascript:;">弓形</a></a-menu-item> -->
                                        <a-menu-item @click="activate('FreeHandLine', 'mark')"
                                        ><a href="javascript:;">自由线</a></a-menu-item>
                                    </div>
                                </div>
                                <div class="face-mark">
                                    <div class="face-mark-titel">
                                        <span class="icon"></span>
                                        <span class="text">面标</span>
                                    </div>
                                    <div class="face-mark-content">
                                        <a-menu-item @click="activate('Circle', 'area')"
                                        ><a href="javascript:;">圆</a></a-menu-item
                                        >
                                        <!-- <a-menu-item @click="activate('Ellipse', 'area')"
                                        ><a href="javascript:;">椭圆</a></a-menu-item
                                        > -->
                                        <!-- <a-menu-item @click="activate('Lune', 'area')"
                                        ><a href="javascript:;">弓形</a></a-menu-item
                                        > -->
                                        <!-- <a-menu-item @click="activate('Sector', 'area')"
                                        ><a href="javascript:;">扇形</a></a-menu-item
                                        > -->
                                        <a-menu-item @click="activate('Polygon', 'area')"
                                        ><a href="javascript:;">多边形</a></a-menu-item
                                        >
                                        <a-menu-item @click="activate('RectAngle', 'area')"
                                        ><a href="javascript:;">矩形</a></a-menu-item
                                        >
                                        <!-- <a-menu-item @click="activate('ClosedCurve', 'area')"
                                        ><a href="javascript:;">闭合曲面</a></a-menu-item
                                        > -->
                                        <!-- <a-menu-item @click="activate('FreePolygon', 'area')"
                                        ><a href="javascript:;">自由面</a></a-menu-item
                                        > -->
                                    </div>
                                </div>
                            </a-menu>
                        </template>
                    </a-dropdown>
                    <a-dropdown trigger="click" placement="bottomRight">
                        <a class="ant-dropdown-link" @click.prevent
                        >军事标图
                            <DownOutlined />
                        </a>
                        <template #overlay>
                            <a-menu class="menu3">
                                <div class="face-mark">
                                    <div class="face-mark-titel">
                                        <span class="icon"></span>
                                        <span class="text">面标</span>
                                    </div>
                                    <div class="face-mark-content">
                                        <a-menu-item @click="activate('GatheringPlace', 'plot')"
                                        ><a href="javascript:;">集结地</a></a-menu-item
                                        >
                                    </div>
                                </div>
                                <div class="arrow-mark">
                                    <div class="arrow-mark-titel">
                                        <span class="icon"></span>
                                        <span class="text">箭头</span>
                                    </div>
                                    <div class="arrow-mark-content">
                                        <a-menu-item @click="activate('DoubleArrow', 'plot')"
                                        ><a href="javascript:;">钳击</a></a-menu-item
                                        >
                                        <a-menu-item @click="activate('AssaultDirection', 'plot')"
                                        ><a href="javascript:;">直箭头</a></a-menu-item
                                        >
                                        <a-menu-item @click="activate('FineArrow', 'plot')"
                                        ><a href="javascript:;">尖箭头</a></a-menu-item
                                        >
                                        <a-menu-item @click="activate('StraightArrow', 'plot')"
                                        ><a href="javascript:;">细直箭头</a></a-menu-item
                                        >
                                        <a-menu-item @click="activate('AttackArrow', 'plot')"
                                        ><a href="javascript:;">突击方向</a></a-menu-item
                                        >
                                        <a-menu-item @click="activate('TailedAttackArrow', 'plot')"
                                        ><a href="javascript:;" style="margin-left: -0.1rem"
                                        >突击方向(尾)</a
                                        ></a-menu-item
                                        >
                                        <a-menu-item @click="activate('SquadCombat', 'plot')"
                                        ><a href="javascript:;">分队行动</a></a-menu-item
                                        >
                                        <a-menu-item @click="activate('TailedSquadCombat', 'plot')"
                                        ><a href="javascript:;" style="margin-left: -0.1rem"
                                        >分队行动(尾)</a
                                        ></a-menu-item
                                        >
                                    </div>
                                </div>
                                <div class="flag-mark">
                                    <div class="flag-mark-titel">
                                        <span class="icon"></span>
                                        <span class="text">旗帜</span>
                                    </div>
                                    <div class="flag-mark-content">
                                        <a-menu-item @click="activate('RectFlag', 'plot')"
                                        ><a href="javascript:;">矩形旗</a></a-menu-item
                                        >
                                        <a-menu-item @click="activate('TriangleFlag', 'plot')"
                                        ><a href="javascript:;">三角旗</a></a-menu-item
                                        >
                                        <a-menu-item @click="activate('CurveFlag', 'plot')"
                                        ><a href="javascript:;">曲线旗</a></a-menu-item
                                        >
                                    </div>
                                </div>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
                <div class="icon"></div>
                <div ref="selectBox" class="user" @click="signOut"></div>
            </div>
        </nav>
        <div v-if="deductionStatus" class="deduction-box">
            <div class="decorate-left"></div>
            <div class="deduction-time-box">
                <div class="deduction-time-icon"></div>
                <div class="deduction-time">推演时间 : {{ runTime }}</div>
            </div>
            <div class="deduction-speed-box">
                <div class="deduction-speed-icon"></div>
                <div class="deduction-speed">仿真速度 : {{ rateNumber }}</div>
            </div>
            <div class="deduction-propulsive-box">
                <div class="deduction-propulsive-icon"></div>
                <div class="deduction-propulsive">推进进度 : {{ schedule }}</div>
            </div>
            <div class="decorate-right"></div>
        </div>
        <div id="signOutBox" class="signOut-box">
            <div id="backendManagerText" class="signOut-text" @click="switchToBackendManager"></div>
            <div id="signOutText" class="signOut-text" @click="signOutConfirmBox"></div>
        </div>
        <div v-if="signOutConfirmStatus" class="signOutConfirm-box">
            <div class="signOutConfirm-text-box">
                <div class="signOutConfirm-text">退出确认</div>
                <div class="signOutConfirm-close" @click="close"></div>
            </div>
            <div class="signOutConfirm-paragraph-box">
                <div class="signOutConfirm-paragraph-icon"></div>
                <div class="signOutConfirm-paragraph">确认退出软件？</div>
            </div>
            <div class="signOutConfirm-Confirm-box">
                <div class="cancel" @click="close">取 消</div>
                <div class="confirm" @click="confirm">确 认</div>
            </div>
        </div>
        <div v-if="zhezhaoStatus" class="zhezhao"></div>
        <div v-if="selectBoxStatus" class="selectOrder-box">
            <div class="title-box">
                <div class="title-text">请选择加入的项目</div>
            </div>
            <div class="select-box">
                <a-select v-model="selectOrderId" style="width: 242px">
                    <a-select-option v-for="item in orderList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </div>
            <div class="signOutConfirm-Confirm-box">
                <div class="cancel" @click="projectSelect('cancel')">取 消</div>
                <div class="confirm" @click="projectSelect('confirm')">确 认</div>
            </div>
        </div>
        <div v-if="joinProjectStatus" class="joinProject">
            <div class="title">仿真加入</div>
            <div class="close" @click="simulationClose('new')"></div>
            <div class="text1">仿真正在运行，点击加入。</div>
            <div class="text2">
                <div>仿真名称为：</div>
                <div>{{ simulationName }}</div>
            </div>
            <div class="text2">
                <div>仿真编号为：</div>
                <div>{{ simulationNumber }}</div>
            </div>
            <div class="join" @click="join">加入</div>
        </div>
        <div v-if="establishProjectStatus" class="establishProject">
            <div class="title">仿真加入</div>
            <div class="close" @click="simulationClose('join')"></div>
            <div class="title2">选择仿真节点</div>
            <div class="simulationNode">
                <a-checkbox-group v-model:value="simulationNodeData" style="width: 100%" class="checkbox1">
                    <a-row>
                        <a-col v-for="(item,index) in edctData" :key="index" :span="20">
                            <a-checkbox :value="item.nodeId">{{ item.hostName + "(" + item.hostIp + ")" }}</a-checkbox>
                        </a-col>
                    </a-row>
                </a-checkbox-group>
            </div>
            <div class="title3">选择融合模型节点</div>
            <div class="clear" @click="fusionModelDataClear">清除</div>
            <div class="fusionModel">
                <a-radio-group v-model:value="fusionModelData">
                    <a-radio v-for="(item,index) in edctData" :key="index" :value="item.nodeId">{{ item.hostName + "(" + item.hostIp + ")" }}</a-radio>
                </a-radio-group>
                <!-- <a-checkbox-group v-model:value="fusionModelData" style="width: 100%" @change="checkboxChange">
                    <a-row>
                        <a-col v-for="(item,index) in edctData" :key="index" :span="10">
                            <a-checkbox :value="item.nodeId">{{ item.hostName }}</a-checkbox>
                        </a-col>
                    </a-row>
                </a-checkbox-group> -->
            </div>
            <div class="title4">选择毁伤裁决节点</div>
            <div class="clear2" @click="situationModelDataClear">清除</div>
            <div class="damageModel">
                <a-radio-group v-model:value="situationModelData">
                    <a-radio v-for="(item,index) in edctData" :key="index" :value="item.nodeId">{{ item.hostName + "(" + item.hostIp + ")" }}</a-radio>
                </a-radio-group>
                <!-- <a-checkbox-group v-model:value="situationModelData" style="width: 100%" @change="checkboxChange">
                    <a-row>
                        <a-col v-for="(item,index) in edctData" :key="index" :span="10">
                            <a-checkbox :value="item.nodeId">{{ item.hostName }}</a-checkbox>
                        </a-col>
                    </a-row>
                </a-checkbox-group> -->
            </div>
            <div class="run" @click="runScenario">运行</div>
        </div>
    </header>
</template>
<script lang="ts" setup>
    import dayjs from "dayjs";
    import { commonSetting } from "@/settings";
    import { getCurrentInstance, nextTick, onMounted, onUnmounted, reactive, ref, toRaw, watch } from "vue";
    import { useRouter } from "vue-router";
    import { useExperimentStore } from "@/store/modules/experiment";
    import "./index.scss";
    import service from "./service";
    import { storeToRefs } from "pinia";
    const vm = getCurrentInstance();
    const title = commonSetting.title;
    const yearTimeData = ref<number | string>("2020年1月1日");
    const TimeData = ref<number | string>("14:00:00");
    const playbackYearTimeData = ref<number | string>("2020年1月1日");
    const playbackTimeData = ref<number | string>("14:00:00");
    const command = ref<string>("");
    const drawTool = ref<boolean>(false);
    const disabledStatus = ref<boolean>(false);
    // const signOutStatus = ref<boolean>(false);
    const signOutStatus2 = ref<boolean>(false);
    const signOutConfirmStatus = ref<boolean>(false);
    const router = useRouter();
    const store = useExperimentStore();
    const page = toRaw(router).currentRoute.value.fullPath.split("/")[1];
    const playbackStatus = ref<boolean>(false);
    const status = ref<string>("end");
    const deductionStatus = ref<boolean>(false);
    const duration = localStorage.getItem("duration");
    let playbackTime: Date;
    let playbackShowTime: Date;
    let startTime: any;
    const { viewType, team } = storeToRefs(store);
    const zhezhaoStatus = ref<boolean>(false);
    const selectBoxStatus = ref<boolean>(false);
    const orderList = reactive<any[]>([]);
    const selectOrderId = ref<string>("");
    const schedule = ref<string>("0%");
    const runTime = ref<string>("");
    let speedFlag = 2;
    let joinProjectStatus = ref<boolean>(false);
    let establishProjectStatus = ref<boolean>(false);
    let simulationNodeData = ref(['A']);
    let edctData = ref([{hostId:1,hostName:"111",nodeId:1234,hostIp:"111"}]);
    let simulationNumber: any = ref();
    let simulationName =ref();
    let fusionModelData: any = ref();
    let situationModelData : any = ref();
    const rate = [
        {
            value: "1",
            label: "-4X",
            rate: -4
        },
        {
            value: "2",
            label: "-2X",
            rate: -2
        },
        {
            value: "3",
            label: "1X",
            rate: 1
        },
        {
            value: "4",
            label: "2X",
            rate: 2
        },
        {
            value: "5",
            label: "4X",
            rate: 4
        },
        {
            value: "6",
            label: "8X",
            rate: 8
        },
        {
            value: "7",
            label: "16X",
            rate: 16
        },
        {
            value: "8",
            label: "32X",
            rate: 32
        },
        {
            value: "9",
            label: "64X",
            rate: 64
        },
        {
            value: "10",
            label: "128X",
            rate: 128
        }
    ];
    let camp = reactive([
        {
            value: 0,
            label: "红方"
        },
        {
            value: 1,
            label: "蓝方"
        },
        {
            value: 2,
            label: "导演方"
        }
    ]);
    let rateNumber = ref();
    const emit = defineEmits(["command"]);
    onMounted(() => {
        time();
        setInterval(time, 100);
        init();
        clickToCloseAndPullDown();
        PubSub.subscribe("draw", () => {
            drawTool.value = !drawTool.value;
            if (!drawTool.value) setTimeout(() => (drawTool.value = true), 100);
        });
        PubSub.subscribe("closeDrawTool", () => {
            drawTool.value = false;
        });
        PubSub.subscribe("play", (msg, data) => {
            let numArr = data.match(/\d+/g);
            playbackTime = new Date(
                Number(numArr[0]),
                Number(numArr[1]) - 1,
                Number(numArr[2]),
                Number(numArr[3]),
                Number(numArr[4]),
                Number(numArr[5])
            );
            playbackShowTime = new Date(
                Number(numArr[0]),
                Number(numArr[1]) - 1,
                Number(numArr[2]),
                Number(numArr[3]),
                Number(numArr[4]),
                Number(numArr[5])
            );
            startTime = new Date();
            playbackStatus.value = true;
        });
        PubSub.subscribe("closePlay", () => {
            playbackStatus.value = false;
        });
        PubSub.subscribe("switchStatus", (msg, data) => {
            if (data === 1) {
                disabledStatus.value = true;
            } else {
                disabledStatus.value = false;
            }
        });
        PubSub.subscribe("order", (msg, data) => {
            if (data === "") {
                status.value = "end";
                deductionStatus.value = false;
            }
        });
        PubSub.subscribe("time", (msg, data) => {
            const time = Number(data.split("@")[1]);
            const rateNum = Number(data.split("@")[2]);
            rateNumber.value = rateNum.toFixed(2);
            const i = rate.find(item => item.rate === rateNum);
            if (i) speedFlag = rate.indexOf(i);
            const h = Math.floor(time / 3600000);
            const m = Math.floor((time % 3600000) / 60000);
            const s = Math.floor((time % 60000) / 1000);
            runTime.value = str(h) + ":" + str(m) + ":" + str(s);

            const scheduleNum = Math.floor(time / Number(duration) / 600);
            schedule.value = (scheduleNum > 100 ? 100 : scheduleNum) + "%";
            localStorage.setItem("runTime",runTime.value);
        });
        PubSub.subscribe("selectOrder", (msg, data) => {
            if (data.length > 1) {
                runTime.value = "";
                schedule.value = "";
                orderList.length = 0;
                data.forEach((el: any) => {
                    let obj = {
                        label: el.name,
                        value: el.orderId
                    };
                    orderList.push(obj);
                });
                zhezhaoStatus.value = true;
                selectBoxStatus.value = true;
            } else {
                selectOrderId.value = data[0].orderId;
                deductionStatus.value = true;
            }
        });
        localStorage.setItem("viewType", String(viewType));
    });
    onUnmounted(() => {
        PubSub.unsubscribe("draw");
        PubSub.unsubscribe("play");
        PubSub.unsubscribe("closePlay");
        PubSub.unsubscribe("closeDrawTool");
        PubSub.unsubscribe("switchStatus");
        PubSub.unsubscribe("order");
        PubSub.unsubscribe("time");
        document.removeEventListener("click", eventListener);
    });
    const init = () => {
        service.getInit().then((res: any) => {
            if (res.result === null) {
                team.value = 2;
                store.team = 2;
            } else {
                team.value = Number(res.result);
                store.team = Number(res.result);
            }

            // localStorage.setItem("team",String(team));
            // 地图加载时间延时
            setTimeout(() => {
                viewType.value = team.value;
                store.viewType = team.value;
            }, 100);
        });
    };
    const projectSelect = (name: string) => {
        if (name === "cancel") {
            zhezhaoStatus.value = false;
            selectBoxStatus.value = false;
            deductionStatus.value = false;
        } else {
            zhezhaoStatus.value = false;
            selectBoxStatus.value = false;
            deductionStatus.value = true;
        }
    };
    const time = () => {
        var myDate: any = new Date();
        let time = myDate.getTime();
        yearTimeData.value = dayjs(time).format("YYYY年MM月DD日 HH:mm:ss").slice(0, 11);
        TimeData.value = dayjs(time).format("YYYY年MM月DD日 HH:mm:ss").slice(12, 20);
        if (playbackStatus.value) {
            let d = myDate - startTime;
            playbackShowTime = new Date();
            playbackShowTime.setSeconds(playbackTime.getSeconds() + (d % 60000) / 1000);
            playbackShowTime.setMinutes(playbackTime.getMinutes() + (d % 3600000) / 60000);
            playbackShowTime.setHours(playbackTime.getHours() + d / 3600000);
            time = playbackShowTime.getTime();
            playbackYearTimeData.value = dayjs(time).format("YYYY年MM月DD日 HH:mm:ss").slice(0, 11);
            playbackTimeData.value = dayjs(time).format("YYYY年MM月DD日 HH:mm:ss").slice(12, 20);
        } else {
            playbackYearTimeData.value = dayjs(time).format("YYYY年MM月DD日 HH:mm:ss").slice(0, 11);
            playbackTimeData.value = dayjs(time).format("YYYY年MM月DD日 HH:mm:ss").slice(12, 20);
        }
    };
    const str = (num: number) => {
        let str = String(num);
        if (str.length === 1) str = "0" + str;
        return str;
    };

    const simulationClose = (type: any) => {
        if(type == 'new') {
            joinProjectStatus.value = false;
        }else if(type == 'join') { 
            establishProjectStatus.value = false;
        }
    }

    const getEtcd = () => {
        service.getCurrentSimulation()
        .then((res: any) => {
            if(res.result == "new scenario") {
                service.getEtcd()
                .then((res: any) => {
                    if(res.hasError === false) {
                        edctData.value = res.result;
                        establishProjectStatus.value = true;
                    }
                })
            }else {
                selectOrderId.value = res.result;
                simulationNumber.value = res.result;
                simulationName.value = localStorage.getItem("experimentName");
                joinProjectStatus.value = true;
  
            }
        })
    }

    const join = () => {
        store.order = simulationNumber.value;
        start();
        joinProjectStatus.value = false;
    }

    const fusionModelDataClear = () => {
        fusionModelData.value = null;
    }

    const situationModelDataClear = () => {
        situationModelData.value = null;
    }

    const runScenario = () => {
        localStorage.setItem("simulationNodeData",JSON.stringify(simulationNodeData.value));  //增加历史选择接口
        localStorage.setItem("fusionModelData",fusionModelData.value); //增加历史选择接口
        localStorage.setItem("situationModelData",situationModelData.value); //增加历史选择接口
        store.order = "";
        start();
        establishProjectStatus.value = false;
    }

    const confirm = () => {
        router.push({ name: "login" });
    };
    const toHome = () => {
        localStorage.setItem("navCilck","false");
        router.push({ name: "project" });
        
    };
    const toDesign = () => {
        localStorage.setItem("navCilck","true");
        store.navCilck = "true";
        PubSub.publish("navSwitch");
        setTimeout(() => {
            router.push({ name: "design" });
        }, 100);
    };
    const toControl = () => {
        localStorage.setItem("navCilck","true");
        store.navCilck = "true";
        PubSub.publish("navSwitch");
        setTimeout(() => {
            router.push({ name: "control" });
        }, 100);
    };
    const activate = (shape: string, type: string) => {
        command.value = "active " + shape + " " + type;

        setTimeout(() => (command.value = ""), 100);
        drawTool.value = false;
    };
    const mesure = (type: string) => {
        command.value = "mesure " + type;
        setTimeout(() => (command.value = ""), 100);
    };
    // const clearCommand = () => {
    //     command.value = "";
    // }
    const withdraw = () => {
        command.value = "withdraw";
        setTimeout(() => (command.value = ""), 100);
    };
    const resume = () => {
        command.value = "resume";
        setTimeout(() => (command.value = ""), 100);
    };
    const save = () => {
        command.value = "save";
        setTimeout(() => (command.value = ""), 100);
    };
    const deleteFeature = () => {
        command.value = "delete";
        setTimeout(() => (command.value = ""), 100);
    };
    const start = () => {
        if (viewType.value === 2) {
            command.value = "start";
            status.value = "run";
            deductionStatus.value = true;
            setTimeout(() => (command.value = ""), 100);
        }
    };
    const continues = () => {
        if (viewType.value === 2 && store.order !== "") {
            command.value = "continues";
            status.value = "continues";
            deductionStatus.value = true;
            setTimeout(() => (command.value = ""), 100);
        }
    };
    // const attendBtn = () => {
    //     command.value = "attend";
    //     status.value = "run";
    //     deductionStatus.value = true;
    //     setTimeout(() => command.value = "", 100);
    // }
    const stop = () => {
        if (viewType.value === 2 && store.order !== "") {
            command.value = "stop";
            status.value = "stop";
            // deductionStatus = false;
            setTimeout(() => (command.value = ""), 100);
        }
    };
    const end = () => {
        if (viewType.value === 2 && store.order !== "") {
            command.value = "end";
            status.value = "end";
            deductionStatus.value = false;
            setTimeout(() => (command.value = ""), 100);
        }
    };
    const accelerate = () => {
        if (viewType.value === 2 && speedFlag !== 9 && store.order !== "") {
            speedFlag++;
            command.value = "accelerate";
            setTimeout(() => (command.value = ""), 100);
        }
    };
    const slow = () => {
        if (viewType.value === 2 && speedFlag !== 0 && store.order !== "") {
            speedFlag--;
            command.value = "slow";
            setTimeout(() => (command.value = ""), 100);
        }
    };
    const changeView = (type: number) => {
        viewType.value = type;
        store.viewType = type;
        command.value = "changeView " + type;
        setTimeout(() => (command.value = ""), 100);
    };
    // 点击头像弹出选项框
    const signOut = () => {
        if (signOutStatus2.value === false) {
            userOpenNodeOperation();
        } else {
            userClosureNodeOperation();
        }
        signOutStatus2.value = !signOutStatus2.value;
    };
    // 展开头像下拉框节点操作
    const userOpenNodeOperation = () => {
        const signOutBox: any = document.getElementById("signOutBox");
        signOutBox.style.height = "0.66rem";
        const signOutText: any = document.getElementById("signOutText");
        signOutText.style.height = "0.2rem";
        const backendManagerText: any = document.getElementById("backendManagerText");
        backendManagerText.style.height = "20px";
        setTimeout(() => {
            signOutText.innerText = "退出登录";
            backendManagerText.innerText = "后台管理";
        }, 100);
    };
    // 关闭头像下拉框节点操作
    const userClosureNodeOperation = () => {
        const signOutBox: any = document.getElementById("signOutBox");
        signOutBox.style.height = "0px";
        const signOutText: any = document.getElementById("signOutText");
        signOutText.style.height = "0px";
        setTimeout(() => {
            signOutText.innerText = "";
            backendManagerText.innerText = "";
        }, 100);
    };
    // 点击退出登录展示退出确认框
    const signOutConfirmBox = () => {
        userClosureNodeOperation();
        signOutConfirmStatus.value = true;
    };
    // 跳转至后台管理
    const switchToBackendManager = () => {
        const page = router.resolve({ name: "backend" })
        window.open(page.href, "_blank")
    }
    // 点击用户组件外关闭下拉
    const clickToCloseAndPullDown = () => {
        document.addEventListener("click", eventListener);
    };
    const eventListener = (e: any) => {
        // 记得在.select-box那边加上ref="selectBox"
        // const selectBox = ref(null);
        nextTick(() => {
            vm?.proxy?.$refs["selectBox"];
        });
        const selectBox: any = vm?.proxy?.$refs["selectBox"];
        // 重点来了：selectBox里是否包含点击的元素，不包含点击的元素就隐藏面板
        if (!selectBox.contains(e.target)) {
            userClosureNodeOperation();
        }
    };
    const close = () => {
        signOutConfirmStatus.value = false;
    };

    watch(command, () => {
        emit("command", command.value);
    });
    watch(viewType, () => {
        store.viewType = viewType.value;
        changeView(viewType.value);
        localStorage.setItem("viewType",String(viewType.value));
        PubSub.publish("viewType");
    });
    // watch(fusionModelData,() => {
    //     if(fusionModelData.value !== null) {
    //         damageModelData.value = null
    //     }
    // })
    // watch(damageModelData,() => {
    //     if(damageModelData.value !== null) {
    //         fusionModelData.value = null
    //     }
    // })
</script>
