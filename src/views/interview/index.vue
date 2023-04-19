<template>
    <article class="interview">
        <section class="code" :style="codeExpand ? 'width:100%' : ''">
            <div class="coder">
                <CodeMirrow v-model="codeRef" default-value="" :read-only="readOnly" />
                <a-button :class="[{'disable-btn': !sendFlag}, 'submit-btn', 'radius-btn']" @click="submitCode">Submit code</a-button>
                <!-- <a-button v-if="!codeExpand" class="expand-btn" @click="codeExpand = true">></a-button>
                <a-button v-else class="toggle-btn" @click="codeExpand = false">&lt;</a-button> -->
                <div v-show="videoFlag" class="video-box">
                    <video ref="vid"></video>
                </div>
            </div>
            <div class="toolbar">
                <div class="tool-list">
                    <a-button :class="['tool-btn', { 'selected': audioFlag }]" @click="audioFlag = !audioFlag">
                        <img :src="!audioFlag ? audiourl : audiourlSelected">
                    </a-button>
                    <a-button :class="['tool-btn', { 'selected': videoFlag }]" @click="videoFlag = !videoFlag">
                        <img :src="!videoFlag ? cameraurl : cameraurlSelected">
                    </a-button>
                    <a-button :class="['tool-btn', { 'selected': soundFlag }]" @click="soundFlag = !soundFlag">
                        <img :src="!soundFlag ? soundurl : soundurlSelected">
                    </a-button>
                    <a-button :class="['tool-btn', { 'selected': commentFlag }]" @click="commentFlag = !commentFlag">
                        <img :src="!commentFlag ? commenturl : commenturlSelected">
                    </a-button>
                </div>
                <a-button class="end-btn radius-btn" @click="router.push({name: 'home'})">
                    End Call
                </a-button>
            </div>
        </section>
        <div class="resize"></div>
        <section class="communicate">
            <div class="message-box">
                <div v-for="item, index in messageList" :key="index"
                    :class="['message-item', { 'left': item.target === 'GPT' }, { 'right': item.target === 'user' }]">
                    <div class="time">{{ item.target === 'GPT' ? item.name : '' }} {{ item.time }}</div>
                    <div class="content">
                        <div class="avatar"></div>
                        <div class="message">
                            {{ item.message }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="send-box">
                <a-textarea v-model:value="sendValue" placeholder="" @pressEnter="send" />
                <a-button :class="[{'disable-btn': !sendFlag}, 'send-btn', 'radius-btn']" @click="send">
                    send
                </a-button>
            </div>
        </section>
    </article>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import './index.scss';
import service from './service';
import router from '@/router';
import Cookies from 'js-cookie';
import CodeMirrow from '@/components/codeMirror/index.vue';
import { getTime } from '@/common/utils/tools';
// import * as CodeMirror from 'codemirror';
type Message = {
    target: string,
    message: string,
    time: string,
    name: string
}

const audiourl = require("@/assets/images/interview/audio.svg");
const audiourlSelected = require("@/assets/images/interview/audio-selected.svg");
const cameraurl = require("@/assets/images/interview/camera.svg");
const cameraurlSelected = require("@/assets/images/interview/camera-selected.svg");
const soundurl = require("@/assets/images/interview/sound.svg");
const soundurlSelected = require("@/assets/images/interview/sound-selected.svg");
const commenturl = require("@/assets/images/interview/comment.svg");
const commenturlSelected = require("@/assets/images/interview/comment-selected.svg");

const sendValue = ref("");
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
// recognition.lang = 'en-GB';
recognition.lang = localStorage.getItem("language");
const codeRef = ref<string>('');
const readOnly = ref(false);
const codeExpand = ref(false);
const vid = ref();
const audioFlag = ref(false);
const videoFlag = ref(false);
const soundFlag = ref(false);
const commentFlag = ref(false);
const sendFlag = ref(true);
// let rightmoveFlag = false;
// let lastmove: number;
let mediaStreamTrack: MediaStream;

const messageList = ref<Message[]>([]);

const send = (e: any) => {
    e.preventDefault()
    if(sendFlag.value) {
        sendMessage(sendValue.value);
        sendValue.value = "";
    }
}

const dragControllerDiv = () => {
    let resize: HTMLCollectionOf<any> = document.getElementsByClassName('resize');
    let box: HTMLCollectionOf<any> = document.getElementsByClassName('interview');
    let code: HTMLCollectionOf<any> = document.getElementsByClassName('code');
    let communicate: HTMLCollectionOf<any> = document.getElementsByClassName('communicate');
    for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = function (e: any) {
            //颜色改变提醒
            let startX = e.clientX;
            resize[i].left = resize[i].offsetLeft;
            // 鼠标拖动事件
            document.onmousemove = function (e) {
                let endX = e.clientX;
                let moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
                let maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
                if (moveLen < box[i].clientWidth * 0.6) moveLen = box[i].clientWidth * 0.6; // 左边区域的最小宽度为60%
                if (moveLen > maxT - 300) {
                    moveLen = maxT; //右边区域最小宽度为300px
                }
                resize[i].style.left = moveLen + 'px'; // 设置左侧区域的宽度
                for (let j = 0; j < code.length; j++) {
                    code[j].style.width = moveLen + 'px';
                    communicate[j].style.width = (box[i].clientWidth - moveLen) + 'px';
                }
            };
            // 鼠标松开事件
            document.onmouseup = function (evt) {
                //颜色恢复
                document.onmousemove = null;
                document.onmouseup = null;
                resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
            };
            resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
            return false;
        };
    }
}

