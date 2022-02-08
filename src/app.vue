<!--
 * @Author: JFU32
 * @Date: 2022-02-07 21:58:58
 * @LastEditors: JFU32
 * @LastEditTime: 2022-02-08 21:41:44
 * @Description: 请填写简介...
-->
<template>
  <div class="box-cl">
    <p>{{ text }}</p>
    <p class="red">{{ text }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'abc'
    }
  }
}
</script>

<style>
.box-cl {
  color: purple;
}
</style>