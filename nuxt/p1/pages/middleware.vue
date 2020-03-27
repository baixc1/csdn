<template>
    <h1>i am middleware</h1>
</template>
<script>
export default {
    middleware: 'auth',
    mounted(){
        console.log('i am mounted')
    }
}
</script> 