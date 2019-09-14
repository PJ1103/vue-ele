<template>
    <router-view>

    </router-view>
</template>

<script>
import { reqCategory } from '../../api';
export default {
  async mounted () {
    const result = await reqCategory({ parentId: 0 })
    console.log(result);
  }

}
</script>

<style lang="less" scoped>
  
</style>
