<template>
    <v-container class="pa-6">
        <v-alert
            v-if="error"
            color="red"
            type="error"
        >{{error}}</v-alert>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="pa-6"
        ><v-text-field class="mr-6"
            v-model="login" 
            hint="Your login" 
            label="Username"
            :rules="[v => !!v || 'Username is required!']"
            />
            <v-text-field class="md-6" type="password" v-model="password" hint="Your password" 
            :rules="[v => !!v || 'Password is required!']"
            label="Password"/>
           
           <v-btn
                :disabled="!valid"
                color="success"
                class="mr-12"
                @click="checkLogin()"
            >Go</v-btn>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        valid: false,
        login: "",
        password: "",
        error: ""
    }),
    methods: {
        checkLogin() {
            this.$refs.form.validate()
            if (this.login === "pierre" && this.password === "123456") {
                this.error = "";
                this.$router.push('import')
            } else {
                this.error = "Incorrect login / password"
            }
        }
    }

}
</script>