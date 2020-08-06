<template>
    <v-app>
        <header>
            <v-app-bar app color="primary" dark width="100%"></v-app-bar>
        </header>
        <div class="my-2 btn-style">
            <v-btn class="sp-visible" color="purple" dark @click.stop="drawer = !drawer">チャット</v-btn>
        </div>
        <v-row>
            <v-navigation-drawer v-model="drawer" absolute right style="padding-top: 70px;">
                <SideComment />
            </v-navigation-drawer>
        </v-row>
        <router-view />
        <v-footer color="primary" class="footer-content">
            <v-col class="text-center white--text">
                {{ new Date().getFullYear() }} —
                <strong>CF Ecommerce Platform</strong>
            </v-col>
        </v-footer>
    </v-app>
</template> 
<style lang="scss" scoped>
$pc-min: 1264px;
@mixin display_pc {
    @media (min-width: $pc-min) {
        @content;
    }
}
.sp-visible {
    @include display_pc {
        display: none !important;
        padding-top: 0;
        padding-bottom: 0;
        margin: 0;
    }
}
.btn-style {
    padding-left: 10px;
    padding-top: 60px;
}
.footer-content {
    bottom: 0;
    z-index: 1000;
}
</style>
<script>
import SideComment from "./components/SideComment";
export default {
    name: "App",
    components: {
        SideComment,
    },
    data() {
        if (matchMedia("only screen and (max-width: 1264px)").matches) {
            return {
                drawer: false,
                model: null,
            };
        } else {
            return {
                drawer: true,
                model: null,
            };
        }
    },
};
</script>