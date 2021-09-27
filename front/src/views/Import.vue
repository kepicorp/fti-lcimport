<template>
<v-container>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="pa-6"
    >
      <v-text-field
        v-model="lc.senderReference"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="lc.narrative.goodsDescription"
        label="Goods Description"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="lc.amount.amount"
        :rules="[v => !!v || 'Amount is required!']"
        label="Amount"
        required
      ></v-text-field>

      <v-select
       v-model="lc.amount.currency"
       :items="currencies"
       :rules="[v => !!v || 'Currency is required!']"
       label="Currency"
       required>
      </v-select>
  
      <v-checkbox
        v-model="lc.chargeDetail.deferCharges"
        :rules="[v => !!v || 'Charge has to be deferred!']"
        label="Defer Charges"
        required
      ></v-checkbox>
  
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Send
      </v-btn>
  
      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
      
    </v-form>
    <v-alert
        type="success"
        v-if="result.data.id"
    >LC created with ID: {{result.data.id}} <v-btn @click="$router.push({
                            path: '/status',
                            query: { id: result.data.id
                        }})">Check Status</v-btn></v-alert>
    <v-btn class="mr-6" @click="showDetails()">Show Details</v-btn>
      <v-textarea v-if="show" class="mr-12" v-model="pretty">
        </v-textarea>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: "Import",

    data: () => ({
        token: {},
        show: false,
        result: { data: {}},
        valid: true,
        nameRules: [
            v => !!v || 'Referece is required',
            v => (v && v.length <= 10) || 'Reference must be less than 10 characters',
        ],
        currencies: [
            "USD",
            "GBP",
            "EUR"
        ],
        lc: {
        "inputBranch": "LOND",
        "behalfOfBranch": "LOND",
        "senderReference": "ACME1001",
        "narrative": {
            "goodsDescription": "Circuit boards",
            "documentsRequired": "Commercial Invoice, Bill of Lading, Packing List",
            "additionalConditions": "Additional conditions"
        },
        "adviseDirect": false,
        "advisingBank": {
            "customerId": "CHASE",
            "nameAndAddress": {
            "name": "CHASE MANHATTAN BANK (NY)",
            "addressLine1": "112 AVENUE OF THE AMERICAS",
            "addressLine2": "NEW YORK",
            "addressLine3": "NY 10006"
            },
            "country": "US",
            "swiftAddress": "CHASUS33XXX",
            "contactName": "Chase Banker",
            "email": "banker@chase.com"
        },
        "amount": {
            "amount": "123000.00",
            "currency": "USD",
            "tolerance": "OTHER",
            "minPercentAmountTolerance": "5",
            "maxPercentAmountTolerance": "10",
            "minAmountTolerance": "100.00",
            "maxAmountTolerance": "1000.00"
        },
        "applicableRule": {
            "id": "UCP-LATEST-VERSION"
        },
        "applicant": {
            "customerId": "ABC",
            "nameAndAddress": {
            "name": "ABC INDUSTRIES LTD.",
            "addressLine1": "SLOUGH ESTATES",
            "addressLine2": "BATH ROAD",
            "addressLine3": "SLOUGH"
            },
            "country": "GB",
            "reference": "ABCJS001",
            "contactName": "John Smith",
            "email": "john@abc.com"
        },
        "applicationDate": "2020-01-24",
        "beneficiary": {
            "nameAndAddress": {
            "name": "ACME Exporters",
            "addressLine1": "575 44th Avenue",
            "addressLine2": "New York",
            "addressLine3": "NY 11101"
            },
            "country": "US",
            "contactName": "Peter Jones",
            "email": "peter@acme.com"
        },
        "beneficiaryAccountNumber": "string",
        "chargeDetail": {
            "issuanceChargesPayableBy": "APPLICANT",
            "taxPayableBy": "CHARGE-PAYER",
            "overseasChargesPayableBy": "BENEFICIARY",
            "deferCharges": true
        },
        "confirmationDetail": {
            "instruction": "UNCONFIRMED"
        },
        "domesticExpiry": false,
        "expiryDate": "2020-07-24",
        "expiryPlace": "New York",
        "issueBy": "SWIFT",
        "issueDate": "2020-01-24",
        "active": true,
        "paymentDetail": {
            "creditAvailableBy": "ACCEPTANCE",
            "tenor": {
            "maturityDate": "2020-06-24",
            "period": "3D",
            "fromAfter": "AFTER",
            "start": "AIR-WAYBILL"
            },
            "draftsDrawnOn": "OURSELVES",
            "creditAvailableWith": "ADVISING-BANK"
        },
        "revolvingDetail": {
            "revolving": false
        },
        "shipmentDetail": {
            "from": "New York",
            "to": "Slough",
            "portOfLoading": "New York",
            "portOfDischarge": "London",
            "date": "2020-06-24",
            "period": "2 weeks before expiry of LC.",
            "transhipment": "ALLOWED",
            "partialShipment": "ALLOWED",
            "incoTerms": "CFR",
            "incoPlace": "London",
            "insuranceForBuyer": false,
            "freightPayment": "COLLECT",
            "presentationDays": 10,
            "documentsToBeSentBy": "COURIER"
        },
        "standby": false,
        "transferable": false
        }
    }),
    async created() {
        console.log("Accessing token");
        this.token = await axios.get('/token');
        //console.log("Got token "+JSON.stringify(this.token));
    },

    methods: {
        async validate () {
            this.$refs.form.validate()
            var data = {
                data: this.lc,
                token: this.token.data.token
            }
            this.result = await axios.post('/import', data);
            console.log(JSON.stringify(this.result));
        },
        reset () {
        this.$refs.form.reset()
        },
        resetValidation () {
        this.$refs.form.resetValidation()
        },
        showDetails() {
            this.show = !this.show;
        }
    },
    computed: {
      pretty() {
          return JSON.stringify(this.lc, null, 2);
      }
    }
}
</script>