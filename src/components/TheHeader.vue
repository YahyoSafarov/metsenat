<template>
  <div>
    <header class="header">
      <div class="container">
        <div @click="$router.push('')" class="header__logo">
          <img src="../assets/icons/logo.svg" alt="logo" />
        </div>
        <div class="header__menu">
          <div class="header__user">
            <h3 class="header__user-name">Shohrux</h3>
            <div class="header__user-img">
              <img src="../assets/icons/user.svg" alt="user" />
            </div>
          </div>
          <div @click="logout" class="header__logout">
            <img src="../assets/icons/logout.svg" alt="log out" />
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 2;
  padding: 12px 0px;
  box-shadow: 0px 25px 40px rgba(0, 0, 0, 0.03);

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
  }

  &__logo {
    cursor: pointer;
  }

  &__menu {
    display: flex;
    align-items: center;
    gap: 40px;

    @media (max-width: 576px) {
      width: 100%;
      justify-content: space-between;
    }
  }

  &__user {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 4px 4px 4px 20px;
    background: #f1f1f3;
    border-radius: 6px;
    gap: 24px;

    &-name {
      font-weight: 700;
      font-size: 14px;
      line-height: 150%;
      letter-spacing: -0.35px;
      color: #28293d;
    }

    &-img {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      background: #00ae69;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
  }

  &__logout {
    cursor: pointer;
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
}
</style>
