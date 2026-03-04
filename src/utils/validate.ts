import * as yup from 'yup';

export const validateRequired = (label: string) =>
  yup.string().nullable().required(`Please enter ${label}`);

export const validateRequiredMsg = (label: string) =>
  yup.string().nullable().required(`${label}`);

export const validatePhone = () =>
  yup
    .string()
    .required('Vui lòng nhập Số điện thoại')
    .max(10, 'Số điện thoại tối đa 10 ký tự!')
    .matches(/^(84|0[3|5|7|8|9])[0-9]{8,9}$/, {
      message: 'Số điện thoại chưa đúng định dạng',
      excludeEmptyString: true,
    });

export const validateEmail = () =>
  yup
    .string()
    .required('Vui lòng nhập Email')
    .email('Email không đúng định dạng');

export const schemaCreateContact = yup.object({
  name: validateRequired('your name'),
  email: validateEmail(),
  subject: validateRequired('your subject'),
  message: validateRequired('your message'),
});

export const applyRecruit = yup.object({
  fullname: validateRequiredMsg('Vui lòng nhập Họ và tên'),
  email: validateEmail(),
  phoneNumber: validatePhone(),
  infoRecuitment: yup.string().nullable(),
});

export const validateConfirmPassword = (field = 'password') => {
  return (
    yup
      .string()
      .required(`Xác nhận mật khẩu không được để trống.`)
      .max(200, 'Mật khẩu tối đa 200 ký tự!')
      .min(6, 'Mật khẩu tối thiểu 6 ký tự!')
      // .matches(
      //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}/,
      //   'Mật khẩu phải có ký tự số, chữ hoa và chữ thường.'
      // )
      .oneOf([yup.ref(field), ''], 'Mật khẩu nhập lại không khớp')
  );
};

export const validateDifferentPassword = (field = 'password') => {
  return (
    yup
      .string()
      .required(`Mật khẩu không được để trống.`)
      .max(200, 'Mật khẩu tối đa 200 ký tự!')
      .min(6, 'Mật khẩu tối thiểu 6 ký tự!')
      // .matches(
      //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}/,
      //   'Mật khẩu phải có ký tự số, chữ hoa và chữ thường.'
      // )
      .notOneOf(
        [yup.ref(field), null],
        'Mật khẩu mới không được trùng với mật khẩu cũ'
      )
  );
};

