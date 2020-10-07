<template>
  <div class="home">
    <Title active-index="1"></Title>
    <Table></Table>
  </div>
</template>

<script>
// @ is an alias to /src

import Title from "../components/Title";
import Table from "../components/Table";

export default {
  name: 'Home',
  components: {
    Table,
    Title
  },
  data(){
    return{
      ifSign:false
    }
  },
  methods:{
    CheckStatus:function () {
      this.ifSign=localStorage.getItem("status")
      if (this.ifSign!=="ok"){
        window.location.href="./sign_in"
      }
    }
  },
  created() {
    this.CheckStatus()
  }
}
</script>

<style scoped lang="scss">

</style>
