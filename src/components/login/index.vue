<template>
    <div class="login-pop">
        <div class="login">
            <a-card style="width: 400px">
                <h1><span :class="status === 'logon' ? 'active' : ''" @click="status = 'login'">Sign up</span> / <span
                        :class="status === 'login' ? 'active' : ''" @click="status = 'logon'">Log on</span></h1>
                <div class="close" @click="close">X</div>
                <a-form :model="formState" layout="vertical" name="basic" :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 24 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                    <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Please input the email' }]">
                        <a-input v-model:value="formState.email" />
                    </a-form-item>
                    <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input the password!' }]">
                        <a-input-password v-model:value="formState.password" />
                    </a-form-item>
                    <a-form-item v-if="status==='logon'" label="Confirm Password" name="confirmpassword"
                        :rules="[{ required: true, message: 'Please input the password again!', trigger: 'change', validator: validatePass }]">
                        <a-input-password v-model:value="formState.confirmpassword" />
                    </a-form-item>

                    <!-- <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                    </a-form-item> -->

                    <a-form-item :wrapper-col="{ span: 24 }">
                        <a-button type="primary" html-type="submit">Submit</a-button>
                    </a-form-item>
                </a-form>
            </a-card>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user';
import './index.scss';
import { onMounted, reactive, ref } from 'vue';
import service from './service';
import { message } from 'ant-design-vue';
import router from '@/router';
import { RuleObject } from 'ant-design-vue/lib/form/interface';

const emit = defineEmits(["close"]);
interface FormState {
    email: string;
    password: string;
    confirmpassword: string;
    // remember: boolean;
}
const store = useUserStore();
const status = ref("login");

const formState = reactive<FormState>({
    email: '',
    password: '',
    confirmpassword: '',
    // remember: true,
});

const onFinish = (values: any) => {
    if(status.value === "login") {
        service.login(values).then((res: any) => {
            console.log(res)
            if (res.code === 1) {
                store.setUserInfo({
                    user: formState.email,
                    access_token: res.token
                })
                router.push({ name: "interview" });
            } else {
                message.error(res.message);
            }
        })
    }
    else {
        service.logon(values).then((res: any) => {
            console.log(res)
            if (res.code === 1) {
                status.value = "login";
            } else {
                message.error(res.message);
            }
        })
    }
};
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const close = () => {
    emit("close");
}
const validatePass = async (rule: RuleObject, value: string) => {
    console.log(value)
    if (value === '') {
        return Promise.reject('Please input the password again');
    } else if (value !== formState.password) {
        return Promise.reject("Two inputs don't match!");
    } else {
        return Promise.resolve();
    }
};
</script>