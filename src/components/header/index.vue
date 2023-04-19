<template>
    <header>
        <div class="logo">
            <div class="logo-image"></div>
            <div class="logo-name">Mock</div>
        </div>
        <div class="login-item">
            <div class="login-item-image"></div>
            <a v-if="!loginStatus" class="login-item-name" @click="login">Log in</a>
            <a-dropdown v-else>
                <a @click.prevent>
                    {{ username }}
                    <DownOutlined />
                </a>
                <template #overlay>
                    <a-menu>
                        <a-menu-item>
                            <a @click="logOut">Log out</a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </header>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import './index.scss';
import router from '@/router';
import Cookies from 'js-cookie';
import { useUserStore } from '@/store/modules/user';
const username = ref(Cookies.get("username"));
const loginStatus = ref(false);
const store = useUserStore();

const logOut = () => {
    Cookies.remove("username");
    Cookies.remove("access_token");
    loginStatus.value = false;
    if(router.currentRoute.value.path === '/interview') router.push({name: "home"});
}
const login = () => {
    router.push({name: 'login'})
}

onMounted(() => {
    console.log(Cookies.get("username"));

    loginStatus.value = Cookies.get("username") === "" || Cookies.get("username") === undefined ? false : true;
    console.log(loginStatus.value);
})
</script>