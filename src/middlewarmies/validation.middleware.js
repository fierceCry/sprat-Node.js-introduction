import Joi from 'joi';

// 상품생성 joi
const productSchema = Joi.object({
  name: Joi.string().required().error(new Error('상품 이름을 입력해주세요.')),
  description: Joi.string()
    .required()
    .error(new Error('상품 설명을 입력해주세요.')),
  manager: Joi.string()
    .required()
    .error(new Error('관리자 이름을 입력해주세요.')),
  password: Joi.string()
    .required()
    .error(new Error('비밀번호를 입력해주세요.')),
});

//상품 수정 joi
const productUpdateSchema = Joi.object({
  name: Joi.string().required().error(new Error('상품 이름을 입력해주세요.')),
  description: Joi.string()
    .required()
    .error(new Error('상품 설명을 입력해주세요.')),
  manager: Joi.string()
    .required()
    .error(new Error('관리자 이름을 입력해주세요.')),
  password: Joi.string()
    .required()
    .error(new Error('비밀번호를 입력해주세요.')),
  status: Joi.string()
    .required()
    .valid('FOR_SALE', 'SOLD_OUT')
    .error(
      new Error(
        '상품 상태는 필수이며, [FOR_SALE,SOLD_OUT] 중 하나여야 합니다.',
      ),
    ),
});

// 패스워드 joi
const passwordSchema = Joi.object({
  password: Joi.string()
    .required()
    .error(new Error('비밀번호를 입력해주세요.')),
});

export { productSchema, productUpdateSchema, passwordSchema };
