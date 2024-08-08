import * as yup from 'yup';

const sendMessagesSchema = yup.object().shape({
  user_id: yup.string().required('user_id is required'),
  doctor_id: yup.string().required('doctor_id is required'),
  content: yup.string().required('Content is required'),
});

const getMessagesSchema = yup.object().shape({
  user_id: yup.string().required('User id is required'),
  doctor_id: yup.string().required('Doctor id is required'),
});

interface SendMessagesBody extends yup.InferType<typeof sendMessagesSchema> {}
interface GetMessagesBody extends yup.InferType<typeof getMessagesSchema> {}

export {
  sendMessagesSchema,
  SendMessagesBody,
  getMessagesSchema,
  GetMessagesBody,
};
