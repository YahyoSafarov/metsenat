<template>
    <div>
        <the-header />
        <add-student />
    </div>
</template>

<script setup>

import TheHeader from '../components/TheHeader.vue';
import AddStudent from '../components/AddStudent.vue'
</script>

<script>
export default {
    components: {AddStudent,  TheHeader },
}
</script>

<style lang="scss" scoped>

</style>