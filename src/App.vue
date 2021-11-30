<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <hr>
  </div>
  <router-view/>
</template>

<style>
body {
  background: #eee;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  font-size: 16px;
  text-transform: uppercase;
}

#nav a {
  display: inline-block;
  font-weight: bold;
  margin: 10px 15px;
  color: #000;
  text-decoration: none;
  font-size: 18px;
}

#nav a.router-link-exact-active {
  color: #2ebf8a;
}
</style>
