<template>
  <div class="home">
    <Title></Title>
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
  }
}
</script>

<style scoped lang="scss">

</style>