const baseConfig = {
  browser: 'chrome',
  browserOptions: {
    headless: false,
    args: [
      // Tắt sandbox mode - cần thiết khi chạy trong Docker hoặc môi trường restricted
      // ⚠️ Lưu ý: Giảm bảo mật, chỉ dùng trong môi trường tin cậy
      '--no-sandbox',

      // Tắt setuid sandbox - thường dùng trên Linux khi không có quyền root
      '--disable-setuid-sandbox',

      // Tắt /dev/shm usage - tránh lỗi out of memory trên Linux/Docker
      // Sử dụng /tmp thay vì /dev/shm để lưu shared memory
      '--disable-dev-shm-usage',
    ],
  },
};

export default baseConfig;
