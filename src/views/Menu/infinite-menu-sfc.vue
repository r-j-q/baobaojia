<template>
    <el-menu v-bind="$attrs">
      <infinite-menu-item v-for="(item, index) in data"
                          :key="index"
                          :item="item"
                          :menu-options="options"/>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import InfiniteMenuItem from './infinite-menu-item.vue'
  import { defineProps, onMounted, PropType, ref } from 'vue'
  import { defaultMenuOptions, MenuItem, MenuOptions } from './types'
  
  const props = defineProps({
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true
    },
    menuOptions: {
      type: Object as PropType<MenuOptions>,
      required: false,
      default: () => ({})
    }
  })
  
  const options = ref({})
  
  onMounted(() => {
    options.value = {
      ...defaultMenuOptions,
      ...props.menuOptions
    }
  })
  </script>
  
  <style scoped lang="scss">
  </style>
  