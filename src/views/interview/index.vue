<template>
    <article class="interview">
        <section class="code">
            <div class="coder"></div>
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
                <a-button class="end-btn">
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
                    placeholder="Write your message...."
                    @pressEnter="send"
                />
            </div>
        </section>
    </article>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import './index.scss';
import service from './service';
import { useUserStore } from '@/store/modules/user';
import router from '@/router';
const audiourl = require("@/assets/images/interview/audio.svg");
const cameraurl = require("@/assets/images/interview/camera.svg");
const soundurl = require("@/assets/images/interview/sound.svg");
const commenturl = require("@/assets/images/interview/comment.svg");

type Message = {
    target: string,
    message: string,
    time: string,
    name: string
}

const store = useUserStore();
const sendValue = ref("");
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-GB';
        
console.log(recognition)
const messageList = ref<Message[]>([]);

const send = (e: any) => {
    e.preventDefault()
    messageList.value.push({
        target: "user",
        message: sendValue.value,
        time: "11:01 AM",
        name: "Andrew"
    })
    service.postMessage(sendValue.value).then((res: any) => {
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
    sendValue.value = "";
}

recognition.onresult = function (event: any) {
    sendValue.value = event.results[0][0].transcript;
}

onMounted(() => {
    if(store.username === "" || store.username === undefined) {
        router.push({name: "login"});
    }
    recognition.start();
    recognition.continuous = true;
    setTimeout(() => {
        recognition.stop();
        recognition.continuous = false;
    }, 5000);
})

</script>