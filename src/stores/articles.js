import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { ref, computed } from 'vue';

/// FIREBASE
import { DB } from '@/tools/firebase/firebase';
import {
  collection,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
  getDocs,
  limit,
  startAfter,
  deleteDoc
} from 'firebase/firestore';

// TOASTS
import { useToast } from 'vue-toast-notification';

const articlesCollection = collection(DB, 'articles'); // articles collection

export const useArticleStore = defineStore('article', () => {
  const userStore = useUserStore();
  const router = useRouter();
  const $toast = useToast();

  // STATE
  const homeArticles = ref('');
  const adminArticles = ref('');
  const adminLastVisible = ref('');

  // GETTERS
  const getSomeSlides = computed(() => {
    return homeArticles.value.slice(0, 7);
  });

  const getHomeArticles = computed(() => {
    return homeArticles.value;
  });

  // ACTIONS
  // Function get Articles
  async function getArticles(docLimit) {
    try {
      const q = query(articlesCollection, orderBy('timestamp', 'desc'), limit(docLimit));
      const querySnapshot = await getDocs(q);
      const articles = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      homeArticles.value = articles;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Function add Article
  async function addArticle(formData) {
    try {
      // GET USER PROFILE
      const user = userStore.getUserData;
      // POST DOC IN DB
      await setDoc(doc(articlesCollection), {
        timestamp: serverTimestamp(),
        owner: {
          uid: user.uid,
          firstName: user.firstName,
          lastName: user.lastName
        },
        ...formData
      });

      router.push({ name: 'articles', query: { reload: true } });

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Function get Articles
  async function adminGetArticles(docLimit) {
    try {
      const q = query(articlesCollection, orderBy('timestamp', 'desc'), limit(docLimit));
      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      const articles = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // UPDATE ADMIN ARTICLES STATE
      adminLastVisible.value = lastVisible;
      adminArticles.value = articles;
    } catch (error) {
      $toast.error(error.message);
      throw new Error(error);
    }
  }

  // Function get more Articles
  async function adminGetMoreArticles(docLimit) {
    try {
      if (adminLastVisible.value) {
        let oldArticles = adminArticles.value;
        const q = query(
          articlesCollection,
          orderBy('timestamp', 'desc'),
          startAfter(adminLastVisible.value),
          limit(docLimit)
        );
        const querySnapshot = await getDocs(q);
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        const newArticles = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        adminLastVisible.value = lastVisible;
        adminArticles.value = [...oldArticles, ...newArticles];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // Function Remove Game
  async function removeGame(id) {
    try {
      await deleteDoc(doc(DB, 'articles', id));
      // Update UI in local state, not in Firebase (backend) without extra requests
      const newList = adminArticles.value.filter((article) => article.id !== id);
      adminArticles.value = newList;

      $toast.success('Article was removed!');
    } catch (error) {
      $toast.error(error.message);
      throw new Error(error);
    }
  }

  // Function get Article by id
  async function getArticleByID(id) {
    try {
      const docRef = await getDoc(doc(DB, 'articles', id));
      if (!docRef.exists()) throw new Error('Could not find document!');
      return docRef.data();
    } catch (error) {
      $toast.error(error.message);
      router.push({ name: '404' });
    }
  }

  // Function update Article
  async function updateArticle(id, formData) {
    try {
      const docRef = doc(DB, 'articles', id);
      await updateDoc(docRef, { ...formData });
      router.push({ name: 'articles', query: { reload: true } });

      $toast.success('Changes is accepted!');
    } catch (error) {
      $toast.error(error.message);
      throw new Error(error);
    }
  }

  return {
    homeArticles,
    adminArticles,
    adminLastVisible,
    getSomeSlides,
    getHomeArticles,
    getArticles,
    addArticle,
    adminGetArticles,
    adminGetMoreArticles,
    removeGame,
    getArticleByID,
    updateArticle
  };
});
