<template>
    <v-container fill-height>
        <v-card min-width="300" max-width="500" class="mx-auto my-5 pa-5" align="center">
            <v-img src="@/assets/logo_tayarpro_full_v02-removebg-preview.png" width="200"></v-img>
            <v-card-title class="text-center text-h4 font-weight-black text-capitalize ma-0 pa-0 mb-2">
                Let's Get Started!
            </v-card-title>
            <v-row>
                <v-col cols="12">
                    <v-form @submit.prevent="submitForm">
                        <v-row>
                            <v-col cols="12" align="justify" class="py-0">
                                <v-card-text class="text-subtitle-1 font-weight-medium pt-3 pb-1">Email</v-card-text>
                                <v-text-field v-model="form.newEmail" hide-details="auto" density="compact"
                                    label="Enter Email" prepend-inner-icon="mdi-email" type="email" @paste.prevent
                                    @input="v$.newEmail.$touch()"
                                    :error-messages="errorMessages.newEmail"></v-text-field>
                            </v-col>
                            <v-col cols="12" align="justify" class="py-0">
                                <v-card-text class="text-subtitle-1 font-weight-medium pt-3 pb-1">Confirm
                                    Email</v-card-text>
                                <v-text-field v-model="form.confirmEmail" hide-details density="compact"
                                    label="Re-enter Email" prepend-inner-icon="mdi-email" type="email" @paste.prevent
                                    @input="v$.confirmEmail.$touch()"
                                    :error-messages="errorMessages.confirmEmail"></v-text-field>
                            </v-col>
                            <v-col cols="12" align="justify" class="py-0">
                                <v-card-text class="text-subtitle-1 font-weight-medium pt-3 pb-1">Password</v-card-text>
                                <v-text-field v-model="form.newPassword" hide-details="auto" density="compact"
                                    label="Enter password" prepend-inner-icon="mdi-lock"
                                    :append-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="showNew = !showNew" :type="showNew ? 'text' : 'password'"
                                    type="password" @paste.prevent @input="v$.newPassword.$touch()"
                                    :error-messages="errorMessages.newPassword"></v-text-field>
                            </v-col>
                            <v-col cols="12" align="justify" class="py-0">
                                <v-card-text class="text-subtitle-1 font-weight-medium pt-3 pb-1">Confirm
                                    Password</v-card-text>
                                <v-text-field v-model="form.confirmPassword" hide-details density="compact"
                                    label="Re-enter password" prepend-inner-icon="mdi-lock"
                                    :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="showConfirm = !showConfirm" :type="showConfirm ? 'text' : 'password'"
                                    type="password" @paste.prevent @input="v$.confirmPassword.$touch()"
                                    :error-messages="errorMessages.confirmPassword"></v-text-field>
                            </v-col>
                            <v-col cols="2" align="center" class="pl-5 pr-0 py-0">
                                <v-checkbox v-model="form.agree" hide-details @input="v$.agree.$touch()"
                                    :error-messages="errorMessages.agree"></v-checkbox>
                            </v-col>
                            <v-col cols="10" align="justify" class="pr-5 py-0">
                                <v-card-text class="text-body-2 px-0">By submitting this form, you agree to our Service
                                    Agreement
                                    and our Terms and Conditions
                                </v-card-text>
                            </v-col>
                            <v-col cols="12" align="justify" class="py-0">
                                <v-btn class="my-2" type="submit" color="#FF3131" :disabled="v$.$invalid" block>Create
                                    Account</v-btn>
                                <v-card-text class="text-center text-body-2 pt-0">Already registered? <RouterLink
                                        to="/signup">
                                        Sign In Here
                                    </RouterLink>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { ref, reactive, computed } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const form = reactive({
            newEmail: '',
            confirmEmail: '',
            newPassword: '',
            confirmPassword: '',
            agree: false
        });

        const showNew = ref(false);
        const showConfirm = ref(false);

        // Custom validators
        const sameAsNewEmail = (value) => value === form.newEmail;
        const sameAsNewPassword = (value) => value === form.newPassword;
        const sameAsTrue = (value) => value;

        const rules = {
            newEmail: { required, email },
            confirmEmail: { required, email, sameAsNewEmail },
            newPassword: { required, minLength: minLength(10) },
            confirmPassword: { required, sameAsNewPassword },
            agree: { required, sameAsTrue }
        };

        const v$ = useVuelidate(rules, form);

        const errorMessages = computed(() => ({
            newEmail: v$.value.newEmail.$errors.map(e => e.$message),
            confirmEmail: v$.value.confirmEmail.$errors.map(e => e.$message),
            newPassword: v$.value.newPassword.$errors.map(e => e.$message),
            confirmPassword: v$.value.confirmPassword.$errors.map(e => e.$message),
            agree: v$.value.agree.$errors.map(e => e.$message)
        }));

        // Refer to /vue.config.js for CORS and redirection
        const submitForm = async () => {
            const isFormCorrect = await v$.value.$validate();
            if (isFormCorrect) {
                console.log('Form submitted successfully');
                try {
                    const registerForm = {
                        "email": form.newEmail,
                        "password": form.newPassword,
                        "username": form.newEmail,
                        "first_name": "",
                        "last_name": "",
                        "gender": "",
                        "address": "",
                        "city": "",
                        "state": "",
                        "zip_code": 0
                    };
                    const response = await axios.post('/api/register', registerForm);
                    console.log('Registration successful');
                } catch (error) {
                    console.log('Registration failed:', error);
                }
            } else {
                console.log('Form has errors');
            }
        }

        return {
            form,
            v$,
            showNew,
            showConfirm,
            submitForm,
            errorMessages
        };
    },
}
</script>