import{app,  auth, createUserWithEmailAndPassword,  setDoc,doc,db
} from '../firebaseconfig.js'

console.log(app)
//  show = ()=>{
//     const shows = document.querySelector("#signupwwwww")

//     shows.classList.add("show")
//     shows.classList.remove("remove")
 
// }

// function closeFunc(){
//     const shows = document.querySelector("#signupwwwww")
//     shows.classList.add("remove") 
// }

// let date=document.querySelector("#date")
// let month=document.querySelector("#month")
// let year=document.querySelector("#year")
// let gender;
// console.log(date.value)

const Email = document.querySelector("#email");
const password = document.querySelector("#pass");
const username=document.querySelector("#username")
const Fullname=document.querySelector("#fullname")
const SignupBtn=document.querySelector(`#signUp`)
const backBtn=document.querySelector(`#backtologin`)


// const users = JSON.parse(localStorage.getItem('users')) || []

// console.log(users)

// function LoginHandler(){
 
//         console.log(LoginEmail.value)
//         console.log(LoginPass.value)
 
//         if(!LoginEmail.value || !LoginPass.value) return alert("Please write email and password to continue")
 
//         const userFound = users.filter((user) => {
//             console.log("user email in userFound filter", user.email)
//             return user.email === LoginEmail.value
//         })
 
//         console.log(userFound, "MILGYAA")
 
//         if(!userFound.length) return alert("This user is not registered, kindly create an account first")
 
 
//         console.log(LoginPass.value, " login password of input")
//         console.log(userFound.password, "user password from local storage")
 
//         if(userFound[0].password == LoginPass.value) {
//             alert("user is logging in")
         
//             localStorage.setItem('isLoggedInUser', JSON.stringify(userFound[0]))
 
 
//             window.location.href="./main/main.html";
 
 
//         } else {
//             alert("password is incorrect")
//         }
//     }


 SignupBtn.addEventListener(`click`,SignUp)



async function SignUp(){
 try {
     const response = await createUserWithEmailAndPassword(auth, Email.value, password.value)

     console.log(response, "==>>response")

     if (response.user) {
         addUserHandler(response.user.uid)
     
     }
 } catch (error) {
     console.log(error)
 }


 

}


backBtn.addEventListener(`click`,BackHandler)


function BackHandler(){
 window.location.href="../login/login.html"
}

async function addUserHandler(uid) {
 console.log(uid)
 try {
     const response = await setDoc(doc(db, "users", uid), {
         Name: Fullname.value,
         userName:username.value,
         email: Email.value,
        
     });
     alert(`USER REGISTERED SUCCESFUL`)
     Fullname.value = ""
     username.value = ""
     Email.value = ""
     window.location.href="../login/login.html"

  
 } catch (e) {
     console.error("Error adding document: ", e);
 }
}