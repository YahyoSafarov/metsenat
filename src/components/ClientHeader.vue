<template>
  <div>
    <header class="header">
      <div class="container">
        <div @click="$router.push('/client')" class="header__logo">
          <img :src="logoImg" alt="logo" />
        </div>
        <div class="header__menu">
          <ul class="header__nav">
            <li class="header__nav-item">
              <a href="#" class="hover:text-blue">Asosiy</a>
            </li>
            <li class="header__nav-item">
              <a href="#">Grantlar</a>
            </li>
            <li class="header__nav-item">
              <a href="#">Soliq imtiyozlari</a>
            </li>
          </ul>
          <div class="header__menu-box">
            <div @click="$router.push('/login')" class="header__login">
              <img src="../assets/icons/login.svg" alt="log out" />
              <h3>Kirish</h3>
            </div>
            <div @click="$router.push('/signup')" class="header__signup">
              <h1>Ro'yxatdan O'tish</h1>
            </div>
          </div>
        </div>
      </div>
    </header>

    <Client />
  </div>
</template>

<script>
import logoImg from "../assets/images/client-logo.svg";
import checked from "../assets/icons/checked.svg";
import yesIcon from "../assets/icons/yes.svg";

import Client from "./Client.vue";

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
  setup() {
    const notify = () => {
      toast("Wow so easy !", {
        autoClose: 1000,
      }); // ToastOptions
    };
    return { notify };
  },
  components: { Client },
};
</script>

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
        transition: 0.5s ease;
        color: #28293d;

        &:hover {
          color: #2e5bff;
        }
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
    transition: 0.5s ease;

    &:hover {
      color: #2e5bff;
      border: 2px solid #2e5bff;
      box-shadow: 0 0 8px #2e5bff;
    }

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
    transition: 0.5s ease;

    &:hover {
      background: #2e5bff;
      color: #fff;
      box-shadow: 0 0 015px #2e5bff;
    }
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
        border: 2px solid #2e5bff;
        cursor: pointer;
        transition: 0.4s ease;
        color: #ffffff;
      }
    }
  }
}

.form__btn:hover {
  background: #fff;
  color: #2e5bff;
}
</style>
