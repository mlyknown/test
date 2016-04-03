   <template>
    <div id="content">
        <router-view></router-view>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    import contentHome from './content-home.vue';
    var content = Vue.extend({
                          data: function () {
                              return {
                                    title:''
                                 }
                             }
         }
    });
    Vue.use(VueRouter);
    var router = new VueRouter();
    router.map({
        '/home': {
            name:'home',
            component: contentHome
        }
    });
    router.start(content, '#content');*/
    export default content
</script>