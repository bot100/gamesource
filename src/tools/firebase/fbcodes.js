function errorCoders(code) {
  let message = '';

  switch (code) {
    case 'FirebaseError: Firebase: Error (auth/invalid-credential).':
      message = 'User not found, check your email or password!';
      break;

    case 'FirebaseError: Firebase: Error (auth/email-already-in-use).':
      message = 'These user already is registered!';
      break;

    default:
      message = 'Sorry, try again later';
  }

  return message;
}

export default errorCoders;
