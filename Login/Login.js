// register form
const form = document.getElementById('register-form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// Show input error message
function showError(input, message) {
	const formControl = input.parentElement
	formControl.className = 'form-control error'
	const small = formControl.querySelector('small')
	small.innerText = message
}

// Show success outline
function showSuccess(input,message) {
	const formControl = input.parentElement
	formControl.className = 'form-control success'
    const small = formControl.querySelector('small')
	small.innerText = message
}

// Check email is valid
// kiểu nó phải đúng @gmail ý
function checkEmail(input) {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(input.value.trim())) {
		showSuccess(input,'')
	} else {
		showError(input, 'Email is not valid')
	}
}
// get field input name
  function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }
// check required
function checkRequired(inputArr) {
	let isRequired = false;
	inputArr.forEach(function (input) {
	  if (input.value.trim() === '') {
		showError(input, `${getFieldName(input)} is required`);
		isRequired = true;
	  } else {
		showSuccess(input,'');
	  }
	});
  
	return isRequired;
  }

  

// Check input length
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		)
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
		)
	} else {
		showSuccess(input,'')
	}
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
	if (input1.value !== input2.value) {
		showError(input2, 'Passwords do not match')
	}
}
//  add account
function registerUser(username, email, password) {
	const user = {
	  username,
	  email,
	  password
	};
	
	// Kiểm tra xem đã có dữ liệu trong local storage hay chưa
	let registeredUsers = localStorage.getItem('registeredUsers');
	if (!registeredUsers) {
	  // Nếu chưa có dữ liệu, tạo một mảng mới
	  registeredUsers = [];
	} else {
	  // Nếu đã có dữ liệu, phân tích cú pháp dữ liệu JSON
	  registeredUsers = JSON.parse(registeredUsers);
	}
	
	// Thêm tài khoản mới vào mảng
	registeredUsers.push(user);
	
	// Lưu trữ mảng vào local storage
	localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }
  

// Event listeners
form.addEventListener('submit', function (e) {
	e.preventDefault()

	if (!checkRequired([username, email, password, password2])) {
		checkLength(username, 3, 25)
		checkLength(password, 6, 25)
		checkEmail(email)
		checkPasswordsMatch(password, password2)
	}
	alert('register success!')
    registerUser(username.value, email.value, password.value);
	
});



// login form
const login_Form = document.getElementById('login-form');
const user_Name = document.getElementById('user-name');
const user_Password = document.getElementById('user-password');
// check account
function loginUser(username, password) {
	const storedUsers = JSON.parse(localStorage.getItem('registeredUsers'));
  
	if (storedUsers) {
	  const foundUser = storedUsers.find(user => user.username === username && user.password === password);
	  if (foundUser) {
		showSuccess(user_Password, 'Login Success ! you can back to home !');
	  } else {
		showError(user_Password, 'User Name or Password is incorrect !');
	  }
	}
  }
  
// Event listeners
login_Form.addEventListener('submit',function(e){
	e.preventDefault();

	loginUser(user_Name.value,user_Password.value);
})
  
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

// Xem danh sách các tài khoản đã lưu
// function showRegisteredUsers() {
// 	const registeredUsers = localStorage.getItem('registeredUsers');
// 	if (registeredUsers) {
// 	  const users = JSON.parse(registeredUsers);
// 	  console.log('Danh sách các tài khoản đã đăng ký:');
// 	  users.forEach((user, index) => {
// 		console.log(`Tài khoản ${index + 1}:`);
// 		console.log(`Username: ${user.username}`);
// 		console.log(`Email: ${user.email}`);
// 		console.log(`Password: ${user.password}`);
// 		console.log('---------------------');
// 	  });
// 	} else {
// 	  console.log('Chưa có tài khoản nào được đăng ký');
// 	}
//   }
  