export const registerPartern = yup.object({
  family_name: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(200, 'Tên tối đa 200 ký tự!')
    .min(4, 'Tên tối thiểu 4 ký tự!')
    .matches(
      /^[\p{L}\p{N}'\s]+$/u,
      'Họ và tên không được sử dụng các ký tự đặc biệt.'
    ),

  username: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(30, 'Tên đăng nhập quá dài!')
    .min(3, 'Tên đăng nhập tối thiểu 3 ký tự!')
    .matches(
      /^[a-z0-9]{2,31}$/,
      'Tên đăng nhập không nhập chữ hoa, dấu cách và ký tự đặc biệt'
    ),
  password: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(200, 'Mật khẩu tối đa 200 ký tự!')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự!'),
  // .matches(
  //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}/,
  //   'Mật khẩu phải có ký tự số, chữ hoa và chữ thường.'
  // ),
  passwordAgain: validateConfirmPassword('password'),
  birth_date: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(10, 'Ngày sinh tối đa 10 ký tự!'),
  email: yup
    .string()
    .max(40, 'Email tối đa 40 ký tự!')
    .required('Bắt buộc nhập thông tin trường này')
    .email('Email không đúng định dạng'),
  phone_number: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(10, 'Số điện thoại tối đa 10 ký tự!')
    // .min(10, "Số điện thoại tối thiểu 10 ký tự!")
    .matches(/^(84|0[3|5|7|8|9])[0-9]{8,9}$/, {
      message: 'Số điện thoại chưa đúng định dạng',
      excludeEmptyString: true,
    }),
  country_id: yup.string().required('Bắt buộc nhập thông tin trường này'),
  ethnic_group: yup.string(),
  address: yup.string(),
});

export const registerAccParent = yup.object({
  family_name: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(200, 'Tên tối đa 200 ký tự!')
    .min(4, 'Tên tối thiểu 4 ký tự!')
    .matches(
      /^[\p{L}\p{N}'\s]+$/u,
      'Họ và tên không được sử dụng các ký tự đặc biệt.'
    ),
  username: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(30, 'Tên đăng nhập quá dài!')
    .min(3, 'Tên đăng nhập tối thiểu 3 ký tự!')
    .matches(
      /^[a-z0-9]{2,31}$/,
      'Tên đăng nhập không nhập chữ hoa, dấu cách và ký tự đặc biệt'
    ),
  password: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(200, 'Mật khẩu tối đa 200 ký tự!')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự!'),
  // .matches(
  //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}/,
  //   'Mật khẩu phải có ký tự số, chữ hoa và chữ thường.'
  // ),
  passwordAgain: validateConfirmPassword('password'),
  // birth_date: yup
  //   .string()
  //   .required('Bắt buộc nhập thông tin trường này')
  //   .max(10, 'Ngày sinh tối đa 10 ký tự!'),
  email: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(40, 'Email tối đa 40 ký tự!')
    .email('Email không đúng định dạng'),
  phone_number: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(10, 'Số điện thoại tối đa 10 ký tự!')
    // .min(10, "Số điện thoại tối thiểu 10 ký tự!")
    .matches(/^(84|0[3|5|7|8|9])[0-9]{8,9}$/, {
      message: 'Số điện thoại chưa đúng định dạng',
      excludeEmptyString: true,
    }),
  // country_id: yup.string().required('Bắt buộc nhập thông tin trường này'),
  // ethnic_group: yup.string(),
  // province_id: yup.string(),
  // district_id: yup.string(),
  // school_id: yup.string(),
  // address: yup.string(),
  // grade_id: yup.string(),
  // class_id: yup.string(),
});

export const registerAcc = yup.object({
  family_name: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(200, 'Tên tối đa 200 ký tự!')
    .min(4, 'Tên tối thiểu 4 ký tự!')
    .matches(
      /^[\p{L}\p{N}'\s]+$/u,
      'Họ và tên không được sử dụng các ký tự đặc biệt.'
    ),
  username: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(30, 'Tên đăng nhập quá dài!')
    .min(3, 'Tên đăng nhập tối thiểu 3 ký tự!')
    .matches(
      /^[a-z0-9]{2,31}$/,
      'Tên đăng nhập không nhập chữ hoa, dấu cách và ký tự đặc biệt'
    ),
  password: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(200, 'Mật khẩu tối đa 200 ký tự!')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự!'),
  // .matches(
  //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}/,
  //   'Mật khẩu phải có ký tự số, chữ hoa và chữ thường.'
  // ),
  passwordAgain: validateConfirmPassword('password'),
  // birth_date: yup
  //   .string()
  //   .required('Bắt buộc nhập thông tin trường này')
  //   .max(10, 'Ngày sinh tối đa 10 ký tự!'),
  email: yup
    .string()
    .max(40, 'Email tối đa 40 ký tự!')
    .email('Email không đúng định dạng'),
  phone_number: yup
    .string()
    // .required('Bắt buộc nhập thông tin trường này')
    .max(10, 'Số điện thoại tối đa 10 ký tự!')
    // .min(10, "Số điện thoại tối thiểu 10 ký tự!")
    .matches(/^(84|0[3|5|7|8|9])[0-9]{8,9}$/, {
      message: 'Số điện thoại chưa đúng định dạng',
      excludeEmptyString: true,
    }),
  grade_id: yup.string().required('Bắt buộc nhập thông tin trường này'),
  // .matches(/^-?[a-zA-Z0-9\s]*$/, {
  //   message: 'Bắt buộc nhập thông tin trường này',
  // }),
  province_id: yup.string().required('Bắt buộc nhập thông tin trường này'),
  district_id: yup.string().required('Bắt buộc nhập thông tin trường này'),
  school_id: yup.string().required('Bắt buộc nhập thông tin trường này'),
  address: yup.string(),
  class_id: yup.string(),
});

export const inforPayment = yup.object({
  family_name: yup
    .string()
    .notRequired()
    // .required('Bắt buộc nhập thông tin trường này')
    .max(30, 'Tên tối đa 30 ký tự!')
    .matches(
      /^[\p{L}\p{N}'\s]+$/u,
      'Họ và tên không được sử dụng các ký tự đặc biệt.'
    ),

  email: yup
    .string()
    .notRequired()
    // .required('Bắt buộc nhập thông tin trường này')
    .max(40, 'Email tối đa 40 ký tự!')
    .email('Email không đúng định dạng'),
  phone_number: yup
    .string()
    .notRequired()
    // .required('Bắt buộc nhập thông tin trường này')
    .max(10, 'Số điện thoại tối đa 10 ký tự!')
    // .min(10, "Số điện thoại tối thiểu 10 ký tự!")
    .matches(/^(84|0[3|5|7|8|9])[0-9]{8,9}$/, {
      message: 'Số điện thoại chưa đúng định dạng',
      excludeEmptyString: true,
    }),
});

export const forgetPassword = yup.object({
  username: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(30, 'Tên đăng nhập quá dài!')
    .min(3, 'Tên đăng nhập tối thiểu 3 ký tự!'),
  // .matches(
  //   /^[a-z0-9]{2,31}$/,
  //   'Tên đăng nhập không nhập chữ hoa, dấu cách và ký tự đặc biệt'
  // ),
  email: yup
    .string()
    .max(40, 'Email tối đa 40 ký tự!')
    .email('Email không đúng định dạng')
    .required('Bắt buộc nhập thông tin trường này'),
  phone_number: yup
    .string()
    .max(10, 'Số điện thoại tối đa 10 ký tự!')
    .matches(/^(84|0[3|5|7|8|9])[0-9]{8,9}$/, {
      message: 'Số điện thoại chưa đúng định dạng',
      excludeEmptyString: true,
    }),
});

export const changePassword = yup.object({
  password: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(200, 'Mật khẩu tối đa 200 ký tự!')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự!'),
  // .matches(
  //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}/,
  //   'Mật khẩu phải có ký tự số, chữ hoa và chữ thường.'
  // ),
  new_password: validateDifferentPassword('password'),
  confirmNewPassword: validateConfirmPassword('new_password'),
});
export const requirePassword = yup.object({
  username: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(30, 'Tên đăng nhập quá dài!')
    .min(3, 'Tên đăng nhập tối thiểu 3 ký tự!'),
  // .matches(
  //   /^[a-z0-9]{2,31}$/,
  //   'Tên đăng nhập không nhập chữ hoa, dấu cách và ký tự đặc biệt'
  // ),
  user_type: yup.string().required('Bắt buộc nhập thông tin trường này'),
  username_require: yup.string().required('Bắt buộc nhập thông tin trường này'),
});

export const updateInfor = yup.object({
  fullname: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(200, 'Tên tối đa 200 ký tự!')
    .min(4, 'Tên tối thiểu 4 ký tự!')
    .matches(
      /^(?! )[\p{L}'\s]+$/u,
      'Họ và tên không được sử dụng số và các ký tự đặc biệt.'
    ),
  birth_date: yup
    .string()
    .required('Bắt buộc nhập thông tin trường này')
    .max(10, 'Ngày sinh tối đa 10 ký tự!'),
  // .matches(
  //   /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-\d{4}$/,
  //   'Thông tin không đúng định dạng'
  // ),
  email: yup
    .string()
    .max(40, 'Email tối đa 40 ký tự!')
    .email('Email không đúng định dạng'),
  phone_number: yup
    .string()
    // .required('Bắt buộc nhập thông tin trường này')
    .max(10, 'Số điện thoại tối đa 10 ký tự!')
    // .min(10, "Số điện thoại tối thiểu 10 ký tự!")
    .matches(/^(84|0[3|5|7|8|9])[0-9]{8,9}$/, {
      message: 'Số điện thoại chưa đúng định dạng',
      excludeEmptyString: true,
    }),
  country_id: yup.string(),
  ethnic_group: yup.string(),
  province_id: yup.string().required('Bắt buộc nhập thông tin trường này'),
  district_id: yup.string().required('Bắt buộc nhập thông tin trường này'),
  school_id: yup.string().required('Bắt buộc nhập thông tin trường này'),
  // address: yup.string(),
  grade_id: yup.string(),
  class_id: yup.string(),
});
