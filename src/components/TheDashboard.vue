<template>
  <div>
    <section class="dashboard">
      <div class="container">
        <ul class="dashboard__features">
          <li
            v-for="(item, index) in dashboardList"
            :key="index"
            class="dashboard__features-item item"
          >
            <div :class="item.class" class="item__img">
              <img :src="item.img" :alt="`ticket ${item.class}`" />
            </div>
            <div class="item__box">
              <h4 class="item__title">{{ item.title }}</h4>
              <h3 class="item__price">
                {{ item.price.toLocaleString().replaceAll("", "") }}
                <span>UZS</span>
              </h3>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <Chart />
    <!-- <div>
        <img src="../assets/images/analystic.png" class="img_dashboard" alt="no image">
    </div> -->
  </div>
</template>

<script setup>
import redTicket from "../assets/icons/red.svg";
import blueTicket from "../assets/icons/blue.svg";
import yellowTicket from "../assets/icons/yellow.svg";
import Chart from "./Chart.vue";
// import apexchart from './apexchart.vue'

import { mapActions, mapGetters } from "vuex";
</script>

<script>
export default {
  name: "TheDashboard",
  data() {
    return {
      dashboardList: [
        {
          id: 1,
          class: "blue",
          price: 0,
          title: "Jami to‘langan summa",
          img: blueTicket,
        },
        {
          id: 2,
          class: "yellow",
          price: 0,
          title: "Jami so‘ralgan summa",
          img: yellowTicket,
        },
        {
          id: 3,
          class: "red",
          price: 0,
          title: "To‘lanishi kerak summa",
          img: redTicket,
        },
      ],
    };
  },
  methods: {
    ...mapActions(["fetchDashboard"]),
  },
  computed: {
    ...mapGetters(["getDashboardList"]),
  },
  watch: {
    getDashboardList: function (data) {
      this.dashboardList[0].price = data.total_paid;
      this.dashboardList[1].price = data.total_need;
      this.dashboardList[2].price = data.total_must_pay;
    },
  },
  mounted() {
    this.fetchDashboard();
  },
};
</script>

<style lang="scss" scoped>
.img_dashboard {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 11%;
}
.dashboard {
  padding: 48px 0px;

  @media (max-width: 576px) {
    padding: 12px 0px;
  }

  &__features {
    display: flex;
    align-items: center;
    row-gap: 30px;
    column-gap: 30px;
    flex-wrap: wrap;

    @media (max-width: 992px) {
      column-gap: 10px;
      row-gap: 10px;
    }

    &-item {
      width: calc(100% / 3 - 20px);
      background: #ffffff;
      border: 1px solid rgba(46, 91, 255, 0.08);
      border-radius: 8px;
      padding: 24px;

      @media (max-width: 992px) {
        width: calc(100% / 2 - 5px);
        padding: 16px;
      }

      @media (max-width: 576px) {
        width: 100%;
        padding: 24px 40px;
      }
    }

    .item {
      display: flex;
      align-items: center;
      gap: 16px;

      @media (max-width: 576px) {
        gap: 40px;
      }

      &__img {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.blue {
          background: rgba(76, 111, 255, 0.1);
        }

        &.yellow {
          background: rgba(237, 199, 0, 0.1);
        }

        &.red {
          background: rgba(237, 114, 0, 0.1);
        }
      }

      &__box {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      &__title {
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        color: #7a7a9d;
      }

      &__price {
        font-weight: 700;
        font-size: 18px;
        line-height: 20px;
        color: #2e384d;

        span {
          color: #b2b7c1;
        }
      }
    }
  }
}
</style>

<style>
@property --num {
  syntax: "<integer>";
  inherits: true;
  initial-value: 0;
}

.item__price::before {
  counter-reset: my-counter var(--num);
  content: counter(my-counter);
  animation: count 40s ease-in-out infinite alternate;
}

@keyframes count {
  to {
    --num: 50;
  }
}
</style>
