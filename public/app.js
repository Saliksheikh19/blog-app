import {auth, onAuthStateChanged,collection,getDoc,addDoc,getDocs,doc,db, 
    updateDoc,} from './firebaseconfig.js'

    getPosts()

let currentLoggedInUser;
console.log(onAuthStateChanged)
let postIdGlobal;



// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/auth.user
//         const uid = user.uid;
//         // console.log(uid)
//         getUserData(uid)
//         getPosts(uid)
        
//         currentLoggedInUser = uid
//         console.log(currentLoggedInUser)
//         // ...
//     } else {
//         // User is signed out
//         // ...
//         window.location.href = '../index.html'
//         console(`skmfrsnrfn;`)
//     }
// });


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




// emailAddress.innerText = isLoggedInUser.email

const postInputBox = document.getElementById("postInputBox")
const postTitleBox = document.getElementById("postTitleBox")

const pfp2 = document.getElementById("profilePfp2")

const fullname = document.getElementById("username")
console.log(fullname.textContent)
const logoutbtn = document.getElementById("logout")

const showbtn = document.getElementById("showBtn")


console.log(pfp2)

console.log(logoutbtn)

















               
            
       







 




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




   

    
    var postdata = document.createElement('div')
    postdata.setAttribute('class', 'post my-5 bg-light rounded')

 var postmaterial = ` <div class="authorDetails d-flex ">
 <img src=${authorDetails.profilePicture ||' ../assets/png-transparent-login-computer-icons-avatar-icon-monochrome-black-silhouette.png'} alt="" class="profilePicture">
    <div>
        <h4 style=" padding-top:14px;padding-left:6px; color:black;">${postTitle}</h4>
        <h5 style="font-size: 12px; padding-top:2px;padding-left:4px; color:black;">${authorDetails?.Name }-${date}</h4>
        
    </div>
 
 
</div>
<div class="postData">
    <h4  style="color:black"; font-weight:bold; >
        ${postContent}
    </h4>
     
 

    
</div>`


postdata.innerHTML=postmaterial



postArea.append(postdata)
 console.log(postContent)



    
   
   


})



}





const editbtn = document.querySelector('#editprofile')



function editProfilehandler(){
    window.location.href = '../editprofile/edit.html'
    console.log(editbtn)
}

function editPostHandler(postId) {
    console.log(postId, "edit button working properly")
   
    postIdGlobal = postId;
    
    
    showbtn.innerHTML = "edit"
  
    showbtn.removeEventListener('click', uploadHandler)
    showbtn.addEventListener('click',updateHandler)
  
}
window.editPostHandler = editPostHandler
async function updateHandler(){
   
            
                try {
                    const washingtonRef = doc(db, "posts", postIdGlobal);
                    const response = await updateDoc(washingtonRef, {
                        postTitle:postTitleBox.value,
                        postContent: postInputBox.value,
                        authorId: currentLoggedInUser,
                        
                    });
                    
                  alert(`post edited sucessfully`)
                  getPosts()
                  showbtn.removeEventListener('click', updateHandler)
                  showbtn.addEventListener('click',uploadHandler)
                  postInputBox.value=""
                  postTitleBox.value=""
                  showbtn.innerHTML="publish your blog"
                   
                } catch (e) {
                    console.error("Error adding document: ", e);
                }



        
}
