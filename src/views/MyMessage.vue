<template>
    <div id="container">
        <Title active-index="3"></Title>
        <h2>this is the message page</h2>
    </div>
</template>

<script>
    import Title from "../components/Title";
    export default {
        name: "message",
        components: {Title}
    }
</script>

<style scoped>
    #container{

    }
</style>
