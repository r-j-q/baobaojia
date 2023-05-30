<template>
    <div>
        importList1
        <button @click="fff">1</button>
    </div>
</template>

<script setup lang="ts" name="import">
import service from '@/utils/http.ts'
const fff = () => {
    service('/login', {
        method: 'post',
        data: {
            phone: "19138984495",
            pwd: "123456",
            nickname: "cc"
        },
    }).then((res: any) => {

    })
}
  
</script>

<style scoped></style>
