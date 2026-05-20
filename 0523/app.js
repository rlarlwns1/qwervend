import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUJ0dcDHhXDYlu1IraDaNXjQkl90mj6OY",
  authDomain: "space-f6781.firebaseapp.com",
  projectId: "space-f6781",
  storageBucket: "space-f6781.firebasestorage.app",
  messagingSenderId: "1042149824565",
  appId: "1:1042149824565:web:56b403c8e0e1c6b7eb397c",
  measurementId: "G-0JXD1HB7MW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// HTML 구역(폼) 가져오기
const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');

// HTML 입력 요소 & 버튼 가져오기
const loginUsernameInput = document.getElementById('loginUsername');
const loginPasswordInput = document.getElementById('loginPassword');
const btnLogin = document.getElementById('btnLogin');

const regUsernameInput = document.getElementById('regUsername');
const regNicknameInput = document.getElementById('regNickname');
const regPasswordInput = document.getElementById('regPassword');
const btnSignUp = document.getElementById('btnSignUp');

// 화면 전환용 이벤트 버튼들
const goSignUpLink = document.getElementById('goSignUp');
const btnCancel = document.getElementById('btnCancel');


// 화면 전환 함수 (로그인 ↔ 회원가입)
function showLoginForm() {
    signUpForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    regUsernameInput.value = "";
    regNicknameInput.value = "";
    regPasswordInput.value = "";
}

function showSignUpForm() {
    loginForm.classList.add('hidden');
    signUpForm.classList.remove('hidden');
    loginUsernameInput.value = "";
    loginPasswordInput.value = "";
}

goSignUpLink.addEventListener('click', showSignUpForm);
btnCancel.addEventListener('click', showLoginForm);


// 1. 회원가입 기능 수행
btnSignUp.addEventListener('click', () => {
    const username = regUsernameInput.value.trim();
    const nickname = regNicknameInput.value.trim(); // 유저가 입력한 이름 (예: 유기준)
    const password = regPasswordInput.value;

    if(!username || !nickname || !password) {
        alert("모든 빈칸을 채워주세요!");
        return;
    }

    const fakeEmail = `${username}@space.com`;

    createUserWithEmailAndPassword(auth, fakeEmail, password)
        .then((userCredential) => {
            // 💡 문서의 고유 ID(uid) 대신, 유저가 입력한 'nickname(이름)'을 문서명으로 지정합니다.
            setDoc(doc(db, "users", nickname), {
                username: username,     // 아이디 저장
                password: password      // 비밀번호 저장
            }).then(() => {
                alert(`${nickname}님, 회원가입이 완료되었습니다!`);
                showLoginForm();
            });
        })
        .catch((error) => {
            alert("회원가입 실패: " + error.message);
        });
});


// 2. 로그인 기능 수행
btnLogin.addEventListener('click', () => {
    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value;

    if(!username || !password) {
        alert("아이디와 비밀번호를 입력해주세요!");
        return;
    }

    const fakeEmail = `${username}@space.com`;

    signInWithEmailAndPassword(auth, fakeEmail, password)
        .then((userCredential) => {
            alert("로그인 성공!");
            window.location.href = "main.html";
        })
        .catch((error) => {
            alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
        });
});