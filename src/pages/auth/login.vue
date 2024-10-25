<script setup lang="ts">
import { ref } from "vue";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { AlertCircle } from "lucide-vue-next";

const router = useRouter();
const { errors, handleSubmit, defineField, isSubmitting } = useForm({
    validationSchema: yup.object({
        username: yup.string().required(),
        password: yup.string().min(6).required(),
    }),
});

const message = ref('');

// Creates a submission handler
// It validate all fields and doesn't call your function unless all fields are valid
const onSubmit = handleSubmit(async values => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        values,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${import.meta.env.VITE_BASIC_TOKEN}`,
                'Accept': '*/*',
            }
        }
    );
    
    if (response.data.statusCode != 200) {
        message.value = response.data.message;
    } else {
        message.value = ''
        localStorage.setItem('jwt_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.payload));
        router.push('/users');
    };
});

const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');

</script>

<template>
    <div class="w-full lg:grid  lg:grid-cols-2 min-h-full">
        <div class="flex items-center justify-center py-12">
            <div class="mx-auto grid w-[350px] gap-6">
                <div class="grid gap-2 text-center">
                    <h1 class="text-3xl font-bold">
                        Login
                    </h1>
                    <p class="text-balance text-muted-foreground">
                        Enter your username below to login to your account
                    </p>
                </div>
                <form class="grid gap-4" @submit.prevent="onSubmit">
                    <div class="grid gap-2">
                        <Label for="username">username</Label>
                        <Input id="username" type="text" placeholder="m@example.com" v-model="username" v-bind="usernameAttrs"
                            required />
                        <div class="text-red-500">{{ errors.username }}</div>
                    </div>
                    <div class="grid gap-2">
                        <div class="flex items-center">
                            <Label for="password">Password</Label>
                        </div>
                        <Input id="password" type="password" v-model="password" v-bind="passwordAttrs" required />
                        <div class="text-red-500">{{ errors.password }}</div>
                    </div>

                    <Alert variant="destructive" v-if="message != ''">
                        <AlertCircle class="w-4 h-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {{ message }}
                        </AlertDescription>
                    </Alert>
                    <Button type="submit" class="w-full" :disabled="isSubmitting">
                        {{ isSubmitting ? 'Loading...' : 'Login' }}
                    </Button>
                </form>
            </div>
        </div>
        <div class="hidden bg-muted lg:block">
            <img alt="Image" width="1920" height="1080"
                class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale">
        </div>
    </div>
</template>