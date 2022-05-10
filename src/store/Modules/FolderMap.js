export default {
  state: {
    folderMap: [
      {
        name: "Dir 1",
        id: Math.floor(Math.random()* 10000),
        elements: [
          {
            name: "Dir 1-1",
            id: Math.floor(Math.random()* 10000),
            elements: [
              {
                name: "File 1-1-1",
                id: Math.floor(Math.random()* 10000),
              },
            ],
          },
          {
            name: "File 1-2",
            id: Math.floor(Math.random()* 10000),
          }

        ],
      },
      {
        name: "Dir 2",
        id: Math.floor(Math.random()* 10000),
        elements: [
          {
            name: "Dir 2-1",
            id: Math.floor(Math.random()* 10000),
            elements: [],
          },
          {
            name: "File 2-2",
            id: Math.floor(Math.random()* 10000),
          }
        ],
      },
      {
        name: "File 2",
        id: Math.floor(Math.random()* 10000),
      }
    ],
  },

  actions: {
    removeElement(context, itemId) {
      context.commit("removeElement", itemId);
    },
    addElement(context, itemId) {
      context.commit("addElement", itemId);
    },
    addChildFolder(context, itemId) {
      context.commit("addChildFolder", itemId);
    },
    addChildFile(context, itemId) {
      context.commit("addChildFile", itemId);
    },
    renameElement(context, payload) {
      context.commit("renameElement", payload);
    },
  },

  mutations: {
    removeElement(state, reqItemId) {

      const removeFunction = (arr, itemId) => {
        const newArr = arr.filter(element => {
          if (element.id === itemId) {
            return false;
          }
          if (element.id !== itemId && !element.elements) {
            return true;
          }
          if (element.id !== itemId && element.elements) {
            return (element.elements = removeFunction(element.elements, itemId));
          }
        });
        return newArr;
      };

      state.folderMap =  removeFunction(state.folderMap, reqItemId);
    },

    addElement(state, reqItemId) {
      const findItemToAdd = (arr, itemId) => {
        arr.forEach((element, index) => {
          if (element.id === itemId && !element.elements) {
            console.log("add file")
            const newFile = {name: "New File", id: Math.floor(Math.random()* 10000)}; 
            arr.splice(index + 1, 0, newFile);
          }
          if (element.id === itemId && element.elements) {
            console.log("add folder")
            const newFolder = {name: "New Folder", id: Math.floor(Math.random()* 10000), elements: []};
            arr.splice(index + 1, 0, newFolder);
          }
          if (element.elements) {
            return findItemToAdd(element.elements, itemId);
          }
        })
      };
      findItemToAdd(state.folderMap, reqItemId);
    },

    addChildFolder(state, reqItemId) {
      const findItemToAdd = (arr, itemId) => {
        arr.forEach((element) => {
          if (element.id === itemId && element.elements) {
            const newFolder = {name: "New Folder", id: Math.floor(Math.random()* 10000), elements: []};
            element.elements.push(newFolder);
          }
          if (element.elements) {
            return findItemToAdd(element.elements, itemId);
          }
        })
      };
      findItemToAdd(state.folderMap, reqItemId);
    },

    addChildFile(state, reqItemId) {
      const findItemToAdd = (arr, itemId) => {
        arr.forEach((element) => {
          if (element.id === itemId && element.elements) {
            const newFile = {name: "New File", id: Math.floor(Math.random()* 10000)};
            element.elements.push(newFile);
          }
          if (element.elements) {
            return findItemToAdd(element.elements, itemId);
          }
        })
      };
      findItemToAdd(state.folderMap, reqItemId);
    },

    renameElement(state, payload) {
      const {id: itemId, newName} = payload;
      const findItemToRename = (arr, id, newN) => {
        arr.map(element => {
          if (element.id === id) {
            element.name = newN;
          }
          if (element.id !== id && element.elements) {
            return findItemToRename(element.elements, id, newN);
          }
        })
      };

      findItemToRename(state.folderMap, itemId, newName);
    }
  },

  getters: {
    folderMap(state) {
      return state.folderMap;
    }
  },
}