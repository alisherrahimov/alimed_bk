import { Type } from '@prisma/client';
import * as yup from 'yup';

const sendMessagesSchema = yup.object().shape({
  senderType: yup
    .mixed<Type>()
    .oneOf(Object.values(Type))
    .required('Sender type is required'),
  senderId: yup.string().required('Sender id is required'),
  receiverType: yup
    .mixed<Type>()
    .oneOf(Object.values(Type))
    .required('Reciver type is required'),
  receiverId: yup.string().required('Receiver id is required'),
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
