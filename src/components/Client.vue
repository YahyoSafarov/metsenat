<template>
  <section class="content">
    <div class="container">
      <div
        class=""
      >
        <div v-if="!sendActive" class="content__box">
          <h1 class="content__box-title">Homiy sifatida ariza topshirish</h1>
          <form @submit.prevent="addSponsor" class="content__box-form form">
            <div class="form__tab">
              <div
                v-for="item in activeTab"
                :key="item.id"
                class="form__tab-item"
                @click="changeTab(item)"
                :class="!item.active ? item.class : `${item.class} active`"
              >
                {{ item.title }}
              </div>
            </div>
            <div class="form__box">
              <label class="form__box-item" for="name">
                <h3>F.I.Sh. (Familiya Ism Sharifingiz)</h3>
                <input
                  id="name"
                  v-model="sponsor.full_name"
                  required
                  placeholder="Abdullayev Abdulla Abdulla o’g’li"
                  type="text"
                />
              </label>
              <label class="form__box-item" for="tel">
                <h3>Telefon raqamingiz</h3>
                <input
                  id="tel"
                  v-model="sponsor.phone"
                  required
                  placeholder="+998 00 000-00-00"
                  type="text"
                />
              </label>
              <div class="form__box-item">
                <h3>To‘lov summasi</h3>
                <div class="form__sum">
                  <div
                    v-for="(item, index) in sumBox"
                    :key="index"
                    @click="changeActive(item)"
                    :class="{ active: item.active }"
                    class="form__sum-item"
                  >
                    <p>
                      {{ addSpace(item.sum) }}
                    </p>
                    <span v-if="!item.sum == 0">Uzs</span>
                    <img :src="checked" alt="check" />
                  </div>
                  <input
                    v-if="activeOther"
                    id="sum"
                    type="number"
                    required
                    v-model="otherSum"
                    placeholder="___"
                    class="form__sum-item other"
                  />
                </div>
              </div>
              <label v-if="legalPerson" class="form__box-item" for="firm">
                <h3>Telefon raqamingiz</h3>
                <input
                  id="firm"
                  v-model="sponsor.firm"
                  required
                  placeholder="Orient group"
                  type="text"
                />
              </label>
            </div>
            <button class="form__btn">Yuborish</button>
          </form>
        </div>
        <div class="send" v-else>
          <div class="send-box">
            <div class="main-container">
              <div class="check-container">
                <div class="check-background">
                  <svg
                    viewBox="0 0 65 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 25L27.3077 44L58.5 7"
                      stroke="white"
                      stroke-width="13"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class="check-shadow"></div>
              </div>
            </div>
            <h1 class="send-title">Ma’lumotlar tekshirish uchun yuborildi.</h1>
            <h3 class="send-subtitle">
              Tez orada siz bilan operatorimiz bog’lanib, barcha ma’lumotlarni
              aniqlashtiradi.
            </h3>
          </div>
        </div>

        <!-- <div class=" -mt-96">
          <section class="">
            <div class="relative">
              <img
                class="absolute -top-5 ml-[35px]"
                src="../assets/images/“1.svg"
                alt="no image"
              />
              <h3
                class="w-[436px] font-['sfpro'] ml-[50px] font-medium text-xl text-[#28293D] !z-50 relative leading-[150%]"
              >
                In upper grades, children become individuals and form a team.
                The same at that time they should not be separated from the
                environment in which they have learned.
              </h3>
              <img
                class="absolute top-[70px] rotate-180 right-8"
                src="../assets/images/“2.svg"
                alt=""
              />
            </div>
            <div class=" flex gap-4 items-center">
              <img class="" src="../assets/images/mirziyoyev.svg" alt="" />
              <div>
                <h3 class="font-['sfpro'] font-semibold text-[17px]">
                  Shavkatjon Mirziyoyev
                </h3>
                <h5
                  class="mt-1 font-['sfpro'] font-normal text-sm text-[#86868B]"
                >
                  President of the Republic of Uzbekistan
                </h5>
              </div>
            </div>
            <div>
              <img
                class="absolute top-[40%]   ml-[45px]"
                src="../assets/images/rocket-metsenat.png"
                alt=""
              />
            </div>
          </section>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import logoImg from "../assets/images/client-logo.svg";
import checked from "../assets/icons/checked.svg";
import yesIcon from "../assets/icons/yes.svg";
// import SubAppR from "./SubAppR.vue";

