import { ref } from 'vue';
import { object, string } from 'yup';
import { useToast } from 'vue-toast-notification';
// USER STORE
import { useUserStore } from '@/stores/user';

export function useUpdateProfile() {
  const userStore = useUserStore();
  const $toast = useToast();

  const firstName = ref(userStore.user.firstName);
  const lastName = ref(userStore.user.lastName);
  const firstNameInitial = ref(firstName.value);
  const lastNameInitial = ref(lastName.value);
  const loading = ref(false);

  const formSchema = object({
    firstName: string().max(20, 'Your firstName is too long').required('The firstName is required'),
    lastName: string().max(20, 'Your firstName is too long').required('The lastName is required')
  });

  function onSubmit(values) {
    if (values.firstName !== firstNameInitial.value || values.lastName !== lastNameInitial.value) {
      loading.value = true;
      userStore.updateProfile(values).finally(() => {
        loading.value = false;
      });

      firstNameInitial.value = firstName.value;
      lastNameInitial.value = lastName.value;
    } else {
      $toast.warning('Your profile is leaving the same, you must change that!');
    }
  }

  return { firstName, lastName, loading, formSchema, onSubmit };
}
