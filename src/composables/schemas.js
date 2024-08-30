import { object, string } from 'yup';

export const articlesSchema = object({
  game: string().required('The name of the game is required!'),
  title: string()
    .required('The title of the game is required!')
    .min(8, 'Make the title bigger')
    .max(40, 'Limit on 40 characters!'),
  excerpt: string().trim().max(1000, 'Limit on 1000 characters!'),
  editor: string().max(10000, 'Limit on 10000 characters!').required('Editor is required!'),
  rating: string()
    .required('You must select the rating of game!')
    .notOneOf(['Select rating of the game'], 'You need to select a rating'),
  image: string().required('The image is required').url('Is this a valid url ?')
});

export const userSchema = object({
  email: string().email('Not a valid email!').required('The email is required!'),
  password: string().length(6, 'The password must contains 6 charters!').required('The password is required!')
});