export default {
  name: "ClientHeader",
  data() {
    return {
      logoImg,
      yesIcon,
      checked,
      otherInput: false,
      sendActive: false,
      sumBox: [
        {
          id: 1,
          sum: 1000000,
          active: true,
        },
        {
          id: 2,
          sum: 5000000,
          active: false,
        },
        {
          id: 3,
          sum: 7000000,
          active: false,
        },
        {
          id: 4,
          sum: 10000000,
          active: false,
        },
        {
          id: 5,
          sum: 30000000,
          active: false,
        },
        {
          id: 6,
          sum: 0,
          active: false,
        },
      ],
      activeTab: [
        {
          id: 1,
          class: "left",
          active: true,
          title: "Jismoniy shaxs",
        },
        {
          id: 2,
          class: "right",
          active: false,
          title: "Yuridik shaxs",
        },
      ],
      sponsor: {
        full_name: "",
        phone: "",
        sum: 0,
        payment_type: [45],
        firm: "",
        spent: 0,
        comment: "",
      },
      otherSum: "",
      selectSum: "",
    };
  },
  methods: {
    addSpace(item) {
      if (item == 0) {
        return "BOSHQA";
      }
      return item.toLocaleString().replaceAll(",", " ");
    },
    changeActive(item) {
      this.sumBox.map((el) => (el.active = false));
      item.active = true;
      if (item.sum === 0) {
        this.sponsor.sum = this.otherSum;
      } else {
        this.sponsor.sum = item.sum;
      }
    },
    changeTab(item) {
      this.activeTab.map((el) => (el.active = false));
      item.active = true;
    },
    addSponsor() {
      this.sponsor.sum = String(this.sponsor.sum);
      if (this.sponsor.sum == 0) {
        this.sponsor.sum = String(this.otherSum);
      }
      this.$store.dispatch("createSponsor", this.sponsor);

      this.sponsor = {
        full_name: "",
        phone: "",
        sum: 0,
        payment_type: [45],
        firm: "",
        spent: 0,
        comment: "",
      };
      this.sumBox = this.sumBox.map((el) => {
        el.active = false;
        return el;
      });
      this.sumBox[0].active = true;
      this.sendActive = true;
    },
  },
  computed: {
    activeOther() {
      let result = false;
      for (let I = 0; I < this.sumBox.length; I++) {
        const el = this.sumBox[I];
        if (el.active == true && el.sum == 0) {
          result = true;
        }
      }
      return result;
    },
    legalPerson() {
      return this.activeTab[1].active === true;
    },
  },
};
</script>

