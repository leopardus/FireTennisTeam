<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router"; // import router
const email = ref("");
const password = ref("");
const router = useRouter(); // get a reference to our vue router
const signIn = () => {
  // we also renamed this method
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value) // THIS LINE CHANGED
    .then((data) => {
      console.log("Successfully logged in!");
      router.push("/feed"); // redirect to the feed
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
<template>
  <h1>FireTennis Team</h1>
  <br/>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button class="button" @click="signIn">Login</button></p>
</template>


<style scoped>
input {
    font-size: 15px;
    width: 80%;
    max-width: 256px;
    height: 30px;
    padding: 3px 3px 3px 3px;
    background-color: #ffffff !important;
    border: 1px solid #e9e9e9;
}

.button {
    font-size: 15px;
    border: 1px solid #e9e9e9;
    width: 80%;
    max-width: 256px;
    background-color: #f0f0f0 !important;
    padding: 3px 3px 3px 3px;
    height: 30px;
    box-sizing: content-box;
}

</style>