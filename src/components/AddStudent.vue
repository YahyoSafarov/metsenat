<template>
    <div>
        <section class="add">
        <div class="add__header">
            <div class="container">
                <button @click="$router.push('/admin/students')"
                    class="add__header-btn">
                    <img :src="leftarrowIcon"
                        alt="arrow">
                </button>
                <div class="add__header-box">
                    <h2 class="add__header-name">Talaba qo‘shish</h2>
                </div>
            </div>
        </div>
        <form @submit.prevent="addStudent()"
            class="add__body">
            <div class="add__body-box">
                <label class="add__el"
                    for="name">
                    <h3 class="add__subtitle">F.I.Sh. (Familiya Ism Sharif)</h3>
                    <input v-model="newStudent.full_name"
                        id="name"
                        required
                        name="name"
                        placeholder="F.I.Sh."
                        type="text">
                </label>
                <label class="add__el"
                    for="tel">
                    <h3 class="add__subtitle">Telefon raqam</h3>
                    <input v-model="newStudent.phone"
                        id="tel"
                        name="tel"
                        required
                        placeholder="+998(00)000-00-00"
                      
                        type="text">

                        <!-- <input type="number" value="4.4" min="2.2" max="11" step="2.2" 
                        placeholder="+998(00)000-00-00"/> -->

                </label>
            </div>
            <label for="university"
                class="add__university add__el">
                <h3 class="add__subtitle">OTM</h3>
                <select v-model="newStudent.institute"
                    name="university"
                    id="university"
                    required>
                    <option value=""
                        disabled
                        selected>-- OTM ni tanlang</option>
                    <option v-for="(item, index) in getUniversityList"
                        :key="index"
                        :value="item.id">{{ item.name }}</option>
                </select>
            </label>
            <div class="add__body-box">
                <label class="add__el"
                    for="name">
                    <h3 class="add__subtitle">Talabalik turi</h3>
                    <select v-model="newStudent.type"
                        required
                        name="university"
                        id="university">
                        <option value=""
                            disabled
                            selected>-- Talabalik turini tanlang</option>
                        <option value="1">Bakalavr</option>
                        <option value="2">Magistr</option>
                    </select>
                </label>
                <label class="add__el"
                    for="sum">
                    <h3 class="add__subtitle">Kontrakt summa</h3>
                    <input v-model="newStudent.contract"
                        required
                        id="sum"
                        name="sum"
                        placeholder="Summani kiriting"
                        type="number">
                </label>
            </div>
            <div class="add__bottom">
                <button type="submit"
                    class="add__bottom-btn">
                    <img :src="plusBtn"
                        alt="plus">
                    <h3>Qo‘shish</h3>
                </button>
            </div>
        </form>
    </section>
    </div>
</template>

<script setup>
// icons

import leftarrowIcon from '../assets/icons/leftarrow.svg'
import plusBtn from "../assets/icons/add.svg"


// import { useToast } from "vue-toastification"

import { mapGetters } from 'vuex'


</script>

<script>
export default {
    name: "AddStudent",
    data() {
        return {
            data: [],
            newStudent: {
                full_name: "",
                type: '',
                phone: "",
                institute: '',
                contract: null,
            }
        }
    },

    methods: {
        addStudent() {
            const toast = useToast()

            this.$store.dispatch('postStudent', this.newStudent)

            this.newStudent = {
                full_name: "",
                type: '',
                phone: "",
                institute: '',
                contract: null,
            }

            // toast("Ученик добавлен!", {
            //     position: "top-right",
            //     timeout: 2000,
            //     hideProgressBar: false,
            //     closeButton: true,
            //     closeOnClick: true,
            //     pauseOnFocusLoss: false,
            //     pauseOnHover: false,
            //     draggable: true,
            //     draggablePercent: 0.6,
            //     closeButton: "button",
            //     icon: true,
            //     rtl: false
            // });
        }
    },
    computed: {
        ...mapGetters(['getUniversityList'])
    },
    mounted() {
        this.$store.dispatch('getUniversity')
    }
}
</script>

<style lang="scss" scoped>
.add {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__subtitle {
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        letter-spacing: 1.125px;
        text-transform: uppercase;
        color: #1D1D1F;
    }

    &__header {
        width: 100%;
        background: hsl(0, 0%, 100%);
        padding: 20px 0px;

        .container {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        &-btn {
            background: none;
            cursor: pointer;
        }

        &-name {
            font-weight: 700;
            font-size: 24px;
            line-height: 28px;
            color: #28293D;
        }
    }

    &__el {
        display: flex;
        flex-direction: column;
        gap: 8px;

        input,
        select {
            background: rgba(224, 231, 255, 0.2);
            border: 1px solid #E0E7FF;
            border-radius: 6px;
            font-weight: 400;
            font-size: 15px;
            line-height: 18px;
            display: flex;
            align-items: center;
            padding: 0px 16px;
            height: 42px;
            color: #2E384D;
        }
    }

    &__body {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 28px;
        margin-top: 40px;
        max-width: 800px;
        width: 95%;
        background: #FFFFFF;
        border: 1px solid #EBEEFC;
        box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.03);
        border-radius: 12px;
        padding: 24px 32px;

        @media (max-width: 576px) {
            margin-top: 10px;
        }

        &-box {
            display: flex;
            align-items: center;
            gap: 28px;
            flex-wrap: wrap;

            label {
                width: calc(50% - 14px);

                @media (max-width: 576px) {
                    width: 100%;
                }

                input[type=number]::-webkit-inner-spin-button,
                input[type=number]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                input {
                    &::placeholder {
                        color: rgba(46, 56, 77, 0.35);
                    }
                }
            }
        }
    }

    &__university {
        width: 100%;

        select {
            width: 100%;
        }
    }

    &__bottom {
        border-top: 2px solid #F5F5F7;
        padding-top: 28px;
        width: 100%;
        display: flex;
        justify-content: flex-end;

        &-btn {
            cursor: pointer;
            width: fit-content;
            background: #3366FF;
            box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.04), 0px 2px 4px rgba(96, 97, 112, 0.16);
            border-radius: 5px;
            height: 42px;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0px 32px;



            h3 {
                font-weight: 500;
                font-size: 14px;
                line-height: 24px;
                letter-spacing: -0.35px;
                color: #FFFFFF;
            }
        }
    }
}
</style>