<style lang="scss">
body {
  background: #ffffff;
}
</style>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 2;
  padding: 20px 0px;
  box-shadow: 0px 25px 40px rgba(0, 0, 0, 0.03);
  background: #ffffff;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 50px;
    row-gap: 30px;

    @media (max-width: 1000px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__logo {
    cursor: pointer;
  }

  &__menu {
    display: flex;
    align-items: center;
    column-gap: 40px;
    row-gap: 20px;

    @media (max-width: 1000px) {
      width: 100%;
      justify-content: space-between;
    }

    @media (max-width: 670px) {
      flex-direction: column;
    }

    &-box {
      display: flex;
      align-items: center;
      gap: 40px;

      @media (max-width: 670px) {
        max-width: 480px;
        width: 100%;
        justify-content: space-between;
      }
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 40px;

    @media (max-width: 670px) {
      max-width: 480px;
      width: 100%;
      justify-content: space-between;
    }

    &-item {
      a {
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
        color: #28293d;
      }
    }
  }

  &__login {
    cursor: pointer;
    height: 32px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0px 12px;
    border: 2px solid black;
    height: 44px;
    border-radius: 8px;

    img {
      height: 100%;
      object-fit: contain;
    }

    h3 {
      font-weight: 700;
      font-size: 14px;
      line-height: 150%;
      color: #28293d;
    }
  }

  &__signup {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #3366ff;
    padding: 8px 32px;
    border: 2px solid #3366ff;
    border-radius: 8px;
  }
}

.content {
  .send {
    width: 100%;
    padding-top: 150px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

    &-box {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      max-width: 300px;
    }

    &-item {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 6px solid #e8f3dd;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-title {
      margin-top: 32px;
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      text-align: center;
      color: #2e384d;
    }

    &-subtitle {
      margin-top: 10px;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #b2b7c1;
    }
  }

  &__box {
    padding: 76px 0px;
    width: 100%;
    max-width: 800px;
    margin: auto;
    background: #ffffff;

    &-title {
      font-weight: 700;
      font-size: 40px;
      line-height: 140%;
      letter-spacing: 0.01em;
      color: #1d1d1f;
    }

    .form {
      margin-top: 40px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 28px;

      &__tab {
        display: flex;
        align-items: center;

        &-item {
          cursor: pointer;
          width: 50%;
          text-align: center;
          background: #ffffff;
          border: 2px solid #e0e7ff;
          padding: 14px 0px;
          font-weight: 500;
          font-size: 12px;
          line-height: 12px;
          letter-spacing: 1.125px;
          text-transform: uppercase;
          color: rgba(51, 102, 255, 0.6);

          &.active {
            background: #3366ff;
            border: 2px solid #3366ff;
            color: #ffffff;
          }

          &.left {
            border-radius: 6px 0px 0px 6px;
          }

          &.right {
            border-radius: 0px 6px 6px 0px;
          }
        }
      }

      &__box {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 28px;

        &-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        h3 {
          font-weight: 500;
          font-size: 12px;
          line-height: 14px;
          letter-spacing: 1.125px;
          text-transform: uppercase;
          color: #1d1d1f;
        }

        input:not(input[type="radio"]) {
          width: 100%;
          padding: 12px 16px;
          background: rgba(224, 231, 255, 0.2);
          border: 1px solid #e0e7ff;
          border-radius: 6px;

          &::placeholder {
            color: rgba(46, 56, 77, 0.35);
          }
        }
      }

      &__sum {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;

        @media (max-width: 500px) {
          grid-template-columns: repeat(2, 1fr);
        }

        &-item {
          cursor: pointer;
          background: #ffffff;
          border: 1px solid #e0e7ff;
          border-radius: 5px;
          padding: 20px 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;

          &.other {
            cursor: text;
            grid-column-start: 1;
            grid-column-end: 4;
            background: rgba(224, 231, 255, 0.2);
            border: 1px solid #e0e7ff;
            border-radius: 6px;
            font-weight: 400;
            font-size: 15px;
            line-height: 18px;
            color: #000000;

            @media (max-width: 500px) {
              grid-column-end: 3;
            }
          }

          p {
            font-weight: 500;
            font-size: 18px;
            line-height: 21px;
            text-transform: uppercase;
            color: #2e384d;
          }

          span {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            text-transform: uppercase;
            color: #2e5bff;
          }

          img {
            display: none;
          }

          &.active {
            border: 2px solid #2e5bff;
            background: #f9faff;

            img {
              display: inline-block;
              position: absolute;
              right: 0px;
              top: 0px;
              transform: translate(50%, -50%);
            }
          }
        }
      }

      &__btn {
        width: 100%;
        padding: 14px 0px 15px;
        background: #2e5bff;
        border-radius: 6px;
        font-weight: 500;
        font-size: 15px;
        line-height: 21px;
        text-align: center;
        color: #ffffff;
        border: 2px solid #2e5bff;
        transition: 0.5s ease;

        &:hover {
          background: #fff;
          color: #2e5bff;
        }
      }
    }
  }
}

// HTML font size can define checkbox size

// Sample container

// Main CSS
.check-container {
  width: 7.25rem;
  height: 8.5rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;

  .check-background {
    width: 100%;
    height: calc(100% - 1.25rem);
    background: linear-gradient(to bottom right, #5de593, #41d67c);
    box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
    transform: scale(0.84);
    border-radius: 50%;
    animation: animateContainer 0.75s ease-out forwards 0.75s;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;

    svg {
      width: 65%;
      transform: translateY(0.25rem);
      stroke-dasharray: 80;
      stroke-dashoffset: 80;
      animation: animateCheck 0.35s forwards 1.25s ease-out;
    }
  }

  .check-shadow {
    bottom: calc(-15% - 5px);
    left: 0;
    border-radius: 50%;
    background: radial-gradient(
      closest-side,
      rgba(73, 218, 131, 1),
      transparent
    );
    animation: animateShadow 0.75s ease-out forwards 0.75s;
  }
}

@keyframes animateContainer {
  0% {
    opacity: 0;
    transform: scale(0);
    box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
  }
  25% {
    opacity: 1;
    transform: scale(0.9);
    box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
  }
  43.75% {
    transform: scale(1.15);
    box-shadow: 0px 0px 0px 43.334px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
  }
  62.5% {
    transform: scale(1);
    box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 21.667px rgba(255, 255, 255, 0.25) inset;
  }
  81.25% {
    box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
  }
  100% {
    opacity: 1;
    box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
  }
}

@keyframes animateCheck {
  from {
    stroke-dashoffset: 80;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes animateShadow {
  0% {
    opacity: 0;
    width: 100%;
    height: 15%;
  }
  25% {
    opacity: 0.25;
  }
  43.75% {
    width: 40%;
    height: 7%;
    opacity: 0.35;
  }
  100% {
    width: 85%;
    height: 15%;
    opacity: 0.25;
  }
}
</style>
