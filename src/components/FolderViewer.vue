<template>
  <div class="folder-item" @dblclick.stop="renameElement">
    <div class="folder-name-wrapper">
      <div class="folder-name" :class="{'folder-name_file' : !folderMap.elements}">
        {{ folderMap.name }}
      </div>
      <div class="folder-action folder-copy" @click="addElement">
        NEW
      </div>
      <div class="folder-action folder-remove" @click="removeElement">
        DEL
      </div>
      <div v-show="isFolder && !isEmptyFolder" class="folder-action folder-toggle-view" @click="toggleFolderView">
        {{ isOpened? "&#8896;" : "&#8897;" }}
      </div>
    </div>
    <div v-if="isFolder" class="folder-add-buttons">
      <div class="folder-name folder-add-button" @click="addChildFolder">
        Add child folder
      </div>
      <div class="folder-name folder-add-button" @click="addChildFile">
        Add child file
      </div>
    </div>
    <div v-show="isOpened" class="folder-children">
      <div v-if="isFolder">
        <FolderViewer
          v-for="folder in folderMap.elements"
          :key="folder.id"
          :folderMap="folder"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FolderViewer",

  data() {
    return {
      isOpened: false,
    }
  },

  props: {
    folderMap: Object,
  },

  computed: {
    isFolder() {
      return this.folderMap.elements;
    },
    isEmptyFolder() {
      return this.folderMap.elements.length === 0;
    }
  },

  methods: {
    toggleFolderView() {
      this.isOpened = !this.isOpened;
    },
    removeElement() {
      this.$store.dispatch("removeElement", this.folderMap.id);
    },    
    addElement() {
      this.$store.dispatch("addElement", this.folderMap.id);
    },
    addChildFolder() {
      this.$store.dispatch("addChildFolder", this.folderMap.id);
      this.isOpened = true;
    },
    addChildFile() {
      this.$store.dispatch("addChildFile", this.folderMap.id);
      this.isOpened = true;
    },
    renameElement() {
      const newName = prompt("Input new name", `${this.folderMap.name}-new`);
      const payload = {
        id: this.folderMap.id,
        newName};
      this.$store.dispatch("renameElement", payload)
    }

  }
}
</script>

<style lang="scss" scoped>
.folder- {
  &item {
    width: 300px;
    margin: 0 auto;
  }
  &name-wrapper {
    display: flex;
    left: 15px;
    align-items: center;
    flex-direction: row;
    margin-bottom: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: black;
  }
  &name {
    display: flex;
    justify-content: flex-start;
    font-size: 1.3rem;
    font-weight: 400;
    padding: 10px 15px;
    line-height: 1.3rem;
    color: yellow;

    &_file {
      font-weight: 300;
      color: green;
    }
  }
  &children {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }
  &action {
    margin-right: 5px;
    padding: 5px;
    font-size: 0.7rem;
    font-weight: 400;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
  &action:hover {
    cursor: pointer;
  }
  &toggle-view {
    width: 10px;
    height: 10px;
    color: yellow;
    font-weight: 600;
    text-align: center;
    border-radius: 50%;
  }
  &remove {
    color: red;
  }
  &copy {
    margin-left: auto;
    color: goldenrod;
  }
  &add-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  &add-button {
    display: flex;
    justify-content: center;
    width: 40%;
    font-size: 1rem;
    color: darkgrey;
    padding: 0 15px;
    margin-bottom: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: lightgrey;
    transition: 0.3s;
  }
  &add-button:hover {
    background-color: darkgrey;
    color: white;
    cursor: pointer;
  }
}
.file {
  font-weight: 500;
  font-size: 1rem;
}
</style>