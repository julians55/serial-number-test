<template :key="msg">
  <div class="hero is-primary is-fullheight is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
         <h1 class = "title has-text-warning">{{msg}}</h1>
         <h1 class = "title has-text-danger">{{msgq}}</h1>
         <v-typical
          class="blink"
          :steps="['5', 1000, '4', 1000, '3', 1000, '2', 1000, '1', 300, 'Numero de serie generado! 😁']"
          :loop="1"
          :wrapper="'counter'"
        ></v-typical>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import VTypical from 'vue-typical';
export default {
  name: 'HeroComponent',
  components: {
    VTypical,
  },
  data(){
    return{
      socket: {},
      context: {},
      msg: '',
      msgq: '',
    }
  },
 
  created(){
    this.socket = io("http://localhost:4000");
  },
  mounted(){
    this.getcd()
  },
  methods:{
    getcd(){
      this.socket.on('connect', data => {
        console.log(data);
        this.socket.on('achievedSerial', data => {
          this.msg = data
        });
        this.socket.on('sendSerial', data => {
          this.msgq = data   
        });
  })
}
}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
counter{
  color:#52d053;
  font-family: 'Orbitron', sans-serif;
    font-size: 15vw;
    background-image: linear-gradient(180deg,
        rgb(38, 173, 69) 0%,
        rgba(51,197,142,1) 50%,
        rgba(39,97,116,1) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    
    -moz-text-fill-color: transparent;
  font-weight: bold;
  font-size: 50px;
}
</style>
