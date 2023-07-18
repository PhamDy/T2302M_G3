var registerApp = angular.module('registerApp', []);

registerApp.controller('registerCtrl', function($scope) {

$scope.passwordsMatch = true; // Initialize variable to store password comparison results

$scope.checkPasswordMatch = function() {
  $scope.passwordsMatch = $scope.regForm.password.$viewValue === $scope.regForm.confirmPassword.$viewValue;
};
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([]));
}
var users = JSON.parse(localStorage.getItem('users'));

// Kiểm tra xem tài khoản admin đã tồn tại trong danh sách người dùng hay chưa
var adminExists = users.some(function(user) {
  return user.username === 'admin';
});

// Nếu tài khoản admin chưa tồn tại, thêm nó vào danh sách người dùng
if (!adminExists) {
  var admin = {
    username: 'admin',
    password: '123456',
  };
  users.push(admin);
  localStorage.setItem('users', JSON.stringify(users));
}

// The function stores registration information to local storage
$scope.saveUserInfoToLocalStorage = function(username, email, password) {
  var users = JSON.parse(localStorage.getItem("users"));

   if (!users) { // Kiểm tra nếu users là null hoặc không tồn tại
    users = []; // Khởi tạo users như một mảng rỗng
  }
  users.push({ username: username, email: email, password: password });
  localStorage.setItem("users", JSON.stringify(users));
};

//checks if the username already exists or not
$scope.checkIfUsernameExists = function(username) {
  var users = JSON.parse(localStorage.getItem("users"));
  var usernameExists = false;

  if (users) { // Kiểm tra giá trị users trước khi sử dụng forEach
    users.forEach(function(user) {
      if (user.username === username) {
        usernameExists = true;
        return; // dừng vòng lặp nếu username đã tồn tại
      }
    });
  }

  return usernameExists;
};



// when user click register
$scope.register = function() {
  // check username is exist or not
  if ($scope.checkIfUsernameExists($scope.username)) {
    // Username already exists, so registration information cannot be stored in local storage
    alert('username already exist !');
  } else {
    //Username does not exist yet, so registration information can be stored in local storage
    $scope.saveUserInfoToLocalStorage($scope.username, $scope.email, $scope.password);
    alert('Register Success !');
    regForm.reset()
  }
};
// login app
 $scope.login = function(e) {
      e.preventDefault();

      var users = JSON.parse(localStorage.getItem("users"));
      var username = $scope.username;
      var password = $scope.password;
      var validLogin = false;

      for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          validLogin = true;
          break; // Dừng vòng lặp khi tìm thấy đăng nhập hợp lệ
        }
      }

      if (validLogin) {
        if (username === 'admin' && password === '123456') {
          // Đăng nhập thành công với tài khoản admin
          alert('Login Successful as Admin!');
          $scope.logForm.$setPristine(); // Đặt lại form về trạng thái ban đầu
          location.href = '/T2302M_G3/admin/admin.html'; // Chuyển hướng đến trang "admin.html"
        } else {
          // Đăng nhập thành công với các tài khoản khác
          alert('Login Successful!');
          $scope.logForm.$setPristine(); // Đặt lại form về trạng thái ban đầu
          location.href = '/T2302M_G3/index.html'; // Chuyển hướng đến trang "1.html"
        }
      } else {
        alert('Invalid username or password!');
      }
      


    };
    
});









// switch between registration and login
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

registerLink.addEventListener('click', function (e) {
  e.preventDefault();
  registerForm.style.display = 'block';
  loginForm.style.display = 'none';
});

loginLink.addEventListener('click', function (e) {
  e.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});