const sendMessage = (message: string) => {
    console.log(new Date().getHours());
    console.log(new Date().getMinutes());
    
    messageList.value.push({
        target: "user",
        message: message,
        time: getTime(),
        name: "Andrew"
    })
    sendFlag.value = false;
    service.postMessage(message).then((res: any) => {
        sendFlag.value = true;
        if (res.code === 1) {
            let timer = setInterval(async () => {
                let data = await service.getMessage();
                if (data.code === 1 && data.data !== "" && data.data !== null) {
                    clearInterval(timer);
                    messageList.value.push({
                        target: "GPT",
                        message: data.data,
                        time: getTime(),
                        name: "Chat GPT"
                    })
                }
            }, 1000)
        }
    })
}

recognition.onresult = function (event: any) {
    sendValue.value = sendValue.value + event.results[0][0].transcript;
}

recognition.onerror = function (event: any) {
    console.log(event);
}

const submitCode = () => {
    if(sendFlag.value) {
        sendMessage(codeRef.value.split('\n').join('\n'));
    }
}

onMounted(() => {
    console.log(Cookies.get("username"));
    dragControllerDiv();
    if (Cookies.get("username") === "" || Cookies.get("username") === undefined) {
        router.push({ name: "login" });
    }
})

const openCam = () => {
    const constraints = {
        video: true,
        audio: false
    };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            /* 使用这个stream stream */
            mediaStreamTrack = stream;
            vid.value.srcObject = stream;
            vid.value.play();
        })
        .catch(function (err) {
            console.log(err);
            /* 处理error */
        });
}

const closeCam = () => {
    console.log(mediaStreamTrack);
    mediaStreamTrack.getTracks().forEach(track => {
        track.stop();
    });
}

document.addEventListener("keydown", function (e) {
    console.log(e)
    if (e.key === "t" && e.altKey) {
        audioFlag.value = true;
    }
})

document.addEventListener("keyup", function (e) {
    if (e.key === "t") {
        audioFlag.value = false;
    }
})

watch(videoFlag, () => {
    if (videoFlag.value) openCam();
    else closeCam();
})

watch(audioFlag, () => {
    if (audioFlag.value) {
        recognition.continuous = true;
        recognition.start();
    }
    else {
        recognition.stop();
        recognition.continuous = false;
    }
})
</script>