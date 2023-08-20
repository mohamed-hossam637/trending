<!-- (https://image.tmdb.org/t/p/w500 -->
<template>
    <header className="header shadow-sm p-2">
        <div className="container">
            <h1 className="logo">
                cinematex
            </h1>
            <nav className="navbar ">
                <ul className="links">
                    <li className="link text-capitalize ">
                        <router-link to="/"> home</router-link>
                    </li>
                    <!-- <li className="link ">
                        <router-link to="/explore">explore</router-link>
                    </li>
                    <li className="link">
                        <router-link to="/top_rated">top rated</router-link>
                    </li> -->
                </ul>
            </nav>
        </div>
    </header>
</template>
<script>
export default {
    name: 'Navbar' , 
}
</script>
<style scoped>
.header {
    position: sticky;
    top: 0px;
    transition: all 0.6s;
    background-color: #fff;
    z-index: 500;
}
.header .container {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.header .container .navbar .links .link {
    display: inline-block;
    margin-left: 20px;
}
.links {
  list-style: none;
}
a {
  text-decoration: none;
}
</style>