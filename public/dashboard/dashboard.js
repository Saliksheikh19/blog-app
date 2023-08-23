import {auth, onAuthStateChanged,collection,getDoc,addDoc,getDocs,doc,db, signOut,ref,storage , uploadBytesResumable,   getDownloadURL, deleteDoc,
    updateDoc, } from '../firebaseconfig.js'

  

let currentLoggedInUser;
console.log(onAuthStateChanged)
let postIdGlobal;
getPosts()


onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // console.log(uid)
        getUserData(uid)
       
        
        currentLoggedInUser = uid
        console.log(currentLoggedInUser)
        // ...
    } else {
        // User is signed out
        // ...
        window.location.href = '../index.html'
        console(`skmfrsnrfn;`)
    }
});


async function getUserData(uid) {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            const {  Name,  email, profilePicture,phNum,bio} = docSnap.data()
            console.log(profilePicture, "==>>profilePicture")
            
            // emailAddress.textContent = email,
             fullname.textContent = Name
            //  phonenum.textContent = phNum,
            //  pfp.src = profilePicture ||' ../assets/png-transparent-login-computer-icons-avatar-icon-monochrome-black-silhouette.png' ,
            //  pfp2.src = profilePicture ||' ../assets/png-transparent-login-computer-icons-avatar-icon-monochrome-black-silhouette.png' ,
            //  biodata.textContent = bio
            // dashBoardpp.src = profilePicture
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error, "==>>error in get User Data")
    }
}


const emailAddress = document.getElementById("emailAddress")

// emailAddress.innerText = isLoggedInUser.email

const postInputBox = document.getElementById("postInputBox")
const postTitleBox = document.getElementById("postTitleBox")
const biodata = document.getElementById("bio")
const phonenum = document.getElementById("phoneNum")
const pfp = document.getElementById("profilePfp")
const pfp2 = document.getElementById("profilePfp2")
const postpic = document.getElementById("post-image")
const fullname = document.getElementById("username")
console.log(fullname.textContent)
const logoutbtn = document.getElementById("logout")
const postbtn = document.getElementById("postBtn")
const showbtn = document.getElementById("showBtn")
const closebtn = document.getElementById("closeBtn")
const posteditbtn = document.getElementById("edit")
const uploadimagebtn = document.getElementById("uploadimg")

console.log(pfp2)

console.log(logoutbtn)

logoutbtn.addEventListener('click', LogOutHandler)
showbtn.addEventListener('click', uploadHandler)


function LogOutHandler(){
    signOut(auth).then(() => {
      // Sign-out successful.
      window.location.href = '../login/login.html'
      console.log(`dnksejoclco>>>>>>>`)
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
    


}











async function uploadHandler() {
   
    if(postTitleBox.value == `` || postInputBox.value == ``){
        alert("insanoo ki trhan feilds puri kr")
    }else if((postTitleBox.value.length < 5 ||postTitleBox.value.length > 50) || (postInputBox.value.length < 100 || postInputBox.value.length > 3000)){
        alert(`title lenght should be between 5 - 50 character and blog lenght should be between 100 - 3000 character`)
    }
    
    else{
        const response = await addDoc(collection(db, "posts"), {
            postTitle: postTitleBox.value,
            postContent: postInputBox.value,
            authorId: currentLoggedInUser,
           
        });
        postTitleBox.value = ""
        postInputBox.value= ""
        console.log('upload fumction chl rha haii')                  
       getPosts()
       
    }



  
}
            
                 
               
              
                
console.log(postInputBox.value)



               
            
       







 




async function getAuthorData(authorUid) {
    console.log(authorUid, "==>>authorUid")


    const docRef = doc(db, "users", authorUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
      
        console.log("No such document!");
    }
}







   


async function getPosts(){
    const date = new Date()
   

    const postArea = document.getElementById("postAreaId")
    
      postArea.innerHTML = ''
      
      
        
       
     
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach(async (doc) => {
        let postId = doc.id
     
        const { authorId, postContent , postTitle  } = doc.data()


        const authorDetails = await getAuthorData(authorId)

       console.log(authorDetails)

if(authorId === currentLoggedInUser){


   

    
    var postdata = document.createElement('div')
    postdata.setAttribute('class', 'post my-5  rounded ')

 var postmaterial = `         
                  
 <div class="authorDetails d-flex ">

     <img src=${authorDetails.profilePicture ||' ../assets/png-transparent-login-computer-icons-avatar-icon-monochrome-black-silhouette.png'} class="profilePicture">
     <div>
     <h2 style=" padding-top:14px;padding-left:6px; color:#212529; font-size: 24px; font-style: normal; font-weight: 600; line-height: normal;">${postTitle}</h4>
     <h5 style="font-size: 12px; padding-top:2px;padding-left:4px; color:black;">${authorDetails?.Name }-${date}</h4>
     </div>
     
     



 </div>
 <div class="postData" id="post-pic" >
 <p id="post-text" class="mt-2 text-break" style="font-size:16px; font-style:normal;padding:10px; color:#6C757D;font-weight:600;">${postContent}</p>
     <button style="border:none; background:transparent;color:#7749F8" onclick="editPostHandler('${postId}')" >
     edit
     </button>
     <button style="border:none; background:transparent; color:#7749F8;"   onclick="deletePostHandler('${postId}')" >
     delete
     </button>
 </div>
  `



postdata.innerHTML=postmaterial



postArea.append(postdata)
 console.log(postContent)
 postInputBox.value=""
 postTitleBox.value=""
 console.log("get post chl rha haiiii")
}

    
   
   


})



}









// function editProfilehandler(){
//     window.location.href = "../editprofile/editprofile.html"
//     console.log(editbtn)
// }

function editPostHandler(postId) {
    console.log(postId, "edit button working properly")
   
    postIdGlobal = postId;
    
    
    showbtn.innerHTML = "edit"
  
    showbtn.removeEventListener('click', uploadHandler)
    showbtn.addEventListener('click',updateHandler)
  
}
window.editPostHandler = editPostHandler
async function updateHandler(){
    if(postTitleBox.value == `` || postInputBox.value == ``){
        alert("insanoo ki trhan feilds puri kr")
    }else if((postTitleBox.value.length < 5 ||postTitleBox.value.length > 50) || (postInputBox.value.length < 100 || postInputBox.value.length > 3000)){
        alert(`title lenght should be between 5 - 50 character and blog lenght should be between 100 - 3000 character`)
    }
    
    else{
            
                try {
                    const washingtonRef = doc(db, "posts", postIdGlobal);
                    const response = await updateDoc(washingtonRef, {
                        postTitle:postTitleBox.value,
                        postContent: postInputBox.value,
                        authorId: currentLoggedInUser,
                        
                    });
                    
                  alert(`post edited sucessfully`)
                
                  showbtn.removeEventListener('click', updateHandler)
               
                  postInputBox.value=""
                  postTitleBox.value=""
                  showbtn.innerHTML="publish blog"
                  showbtn.addEventListener('click',uploadHandler)
                  getPosts()
                   
                } catch (e) {
                    console.error("Error adding document: ", e);
                }

 }

        
}
window.deletePostHandler = deletePostHandler

async function deletePostHandler(postId) {
    console.log(postId, "delete button working properly")

    await deleteDoc(doc(db, "posts", postId));
    alert("Your post deleted successfully");
    getPosts()
 
}