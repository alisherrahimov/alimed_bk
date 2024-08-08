import * as yup from 'yup';

type GENDER_TYPE = 'MALE' | 'FAMALE';

const userSchema = yup.object().shape({
  phone: yup.string().required(),
  f_name: yup.string().required(),
  l_name: yup.string().required(),
  gender: yup.mixed<GENDER_TYPE>().oneOf(['FAMALE', 'MALE']).required(),
  age: yup.number().required(),
});

const verifyOtp = yup.object().shape({
  otp: yup.number().required('OTP is required'),
  phone: yup.string().required('Phone is required'),
});

interface UserSchemaBody extends yup.InferType<typeof userSchema> {}
interface VerifyOtpBody extends yup.InferType<typeof verifyOtp> {}

export { userSchema, UserSchemaBody, verifyOtp, VerifyOtpBody };
