<template>
    <div class="login">
        <a-card style="width: 300px">
            <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                    label="邮箱"
                    name="email"
                    :rules="[{ required: true, message: '请输入你的邮箱' }]"
                >
                <a-input v-model:value="formState.email" />
                </a-form-item>

                <a-form-item
                    label="Password"
                    name="password"
                    :rules="[{ required: true, message: '请输入你的密码!' }]"
                >
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>

                <!-- <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                </a-form-item> -->

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
    
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user';
import './index.scss';
import { reactive } from 'vue';
import service from './service';
import { message } from 'ant-design-vue';
import router from '@/router';

interface FormState {
    email: string;
    password: string;
    // remember: boolean;
}
const store = useUserStore();

const formState = reactive<FormState>({
    email: '',
    password: '',
    // remember: true,
});
const onFinish = (values: any) => {
    console.log('Success:', values);
    service.login(values).then((res: any) => {
        if (res.code == 1) {
            store.setUserInfo({
                user: formState.email,
                access_token: res.token
            })
            router.push({
                name: "interview"
            })
        } else {
            message.error(res.message);
        }
    })
};
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
</script>