<template>
    <div>
        <div class="navbar">
        <div class="container">
            <nav class="nav">
                <ul class="nav__list">
                    <li v-for="(item, index) in $store.state.tabView"
                        :key="index"
                        @click="tabItem(item)"
                        :class="item.active ? 'active' : ''"
                        class="nav__list-item">
                        <input type="radio"
                            name="admin-page"
                            :id="item.id"
                            :value="item.value"
                            v-model="selectComponent">
                        <label :for="item.value">{{ item.title }}</label>
                    </li>
                </ul>
            </nav>
            <div class="navbar__menu">
                <div class="search">
                    <input type="search"
                        name="search"
                        id="search"
                        placeholder="Izlash">
                    <button class="search__btn">
                        <img src="../assets/icons/search.svg"
                            alt="search">
                    </button>
                </div>
                <button v-if="tabActived == 2"
                    @click="activeFilter"
                    class="filter">
                    <img src="../assets/icons/filter.svg"
                        alt="filter">
                    <h3>Filter</h3>
                </button>
                <button v-else-if="tabActived == 3"
                    @click="activeFilter"
                    class="filter">
                    <img src="../assets/icons/filter.svg"
                        alt="filter">
                    <h3>Filter</h3>
                </button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: "NavigationPanel",
    data() {
        return {
            selectComponent: 'dashboard'
        }
    },
    methods: {
        tabItem(item) {
            this.$store.commit('CHANGE_TAB_ACTIVE', item)
            this.updateTabView()
        },
        updateTabView() {
            let data = JSON.stringify(this.$store.state.tabView)
            localStorage.setItem('tabView', data)
        },
        showTab() {
            this.$store.commit('NEW_TAB_VIEW', JSON.parse(localStorage.getItem('tabView')))
        },
        activeFilter() {
            document.body.style.overflow = 'hidden';
            if (this.tabActived == 2) {
                this.$store.commit('TOGGLE_FILTER_SPONSOR')
            } else if (this.tabActived == 3) {
                this.$store.commit('TOGGLE_FILTER_STUDENTS')
            }
        }
    },
    watch: {
        selectComponent(newVal) {
            this.$emit('updateSelectedComponent', newVal);
        }
    },
    computed: {
        tabActived() {
            const activeTabItem = this.$store.state.tabView.find(tab => tab.active)
            return activeTabItem ? activeTabItem.id : null
        },
    },
    mounted() {
        this.showTab()
    }

}
</script>


<style lang="scss" scoped>
.navbar {
    background: #FFFFFF;
    position: relative;
    z-index: 1;
    padding: 24px 0px;

    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        row-gap: 25px;
    }

    .nav {
        width: 100%;
        max-width: 580px;

        @media (max-width: 992px) {
            max-width: 100%;
        }

        &__list {
            width: 100%;
            display: flex;
            align-items: center;


            &-item {
                cursor: pointer;
                width: calc(100% / 3);
                padding: 14px 0px;
                background: #fff;
                border: 2px solid #E0E7FF;
                text-align: center;
                font-weight: 500;
                font-size: 12px;
                line-height: 12px;
                letter-spacing: 1.125px;
                text-transform: uppercase;
                position: relative;

                color: rgba(51, 102, 255, 0.6);


                &.active {
                    border: 2px solid #3366FF;
                    background: #3366FF;
                    color: #fff;
                }

                &:first-child {
                    border-radius: 6px 0px 0px 6px;
                }

                &:last-child {
                    border-radius: 0px 6px 6px 0px;
                }

                input[type="radio"] {
                    cursor: pointer;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 2;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                }
            }
        }

    }

    &__menu {
        display: flex;
        align-items: center;
        gap: 20px;

        @media (max-width: 992px) {
            width: 100%;
        }

        .search {
            max-width: 284px;
            width: 100%;
            position: relative;
            background: #E8E8E8;
            border-radius: 5px;

            @media (max-width: 992px) {
                max-width: 100%;
            }

            &__btn {
                background: transparent;
                cursor: pointer;
                position: absolute;
                left: 0;
                top: 0;
                width: 38px;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 40px;
            }

            input {
                background: transparent;
                border: none;
                outline: none;
                padding: 12px 8px 10px 42px;
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;

                &::placeholder {
                    color: #B1B1B8;
                }
            }
        }

        .filter {
            cursor: pointer;
            display: flex;
            gap: 10px;
            align-items: center;
            background: #EDF1FD;
            border-radius: 5px;
            padding: 0px 30px;
            height: 40px;

            h3 {
                font-weight: 500;
                font-size: 14px;
                line-height: 24px;
                letter-spacing: -0.35px;
                color: #3365FC;
            }
        }
    }
}
</style>