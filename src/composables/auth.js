// USER STORE
import { useUserStore } from '@/stores/user';
// FIREBASE
import { AUTH } from '@/tools/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function tryLoadAppWithUser() {
  const store = useUserStore();
  store.loading = true;

  onAuthStateChanged(AUTH, async (user) => {
    if (user) await store.autoSignIn(user.uid);
    store.loading = false;
  });
}

export function isAuthenticated() {
  const user = AUTH.currentUser;
  console.log('User is authenticated: true');
  console.log(user);
  if (!user) return '/auth';
  return true;
}

export function isLoggedIn() {
  const user = AUTH.currentUser;
  if (user) return '/';
  return true;
}
