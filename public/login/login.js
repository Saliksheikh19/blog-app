
import{app,auth,signInWithEmailAndPassword} from '../firebaseconfig.js'

console.log(app)


 const LoginEmail=document.querySelector("#loginemail")
 const LoginPass=document.querySelector("#loginpass")
 const loginBtn=document.querySelector("#loginBn")
 const joinBtn=document.querySelector("#join")
const users = JSON.parse(localStorage.getItem('users')) || []

console.log(users)
loginBtn.addEventListener(`click`,LoginHandler)
function LoginHandler(){
    signInWithEmailAndPassword(auth,  LoginEmail.value,LoginPass.value )
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(`user<<<<<`, user)
    alert(`user is signing in`)
    window.location.href=`../dashboard/dashboard.html`
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`erroe>>>>msg` , errorMessage)
  });
    
    
    
    }

joinBtn.addEventListener(`click`,joinHandler)

function joinHandler(){
    window.location.href="../sigin/signin.html"
}
