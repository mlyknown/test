<template>
    <div class="headband"></div>
    <main id="app">
        <profile></profile>
        <content></content>
    </main>
</template>

<script>
    import profile from './components/profile.vue'
    import content from './components/content.vue'
    export default {
        data: function () {
            return {
                title:''
            }
        },
        components: {
            'profile':profile,
            'content':content
        }
    }
</script>