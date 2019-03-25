<template>
  <nav>
    <!-- Right toolbar -->
    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" @click="navigation.shown = !navigation.shown"></v-toolbar-side-icon>
      <v-toolbar-title class="grey--text">
        <span class="font-weight-light">Todo</span>
        <span>Ninja</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- login/logout btn -->
      <v-btn color="success">
        <span>Sign out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Left Drawer -->
    <v-navigation-drawer ref="drawer" app :width="navigation.width" v-model="navigation.shown" style="height:100%;overflow:hidden">
      <!-- drawer toolbar -->
      <v-toolbar color="red" grid-list-md text-xs-center fixed>
        <v-flex xs6>
        <v-toolbar-title class="headline padding-bottom:0">
          <span>A</span>
          <span class="font-weight-light">rticle</span>
        </v-toolbar-title>
        </v-flex>
        <!-- search btn -->
        <v-flex xs6>
        <v-text-field
          clearable
          name="search"
          label="Search"
          color="black"
          class="red"
          @click:append="console.log('todo-搜索文章')"
        >{}></v-text-field>
        </v-flex>
      </v-toolbar>
      <!-- tab -->
      <v-tabs style="padding-top: 65px; padding-bottom: 50px; overflow: hidden; height: 100%;">
        <!-- tab Item -->
        <v-tab :key="0">我的文章</v-tab>
        <v-tab :key="1">一键上传</v-tab>
        <!-- tab close btn -->
        <v-spacer></v-spacer>
        <v-btn fab small flat @click="navigation.shown = !navigation.shown ">
          <v-icon>close</v-icon>
        </v-btn>
        <!-- tab Item 0 Content -->
        <v-tab-item :key="0">
          <Tree></Tree>
        </v-tab-item>
        <!-- tab Item 1 Content -->
        <v-tab-item :key="1">
          <v-card flat>
            <v-card-text>Content for tab 1 would go here</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
      <!-- drawer footer -->
      <v-footer inset absolute color="red">
        <v-btn fab small color="success">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn fab color="success">
          <v-icon>add</v-icon>
        </v-btn>
      </v-footer>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Tree from "./Navbar-tree.vue";
export default {
  components: { Tree },
  data() {
    return {
      navigation: {
        tabNumber: 3,
        shown: false,
        width: 300,
        borderSize: 3
      }
    };
  },
  computed: {
    direction() {
      return this.navigation.shown === false ? "Open" : "Closed";
    }
  },
  methods: {
    // 设置拉伸handel的宽度, 光标样式,颜色
    setBorderWidth() {
      let i = this.$refs.drawer.$el.querySelector(
        ".v-navigation-drawer__border"
      );
      i.style.width = this.navigation.borderSize + "px";
      i.style.cursor = "ew-resize";
      // i.style.backgroundColor = "red";
    },

    // 鼠标事件
    setEvents() {
      const minSize = this.navigation.borderSize;
      const el = this.$refs.drawer.$el;
      const drawerBorder = el.querySelector(".v-navigation-drawer__border");
      const vm = this;
      const direction = el.classList.contains("v-navigation-drawer--right")
        ? "right"
        : "left";

      function resize(e) {
        document.body.style.cursor = "ew-resize";
        let f =
          direction === "right"
            ? document.body.scrollWidth - e.clientX
            : e.clientX;
        el.style.width = f + "px";
      }


      // 按下
      drawerBorder.addEventListener(
        "mousedown",
        e => {
          if (e.offsetX < minSize) {
            el.style.transition = "initial";
            document.addEventListener("mousemove", resize, false);
          }
        },
        false
      );
      // 松开
      document.addEventListener(
        "mouseup",
        () => {
          el.style.transition = "";
          this.navigation.width = el.style.width;
          document.body.style.cursor = "";
          document.removeEventListener("mousemove", resize, false);
        },
        false
      );
    }
  },
  mounted() {
    this.setBorderWidth();
    this.setEvents();
  }
};
</script>




