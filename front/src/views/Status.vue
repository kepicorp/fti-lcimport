<template>
    <v-container>
        <v-text-field class="mr-4" v-model="id" label="Letter of Credit ID">
        </v-text-field>
        <v-btn class="mr-4" @click="fetchStatus()">Fetch Status</v-btn>
        <v-text-field class="mr-4" v-if="reference" v-model="reference" label="Reference" />
        <v-text-field class="mr-4" v-if="eventStatus" v-model="eventStatus" label="Event Status" />
        <v-text-field class="mr-4" v-if="masterStatus" v-model="masterStatus" label="Overall Status" />
        
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    name: "Status",
    data: () => ({
        id: "",
        masterStatus: "",
        eventStatus: "",
        reference: "",
        token: ""
    }),
    async created() {
        this.token = await axios.get('/token');
        this.id = this.$route.query.id;
    },
    methods: {
        async fetchStatus() {
            var data = {
                id: this.id,
                token: this.token.data.token
            }
            var result = await axios.post('/status', data);
            console.log(result);
            this.reference = result.data.owningTransactionBankReference;
            this.masterStatus = result.data.masterStatus;
            this.eventStatus = result.data.eventStatus;
        }
    }

}
</script>