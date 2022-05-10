<template>
  <p>Double click to rename element</p>
  <div class="folder-map-wrapper">
    <FolderViewer
      v-for="folder in folderMap"
      :key="folder.name"
      :folderMap="folder"
    />
  </div>
</template>

<script>
import FolderViewer from "./components/FolderViewer.vue";

export default {
  name: "App",
  components: {
    FolderViewer,
  },

  computed: {
    folderMap() {
      return this.$store.getters.folderMap;
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

body {
  margin: 0 auto;
}
#app {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.folder-map-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
