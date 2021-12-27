<template>
  <div class="popup_page">
    sulg-plugin-cli popup
    <div class="popup_page_main">
      this is sulg-plugin-cli popup
      <div>
        <a-button type="primary" @click="sendMessgageToBg" size="mini">popup button</a-button>
        <a-input v-model="mess"></a-input>
      </div>
    </div>
  </div>
</template>

<script>
import { sortConnectMsgSend } from "../../utils/chrome";
export default {
  	data(){
      mess: ''
    },
    methods: {
      sendMessgageToBg(){
      }
    }
};
</script>

<style lang="less" scoped>
.popup_page {
  width: 400px;
  color: red;
  height: 500px;
  .popup_page_main {
    color: green;
  }
}
</style>