<template>
  <div class="profile">
    <img src="/images/common/icon.jpeg" alt="パンダム/rymiyamoto" class="profile-icon"/>
    <p class="profile-text">
      <a href="https://tabelog.com/tokyo/A1314/A131402/13123414/">鉄火</a>を実家と主張する人🍶<br>
      Twitter(強い意志)が主戦場
    </p>
  </div>  
</template>

<style scoped>
.profile {
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 16px;
  gap: 16px;
}

.profile-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-text {
  text-align: left;
  font-size: 16px;
  line-height: 1.5;
  color: var(--vp-c-text);
}
</style>
