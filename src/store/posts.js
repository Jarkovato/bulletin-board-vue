import * as fb from "firebase";

// класс для создания нового поста
class Post {
  constructor(
    title,
    description,
    ownerId,
    imageSrc = "",
    promo = false,
    id = null
  ) {
    this.title = title;
    this.description = description;
    this.ownerId = ownerId;
    this.imageSrc = imageSrc;
    this.promo = promo;
    this.id = id;
  }
}

export default {
  state: {
    posts: [],
  },
  mutations: {
    //создать пост
    createPost(state, payload) {
      console.log(payload);
      state.posts.push(payload);
    },
    //загрузить посты в стейт
    loadPosts(state, payload) {
      state.posts = payload;
    },
    //обновить пост
    updatePost(state, { title, description, id }) {
      const post = state.posts.find((p) => {
        return p.id === id;
      });
      post.title = title;
      post.description = description;
    },
  },
  actions: {
    //создает пост и отправляет в бэкенд
    async createPost({ commit, getters }, payload) {
      //обработка ошибок и загрузка
      commit("clearError");
      commit("setLoading", true);
      //переменная для работы с изображением
      const image = payload.image;

      //добавляет данные
      try {
        const newPost = new Post(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        );
        //создает элемент в базе данных
        const post = await fb
          .database()
          .ref("posts")
          .push(newPost);
        //находит расширение картинки после последней точки
        const imageExt = image.name.slice(image.name.lastIndexOf("."));
        //сохраняет изображения в бд
        const fileData = await fb
          .storage()
          .ref(`posts/${post.key}.${imageExt}`)
          .put(image);
        //получает ссылку на изображение
        const imageSrc = await fb
          .storage()
          .ref()
          .child(fileData.ref.fullPath)
          .getDownloadURL();
        //сохраняет ссылку на изображение в бд
        await fb.database().ref('posts/' + post.key).set({
          ...newPost,
          imageSrc: imageSrc
        })
        //останавливает загрузку
        commit("setLoading", false);

        // добавляет айди созданное в бд
        commit("createPost", {
          ...newPost,
          id: post.key,
          imageSrc,
        });

        // в случае ошибки
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    //получает посты из бд
    async fetchPosts({ commit }) {
      commit("clearError"), commit("setLoading", true);

      const resultPosts = [];

      try {
        const fbVal = await fb
          .database()
          .ref("posts")
          .once("value");
        const posts = fbVal.val();

        Object.keys(posts).forEach((key) => {
          const post = posts[key];
          resultPosts.push(
            new Post(
              post.title,
              post.description,
              post.ownerId,
              post.imageSrc,
              post.promo,
              key
            )
          );
        });

        // забирает значение постов
        commit("loadPosts", resultPosts);
        commit("setLoading", false);
      } catch (error) {
        //обрабатывает ошибки
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    async updatePost({ commit }, { title, description, id }) {
      // чистит ошибки
      commit("clearError");
      // загрузка
      commit("setLoading", true);

      try {
        //находит объявление в бд по айди
        await fb
          .database()
          .ref("posts")
          .child(id)
          .update({
            title,
            description,
          });
        commit("updatePost", {
          title,
          description,
          id,
        });
        // останавливает загрузку
        commit("setLoading", false);
      } catch (error) {
        // отправляет сообщение ошибки
        commit("setError", error.message);
        // останавливает загрузку
        commit("setLoading", false);
        throw error;
      }
    },
  },
  getters: {
    //геттер постов
    posts(state) {
      return state.posts;
    },
    //геттер промо-постов
    promoPosts(state) {
      return state.posts.filter((post) => {
        return post.promo;
      });
    },
    //геттер постов текущего пользователя
    myPosts(state, getters) {
      return state.posts.filter((post) => {
        return post.ownerId === getters.user.id;
      });
    },
    //открытие поста с нужным айди
    postById(state) {
      return (postId) => {
        return state.posts.find((post) => post.id === postId);
      };
    },
  },
};
