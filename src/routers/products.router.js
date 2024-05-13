import express from 'express';
import product from '../schemas/product.schema.js';
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
  status: Joi.string()
    .valid('FOR_SALE', 'SOLD_OUT')
    .error(
      new Error(
        '상품 상태는 필수이며, [FOR_SALE,SOLD_OUT] 중 하나여야 합니다.',
      ),
    ),
});

const router = express.Router();

// 상품 생성
router.post('/products', async (req, res, next) => {
  const { status, ...createData } = req.body;
  const { error } = productSchema.validate(createData);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const data = await product.findOne({ name: createData.name });
    if (data) {
      return res.status(400).json({ message: '이미 등록 된 상품입니다.' });
    }
    const productCreate = await product.create(req.body);
    return res
      .status(201)
      .json({ message: '상품 생성에 성공했습니다', product: productCreate });
  } catch (err) {
    next(err);
    return res.status(500).json({
      message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.',
    });
  }
});

// 모든 상품 조회
router.get('/products', async (req, res, next) => {
  try {
    const data = await product
      .find()
      .select('-password')
      .sort({ createdAt: -1 })
      .exec();
    return res.status(200).json({ products: data });
  } catch (err) {
    next(err);
    return res.status(500).json({
      message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.',
    });
  }
});

// 상품 상세 조회
router.get('/products/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'id값을 입력해주세요' });

  try {
    const data = await product.findById(id).exec();
    if (!data)
      return res.status(404).json({ message: '해당 상품을 찾을 수 없습니다' });
    return res
      .status(200)
      .json({ message: '상품 상세 조회에 성공했습니다.', product: data });
  } catch (err) {
    next(err);
    return res
      .status(500)
      .json({
        message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.',
      });
  }
});

// 상품 수정
router.put('/products/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'id값을 입력해주세요' });

  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  try {
    const data = await product.findById(id).exec();
    if (!data)
      return res.status(404).json({ message: '해당 상품을 찾을 수 없습니다.' });
    if (data.password !== req.body.password)
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });

    const updatedProduct = await product.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();
    return res
      .status(200)
      .json({ message: '상품 수정에 성공했습니다.', product : updatedProduct });
  } catch (err) {
    next(err);
    return res
      .status(500)
      .json({
        message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.',
      });
  }
});

// 상품 삭제
router.delete('/products/:id', async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!id) return res.status(400).json({ message: 'id값을 입력해주세요' });
  if (!password) return res.status(400).json({ message: '비밀번호를 입력해주세요.' });

  try {
    const data = await product.findById(id).exec();
    if (!data) return res.status(404).json({ message: '상품이 없습니다' });
    if (data.password !== password) return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });

    const deletedProduct = await product.findByIdAndDelete(id);
    return res.status(200).json({ message: '상품 삭제가 완료되었습니다', product: deletedProduct });
  } catch (err) {
    next(err);
    return res.status(500).json({ message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.' });
  }
});


export default router;
