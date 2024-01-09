<script setup lang="ts">
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import * as yup from 'yup';

const isSuccessful = ref(false);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  }),
});

const [email, emailAttrs] = defineField('email');

const [password, passwordAttrs] = defineField('password');

const [name, nameAttrs] = defineField('password');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onSubmit = handleSubmit(async _ => {
  await fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())

  isSuccessful.value = true;
});
</script>

<template>
  <form @submit="onSubmit" class="form flex flex-col gap-y-6">
    <div v-if="isSuccessful" class="bg-green-100 text-green-500 rounded-xl" data-cy="login-form-success-alert">Uspesne prihlaseno</div>

    <div class="flex flex-col gap-y-2">
        <input v-model="email" v-bind="emailAttrs" type="text" placeholder="E-mail" data-cy="login-form-email-field" class="ring-1 ring-slate-200 p-2" />
        <span class="text-red-500" data-cy="login-form-email-error-message">{{ errors.email }}</span>
    </div>

    <div class="flex flex-col gap-y-2">
        <input v-model="password" v-bind="passwordAttrs" type="password" placeholder="Heslo" data-cy="login-form-password-field" class="ring-1 ring-slate-200 p-2" />
        <span class="text-red-500" data-cy="login-form-password-error-message">{{ errors.password }}</span>
    </div>

    <div class="flex flex-col gap-y-2">
        <input v-model="name" v-bind="nameAttrs" type="text" placeholder="Jméno" data-cy="login-form-name-field" class="ring-1 ring-slate-200 p-2" />
        <span class="text-red-500" data-cy="login-form-name-error-message">{{ errors.name }}</span>
    </div>

    <button type="submit" data-cy="login-form-submit-button" class="bg-blue-500 text-white p-2">Přihlásit se</button>
  </form>
</template>
