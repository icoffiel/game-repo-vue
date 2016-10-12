<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">Game Repo</span>
        <nav class="mdl-navigation">
          <router-link class="mdl-navigation__link" to="/">Home</router-link>
          <router-link class="mdl-navigation__link" to="/platform">Platform</router-link>
        </nav>
      </div>
    </header>
    <main class="mdl-layout__content">
      <div class="mdl-grid">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
