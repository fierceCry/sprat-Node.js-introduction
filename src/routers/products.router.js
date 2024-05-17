import express from 'express';
import product from '../schemas/product.schema.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { catchAsync } from '../middlewarmies/error-handler.middleware.js';
import {
  productSchema,
  productUpdateSchema,
  passwordSchema,
} from '../middlewarmies/validation.middleware.js';

dotenv.config();
const router = express.Router();

// 상품 생성
router.post('/products', catchAsync(async (req, res) => {
    const createData = req.body;
    const { error } = productSchema.validate(createData);
    if (error) return res.status(400).json({ message: error.message });
      const data = await product.findOne({ name: createData.name });
      if (data) {
        return res.status(409).json({ message: '이미 등록된 상품입니다.' });
      }

      const hashedPassword = await bcrypt.hash(
        createData.password,
        parseInt(process.env.SALT_ROUNDS),
      );

      const productCreate = await product.create({
        name: createData.name,
        description: createData.description,
        manager: createData.manager,
        password: hashedPassword,
      });

      const productResponse = await product
        .findById(productCreate._id)
        .select('-password')
        .exec();

      return res.status(201).json({
        message: '상품 생성에 성공했습니다',
        product: productResponse,
      });}
));

// 모든 상품 조회
router.get('/products', catchAsync(async (req, res) => {
  const data = await product
  .find()
  .select('-password') 
    .sort({ createdAt: -1 })
    .exec();
  return res.status(200).json({ products: data });
}));


// 상품 상세 조회
router.get('/products/:id', catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'id값을 입력해주세요' });

      const data = await product.findById(id).select('-password').exec();
      if (!data)
        return res
          .status(404)
          .json({ message: '해당 상품을 찾을 수 없습니다' });

      return res
        .status(200)
        .json({ message: '상품 상세 조회에 성공했습니다.', product: data });
    } catch {
      return res.status(500).json({
        message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.',
      });
    }
  }),
);

// 상품 수정
router.patch('/products/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name, description, manager, status, password } = req.body;
    if (!id) return res.status(400).json({ message: 'id값을 입력해주세요' });

    const updateData = { name, description, manager, status, password };

    const { error } = productUpdateSchema.validate(updateData);
    if (error) return res.status(400).json({ message: error.message });

      const data = await product.findById(id).exec();
      if (!data)
        return res
          .status(404)
          .json({ message: '해당 상품을 찾을 수 없습니다.' });

      const userPassword = await bcrypt.compare(
        password,
        data.password,
      );
      if (!userPassword)
        return res
          .status(401)
          .json({ message: '비밀번호가 일치하지 않습니다.' });

          const updatedProduct = await product
          .findOneAndUpdate(
            { _id: id },
            {
              name: updateData.name,
              description: updateData.description,
              manager: updateData.manager,
              status: updateData.status,
            },
            {
              new: true,
              select: '-password',
            },
          )
          .exec();
        

      return res.status(200).json({
        message: '상품 수정에 성공했습니다.',
        product: updatedProduct,
      })}
));

// 상품 삭제
router.delete('/products/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (!id) return res.status(400).json({ message: 'id값을 입력해주세요' });

    const { error } = passwordSchema.validate({ password });
    if (error) return res.status(400).json({ message: error.message });

      const data = await product.findById(id).exec();
      if (!data) return res.status(404).json({ message: '상품이 없습니다' });
      const userPassword = await bcrypt.compare(password, data.password);
      if (!userPassword)
        return res
          .status(401)
          .json({ message: '비밀번호가 일치하지 않습니다.' });
      const deletedProduct = await product
        .findByIdAndDelete(id)
        .select('-password');

      return res.status(200).json({
        message: '상품 삭제가 완료되었습니다',
        product: deletedProduct,
      });
    }
  ),
);

export default router;
