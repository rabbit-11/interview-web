<template>
    <article class="home">
        <section class="page page1">
            <div class="bg-image"></div>
            <div class="introduce">
                <h2>Ace your interviews <span style="color: #0060FF">with AI</span></h2>
                <p>Improve your interview skills through realistic mock interview experience, powered by cutting-edge GPT-4 with thousands of real-world interview questions.</p>
                <a-button type="primary" @click="toInterview">Start your mock interview</a-button>
            </div>
            
        </section>
        <section class="page page2">
            <div class="introduce">
                <h3>Help you improve your interview skills</h3>
                <p>Our well-trained AI algorithms enable our mock interview website to turn your responses into valuable feedback and suggestions through voice interactions, helping you improve your interview skills and boost your confidence.</p>
            </div>
            <div class="bg-image"></div>
            <div class="bg-index">01</div>
        </section>
        <section class="page page3">
            <div class="introduce">
                <h3>The most authentic interview experience</h3>
                <p>With advanced AI technology and a real-world interview question database, our mock interview website provides the most realistic interview experience possible, helping you become familiar with various interview scenarios and hone your skills.</p>
            </div>
            <div class="bg-image"></div>
            <div class="bg-index">02</div>
        </section>
        <section class="page page4">
            <div class="introduce">
                <h3>Provide targeted advice & improvement plans</h3>
                <p>Through in-depth analysis and data statistics, our mock interview website can help you identify areas for improvement and provide targeted advice and improvement plans, allowing you to continuously improve your interview skills.</p>
            </div>
            <div class="bg-image"></div>
            <div class="bg-index">03</div>
        </section>
        <Footer></Footer>
        
    </article>
    <Selectpop v-if="popFlag"></Selectpop>
    
</template>
<script lang="ts" setup>
import Footer from "@/components/footer/index.vue";
import Selectpop from "./components/selectpop/index.vue";
import './index.scss';
import router from "@/router";
import { ref } from "vue";
const popFlag = ref(false);

const toInterview = () => {
    popFlag.value = true;
}
</script>