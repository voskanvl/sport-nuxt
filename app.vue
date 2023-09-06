<template>
  <NuxtLoadingIndicator />
  <Menu />
  <NuxtPage />
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,regular,500,600,700,800,300italic,italic,500italic,600italic,700italic,800italic);
@import url(https://fonts.googleapis.com/css?family=Roboto:100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,900,900italic);

body {
  font-family: Roboto, sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100dvh;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  color: #338
}

img {
  display: block;
  max-width: 100%;
}

.message {
  position: absolute;
  inset: 0;
  margin: auto;
  width: fit-content;
  height: min-content;
}
</style>
