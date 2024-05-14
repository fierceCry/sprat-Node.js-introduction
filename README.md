# 프로젝트 소개
이 프로젝트는 상품의 생성, 조회, 수정, 삭제를 관리하는 RESTful API입니다. Express.js와 MongoDB를 사용하여 구현되었습니다. Joi 라이브러리를 통해 요청 데이터의 유효성 검사도 수행합니다.

## 시작하기

### 필요조건
- Node.js 14 이상
- MongoDB 4.0 이상

### 설치 방법
- `git clone https://github.com/your-username/product-api.git`
- `npm install`
- mongodb 경로 설정: `MONGODB=mongodb://localhost:27017/product-api`
- `npm start`

## API 문서

### 1. 상품 생성
**요청:** `POST /products`  
**요청 본문:**  
```json
{
  "name": "Product Name",
  "description": "Product Description",
  "manager": "Manager Name",
  "password": "password123",
  "status": "FOR_SALE"
}
```
**응답 예시:**
```json
{
  "message": "상품 생성에 성공했습니다",
  "product": {
  "name": "Product Name",
  "description": "Product Description",
  "manager": "Manager Name",
  "password": "password123",
  "status": "FOR_SALE",
  "_id": "1",
  "createdAt": "2024-05-13T12:00:25.491Z",
  "updatedAt": "2024-05-13T12:00:25.491Z"
    }
}
```

### 2. 상품 전체 조회
**요청:** `GET /products`  
**응답 예시:**
```json
{
  "product": {
  "name": "Product Name",
  "description": "Product Description",
  "manager": "Manager Name",
  "status": "FOR_SALE",
  "_id": "1",
  "createdAt": "2024-05-13T12:00:25.491Z",
  "updatedAt": "2024-05-13T12:00:25.491Z"
  }
}
```

### 3. 상품 상세 조회
**요청:** `GET /products/:id`  
**요청 본문:**  
```json
{
 "id": "1"
}
```
**응답 예시:**
```json
{
  "message": "상품 상세 조회에 성공했습니다.",
  "product": {
  "name": "Product Name",
  "description": "Product Description",
  "manager": "Manager Name",
  "status": "FOR_SALE",
  "_id": "1",
  "createdAt": "2024-05-13T12:00:25.491Z",
  "updatedAt": "2024-05-13T12:00:25.491Z"
    }
}
```
### 3. 상품 수정
**요청:** `PATCH /products/:id`  
**요청 본문:**  
```json
{
 "id": "1",
  "password": "password123"
}
```
**응답 예시:**
```json
{
  "message": "상품 수정에 성공했습니다.",
  "product": {
  "name": "Product Name",
  "description": "Product Description",
  "manager": "Manager Name",
  "status": "FOR_SALE",
  "_id": "1",
  "createdAt": "2024-05-13T12:00:25.491Z",
  "updatedAt": "2024-05-13T12:00:25.491Z"
    }
}
```

### 3. 상품 상세 조회
**요청:** `DELETE /products/:id`  
**요청 본문:**  
```json
{
 "id": "1",
  "password": "password123"
}
```
**응답 예시:**
```json
{
  "message": "상품 삭제에 성공했습니다.",
  "product": {
  "name": "Product Name",
  "description": "Product Description",
  "manager": "Manager Name",
  "status": "FOR_SALE",
  "_id": "1",
  "createdAt": "2024-05-13T12:00:25.491Z",
  "updatedAt": "2024-05-13T12:00:25.491Z"
    }
}
```