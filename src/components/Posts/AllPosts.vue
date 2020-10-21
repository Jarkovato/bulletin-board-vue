<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 class="text-center pt-5" v-if="loading">
        <v-progress-circular
          indeterminate
          color="orange"
          size="128"
          width="8"
        ></v-progress-circular>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
        <v-list flat subheader three-line>
          <h2 class="text--secondary my-3">Покупатели</h2>
          <v-list-item v-for="order in orders" :key="order.name">
            <v-list-item-action>
              <v-checkbox
                @change="markDone(order)"
                :input-value="order.done"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ order.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn :to="'/post/' + order.postId">Далее</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>
      <v-flex xs12 class="text-center pt-5" v-else>
        <h2 class="text--secondary mt-5">Пока что нет предложений</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone(order) {
      this.$store.dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true;
        })
        .catch(() => {})
    },
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }
};
</script>

<style lang="scss"></style>
