# Badminton online shop
Project React webapp group 1 FER201m FA23

## Cài đặt 
1. Mở folder trên máy bạn muốn lưu project, chuột phải vào khoảng trống chọn "Open in Terminal" và chạy dòng lệnh:
```bash
git clone https://github.com/Macbeth2k/FER201m-Group1.git 
```  
2. Mở project mới clone về ở VSCode, mở terminal và tiếp tục chạy:
```bash
npm install 
```

## Chạy ứng dụng
Để chạy ứng dụng chúng ta cần 2 bước:
1. Chạy Json-server 
2. Chạy React client server
**Lưu ý**: Json-server và ứng dụng React phải chạy ở port khác nhau

Ở terminal với đường dẫn của project, đầu tiên ta chạy Json-server: 
```bash
json-server --watch db.json --port 3004
```
Sau đó, bạn mở một terminal mới và chạy client server:
```bash
npm start 
```
Mở trình duyệt và ở [http://localhost:3000](http://localhost:3000) bạn sẽ thấy trang web đã hoạt động.

## Các đường dẫn
- Customer: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)
- Customer-agent: [http://localhost:3000/customer-agent](http://localhost:3000/customer-agent)
- Delivery-agent: [http://localhost:3000/delivery-agent](http://localhost:3000/delivery-agent)
- Owner: [http://localhost:3000/owner](http://localhost:3000/owner)

## Các thư viện sử dụng
| Library | Source |
| ------ | ------ |
| Create React App | [link](https://github.com/facebook/create-react-app) |
| React Router Dom | [link](https://reactrouter.com/en/main) |
| React Bootstrap | [link](https://react-bootstrap.netlify.app/) |
| Font Awesome | [link](https://fontawesome.com/v5/docs/web/use-with/react) |
| Json Server | [link](https://github.com/typicode/json-server)|
| Axious | [link](https://github.com/axios/axios) |
| Express | [link](https://expressjs.com/) |
| Socket io | [link](https://socket.io/docs/v4/tutorial/introduction) |
| MDBootstrap | [link](https://mdbootstrap.com/docs/react/) |
| React Icons | [link](https://github.com/react-icons/react-icons#readme) |

## Tài liệu
| Content | Source |
| ------ | ------ |
| React | [link](https://react.dev/) |
| HTML,CSS,JS | [link](https://developer.mozilla.org/en-US/) |


## Phụ trách
- Customer: Tiến, Việt
- Admin: Thiện
- Customer-agent: Đức Anh
- Delivery-agent: Cương
- Owner: Nhật, Cương

## Các bước sử dụng github
1. git pull (kéo code mới về máy)
2. Tiến hành code
3. git add . (lưu toàn bộ thay đổi file code vào stage)
4. git commit -m "first commit" (tạo commit local)
5. git pull (cập nhật lại code một lần nữa, nếu có thay đổi thì sửa lại cho chạy được, sau đó làm lại từ bước 2)
6. git push 