<template>
  <div class="sns-icons">
    <a href="https://twitter.com/rymiyamoto129" target="_blank" rel="noopener">
      <span class="sns-icon sns-icon-twitter"></span>
    </a>
    <a href="https://github.com/rymiyamoto" target="_blank" rel="noopener">
      <span class="sns-icon sns-icon-github"></span>
    </a>
  </div>
</template>

<style scoped>
.sns-icons {
  display: flex;
  gap: 8px;
  height: 20px;
  --sns-icon-color: rgb(103, 103, 108);
}

@media (prefers-color-scheme: dark) {
  .sns-icons {
    --sns-icon-color: rgb(152, 152, 159);
  }
}

.sns-icon {
  width: 20px;
  height: 20px;
  display: inline-block;
  mask: var(--icon) no-repeat center / contain;
  -webkit-mask: var(--icon) no-repeat center / contain;
  background-color: currentColor;
}

.sns-icons a>span {
  color: var(--sns-icon-color);
}

.sns-icon-github {
  --icon: url('https://api.iconify.design/simple-icons/github.svg');
}

.sns-icon-twitter {
  --icon: url('https://api.iconify.design/simple-icons/twitter.svg');
}
</style>
