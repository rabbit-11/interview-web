<template>
    <footer>
        <div class="introduce">
            <div class="title">
                <div class="title-icon"></div>
                <div class="title-name">Mock</div>
            </div>
            <p>Improve your interview skills through realistic mock interview experience, powered by cutting-edge GPT-4 with thousands of real-world interview questions.</p>
        </div>
        <div class="copyright">© 2023, All Rights Reserved</div>
        <div class="social-list">
            <a-button v-for="item in socialList" :key="item.name" class="item">
                <img :src="item.url"/>
            </a-button>
        </div>
    </footer>
</template>
<script lang="ts" setup>
import './index.scss';

const socialList = [
    {
        name: "facebook",
        url: require("@/assets/images/footer/facebook.png")
    },
    {
        name: "linkedin",
        url: require("@/assets/images/footer/linkedin.png")
    },
    {
        name: "dribbble",
        url: require("@/assets/images/footer/dribbble.png")
    },
    {
        name: "twitter",
        url: require("@/assets/images/footer/twitter.png")
    },
]

</script>