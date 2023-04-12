<template>
    <article class="interview">
        <section class="code" :style="codeExpand ? 'width:100%' : ''">
            <div class="coder">
                <CodeMirrow v-model="codeRef" default-value="" :read-only="readOnly" />
                <a-button class="submit-btn radius-btn" @click="submitCode">Submit code</a-button>
                <a-button v-if="!codeExpand" class="expand-btn" @click="codeExpand = true">></a-button>
                <a-button v-else class="toggle-btn" @click="codeExpand = false">&lt;</a-button>
                <div class="video-box">
                    <video ref="vid">

                    </video>
                </div>
            </div>
            <div class="toolbar">
                <div class="tool-list">
                    <a-button class="tool-btn">
                        <img :src="audiourl">
                    </a-button>
                    <a-button class="tool-btn">
                        <img :src="cameraurl">
                    </a-button>
                    <a-button class="tool-btn">
                        <img :src="soundurl">
                    </a-button>
                    <a-button class="tool-btn">
                        <img :src="commenturl">
                    </a-button>
                </div>
                <a-button class="end-btn radius-btn">
                    End Call
                </a-button>
            </div>
        </section>
        <section class="communicate">
            <div class="message-box">
                <div v-for="item, index in messageList" :key="index" :class="['message-item', {'left': item.target === 'GPT'}, {'right': item.target === 'user'}]">
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
                <a-textarea
                    v-model:value="sendValue"
                    placeholder=""
                    @pressEnter="send"
                />
                <a-button class="send-btn radius-btn" @click="send">
                    send
                </a-button>
            </div>
        </section>
    </article>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import './index.scss';
import service from './service';
import router from '@/router';
import Cookies from 'js-cookie';
import CodeMirrow from '@/components/codeMirror/index.vue';
// import * as CodeMirror from 'codemirror';
type Message = {
    target: string,
    message: string,
    time: string,
    name: string
}

const audiourl = require("@/assets/images/interview/audio.svg");
const cameraurl = require("@/assets/images/interview/camera.svg");
const soundurl = require("@/assets/images/interview/sound.svg");
const commenturl = require("@/assets/images/interview/comment.svg");

const sendValue = ref("");
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-GB';
const codeRef = ref<string>('');
const readOnly = ref(false);
const codeExpand = ref(false);
const vid = ref();

const messageList = ref<Message[]>([]);

const send = (e: any) => {
    e.preventDefault()
    sendMessage(sendValue.value);
    sendValue.value = "";
}

const sendMessage = (message: string) => {
    messageList.value.push({
        target: "user",
        message: message,
        time: "11:01 AM",
        name: "Andrew"
    })
    service.postMessage(message).then((res: any) => {
        if(res.code === 1) {
            let timer = setInterval(async () => {
                let data = await service.getMessage();
                if(data.code === 1 && data.data !== "" && data.data !== null) {
                    clearInterval(timer);
                    messageList.value.push({
                        target: "GPT",
                        message: data.data,
                        time: "11:01 AM",
                        name: "Chat GPT"
                    })
                }
            }, 1000)
        }
    })
}

recognition.onresult = function (event: any) {
    sendValue.value = event.results[0][0].transcript;
}

const submitCode = () => {
    console.log()
    sendMessage(codeRef.value.split('\n').join('\n'));
}

onMounted(() => {
    console.log(Cookies.get("username"));
    if(Cookies.get("username") === "" || Cookies.get("username") === undefined) {
        router.push({name: "login"});
    }
    recognition.start();
    recognition.continuous = true;
    // CodeMirror.fromTextArea(coder.value, {
    //         lineNumbers: true, // 显示行号
    //     });
    openCam();
    setTimeout(() => {
        recognition.stop();
        recognition.continuous = false;
    }, 5000);
})

const openCam = function() {
    const constraints = {
        video: true,
        audio: false
    };
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
        /* 使用这个stream stream */
        vid.value.src = stream;
        vid.value.play();
    })
    .catch(function(err) {
        console.log(err);
        /* 处理error */
    });
}

</script>