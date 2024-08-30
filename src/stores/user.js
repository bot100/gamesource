import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

/// FIREBASE
import { AUTH, DB } from '@/tools/firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';

const DEFAULT_USER = {
  uid: '',
  email: '',
  firstName: '',
  lastName: '',
  isAdmin: null
};

export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const $toast = useToast();
  // STATE
  const user = ref(DEFAULT_USER);
  const auth = ref(false);
  const loading = ref(false);

  // GETTERS
  const getUserData = computed(() => user.value);

  const getUserID = computed(() => AUTH.currentUser.uid);

  // ACTIONS
  // Function setUser
  function setUser(userFromDB) {
    // mix two objects - initial user + user from DB
    user.value = { ...user.value, ...userFromDB };
    auth.value = true;
  }

  // Function logout
  async function logout() {
    try {
      user.value = DEFAULT_USER;
      setTimeout(async () => {
        await signOut(AUTH);
        auth.value = false;
        router.push({ name: 'auth' });
      }, 2000);

      $toast.open({
        type: 'warning',
        position: 'bottom-right',
        message: `You are logout, wait 2 seconds!`,
        duration: 2000
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Function auto Sign in
  async function autoSignIn(uid) {
    try {
      // Get User data
      const userDataFromDB = await getUserProfile(uid);
      // Update Pinia local state (user ref)
      setUser(userDataFromDB);
    } catch (error) {
      console.log(error);
    }
  }

  // Function Sign up
  async function createUser(formData) {
    try {
      loading.value = true; // start loader

      // Sign up
      const response = await createUserWithEmailAndPassword(AUTH, formData.email, formData.password);

      // Add User to DB
      const newUserForDB = {
        uid: response.user.uid,
        email: response.user.email,
        isAdmin: false
      };

      // Sync Authentication and Firestore DB
      await setDoc(doc(DB, 'users', response.user.uid), newUserForDB);

      // Update Pinia local state (user ref)
      setUser(newUserForDB);

      // Redirect user
      router.push({ name: 'dashboard' });
    } catch (error) {
      throw new Error(error);
    } finally {
      loading.value = false;
    }
  }

  // Function Sign in
  async function signInUser(formData) {
    try {
      loading.value = true; // start loader

      // Sign in
      const response = await signInWithEmailAndPassword(AUTH, formData.email, formData.password);

      if (!response) throw new Error('Sorry, something went wrong');

      // Get User data
      const userDataFromDB = await getUserProfile(response.user.uid);
      // Update local state (user ref)
      setUser(userDataFromDB);

      // Redirect user
      router.push({ name: 'dashboard' });
    } catch (error) {
      throw new Error(error);
    } finally {
      loading.value = false;
    }
  }

  // Function get user by uid from DB
  async function getUserProfile(uid) {
    try {
      const userRef = await getDoc(doc(DB, 'users', uid));

      if (!userRef.exists()) throw new Error("User doesn't exist!");

      return userRef.data();
    } catch (error) {
      throw new Error(error);
    }
  }

  //
  async function updateProfile(formData) {
    try {
      const docRef = doc(DB, 'users', getUserID.value);
      await updateDoc(docRef, { ...formData });
      setUser(formData);
      $toast.success('Your profile was updated!');
    } catch (error) {
      $toast.error(error.message);
      throw new Error(error);
    }
  }

  return {
    user,
    loading,
    auth,
    getUserData,
    createUser,
    signInUser,
    setUser,
    getUserProfile,
    autoSignIn,
    logout,
    updateProfile
  };
});
