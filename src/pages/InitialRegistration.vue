<template>
    <v-card min-width="300" max-width="500" class="mx-auto pa-5" align="center">
        <v-img src="@/assets/logo_tayarpro_full_v02-removebg-preview.png" width="200"></v-img>
        <v-card-title class="text-center text-h4 font-weight-black text-capitalize ma-0 pa-0">
            Let's Get Started!
        </v-card-title>
        <v-row>
            <v-col cols="12">
                <v-form ref="form" @submit.prevent="altSubmit">
                    <v-row>
                        <v-col cols="12" align="justify" class="py-0">
                            <v-card-text class="text-subtitle-1 font-weight-medium py-2">Email</v-card-text>
                            <v-text-field v-model="newEmail" label="Enter Email" prepend-inner-icon="mdi-email"
                                type="email" :rules="[rules.required, rules.emailTest]"></v-text-field>
                        </v-col>
                        <v-col cols="12" align="justify" class="py-0">
                            <v-card-text class="text-subtitle-1 font-weight-medium py-2">Confirm Email</v-card-text>
                            <v-text-field v-model="confirmEmail" label="Re-enter Email" prepend-inner-icon="mdi-email"
                                type="email" :rules="[rules.required, rules.emailTest]"></v-text-field>
                        </v-col>
                        <v-col cols="12" align="justify" class="py-0">
                            <v-card-text class="text-subtitle-1 font-weight-medium py-2">Password</v-card-text>
                            <v-text-field v-model="newPassword" label="Enter password" prepend-inner-icon="mdi-lock"
                                :append-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showNew = !showNew"
                                :type="showNew ? 'text' : 'password'" :rules="[rules.required, rules.min]"
                                type="password"></v-text-field>
                        </v-col>
                        <v-col cols="12" align="justify" class="py-0">
                            <v-card-text class="text-subtitle-1 font-weight-medium py-2">Confirm Password</v-card-text>
                            <v-text-field v-model="confirmPassword" label="Re-enter password" prepend-inner-icon="mdi-lock"
                                :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showConfirm = !showConfirm" :type="showConfirm ? 'text' : 'password'"
                                :rules="[rules.required, rules.min]" type="password"></v-text-field>
                        </v-col>
                        <v-col cols="12" align="justify" class="px-5 py-3">
                            <v-checkbox v-model="agree" label="By submitting this form you agree to our Service Agreement and Terms and Conditions." :rules="[rules.required]"></v-checkbox>
                        </v-col>
                        <v-col cols="12" align="justify" class="py-0">
                            <v-btn class="mt-2" type="submit" color="#FF3131" block>Create Account</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            showNew: false,
            showConfirm: false,
            newEmail: '',
            confirmEmail: '',
            newPassword: '',
            confirmPassword: '',
            agree: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters required.',
                emailTest: text => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(text) || 'Please enter a valid email address.'
            },
        }
    },
    methods: {
        altSubmit() {
            try {
                if (!this.newEmail || !this.newPassword) {
                    throw "Please enter a valid email/password."
                }
                if (this.newEmail !== this.confirmEmail) {
                    throw "Emails do not match."
                };
                if (this.newPassword !== this.confirmPassword) {
                    throw "Passwords do not match."
                }
                if (!this.agree) {
                    throw "Please agree to our T&C's."
                }
            } catch (err) {
                alert(err);
            }
        }
    }
}
</script>