<template>
    <article class="selectpop">
        <a-card style="width: 400px">
            <a-form
                :model="formState"
                layout="vertical"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 24 }"
                autocomplete="off"
                @finish="onFinish"
            >
                <a-form-item
                    label="language"
                    name="language"
                >
                    <a-select
                        v-model:value="formState.language"
                    >
                        <a-select-option value="zh-CN">中文</a-select-option>
                        <a-select-option value="en-GB">English</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item
                    label="programming"
                    name="programming"
                >
                    <a-select
                        v-model:value="formState.programming"
                    >
                        <a-select-option value="text/x-csrc">c</a-select-option>
                        <a-select-option value="text/x-c++src">c++</a-select-option>
                        <a-select-option value="text/x-csharp">c#</a-select-option>
                        <a-select-option value="text/x-java">java</a-select-option>
                        <a-select-option value="text/x-python">python</a-select-option>
                        <a-select-option value="text/javascript">javascript</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item
                    label="company"
                    name="company"
                >
                    <a-select
                        v-model:value="formState.company"
                    >
                        <a-select-option value="company1">company1</a-select-option>
                        <a-select-option value="company2">company2</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item
                    label="station"
                    name="station"
                >
                    <a-select
                        v-model:value="formState.station"
                    >
                        <a-select-option value="station1">station1</a-select-option>
                        <a-select-option value="station2">station2</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item
                    label="level"
                    name="level"
                >
                    <a-select
                        v-model:value="formState.level"
                    >
                        <a-select-option value="level1">level1</a-select-option>
                        <a-select-option value="level2">level2</a-select-option>
                    </a-select>
                </a-form-item>

                <!-- <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                </a-form-item> -->

                <a-form-item :wrapper-col="{ span: 24 }">
                    <a-button class="radius-btn" type="primary" html-type="submit">start</a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </article>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import './index.scss';
import router from '@/router';
import { useUserStore } from '@/store/modules/user';
import Cookies from 'js-cookie';
const store = useUserStore();
interface FormState {
    language: string;
    programming: string;
    company: string;
    station: string;
    level: string;
}

const formState = reactive<FormState>({
    language: 'zh-CN',
    programming: 'c',
    company: 'company1',
    station: 'station1',
    level: 'level1'
});

const onFinish = (values: any) => {
    console.log('Success:', values);
    localStorage.setItem('language', formState.language);
    localStorage.setItem('programming', formState.programming);
    localStorage.setItem('company', formState.company);
    localStorage.setItem('station', formState.station);
    localStorage.setItem('level', formState.level);
    if(Cookies.get('username')) {
        router.push({name: 'interview'});
    }
    else {
        store.enterInterview = true;
        router.push({name: 'login'});
    }
}
</script>