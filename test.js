const fs = require('fs');
const path = require('path');

// Đường dẫn tới thư mục "storage" và "public"
const storagePath = path.join(__dirname, 'storage');
const publicStoragePath = path.join(__dirname, 'public', 'storage');

// Kiểm tra xem symbolic link đã tồn tại hay không
const isSymLinkExists = fs.existsSync(publicStoragePath) && fs.lstatSync(publicStoragePath).isSymbolicLink();

if (!isSymLinkExists) {
  // Tạo symbolic link từ "public/storage" đến "storage"
  fs.symlink(storagePath, publicStoragePath, 'junction', (err) => {
    if (err) {
      console.error('Không thể tạo symbolic link:', err);
      return;
    }
    console.log('Symbolic link đã được tạo thành công!');
  });
} else {
  console.log('Symbolic link đã tồn tại!');
}