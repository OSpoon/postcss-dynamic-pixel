<script setup lang="ts"></script>

<template>
  <div class="root">
    <div class="tab__content">
      <div class="card">
        <div class="card__media">
          <div class="media__object">
            <img src="https://picsum.photos/180/180?random=2" alt="">
          </div>
        </div>
        <div class="card__content">
          <h3 class="card__heading">
            星巴克猫爪杯八个字
          </h3>
          <p class="card__body">
            这是一段推荐文字九十一二三四五
          </p>
          <div class="card__footer">
            <div class="card__price">
              <div class="card__price--current">
                <span>&yen;</span> <strong>1</strong>
              </div>
              <del class="card__price--orgion">&yen;280.06</del>
            </div>
            <button class="card__button">
              1元抢
            </button>
          </div>
          <div class="card__badge">
            本周特推
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab__content {
  background: #ff9500;
  border-radius: 36px;
  padding: 22px;
  width: 702px;
}

.card {
  display: flex;
  background: #ffffff;
  position: relative;
  box-shadow: 0 4px 4px 0 #ff5400, inset 0 -2px 0 0 rgba(255, 255, 255, 0.51),
    inset 0 -7px 6px 3px #ffcca4;
  border-radius: 38px;
  padding: 24px;
}

.card__media {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 170px;
  height: 170px;
  border-radius: 24px;
  margin-right: 20px;
}

.card__media img {
  width: 100%;
  aspect-ratio: 1 / 1;
  display: block;
  border-radius: 24px;
}

.card__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.card__content > * {
  width: 100%;
}

.card__heading {
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 900;
  font-size: 30px;
  margin-bottom: 6px;
}

.card__body {
  color: #5b5b5b;
  font-size: 24px;
}

.card__footer {
  display: flex;
  margin-top: auto;
  align-items: flex-end;
  justify-content: space-between;
}

button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  border: none 0;
  color: #fff;
  border-radius: 10rem;
  background-image: linear-gradient(180deg, #f74b4b 0%, #e32828 99%);
  min-width: 210px;
  min-height: 62px;
  padding: 0 20px;
  font-size: 26px;
}

.card__price {
  display: flex;
  color: #5b5b5b;
  align-items: flex-end;
  line-height: 1;
  font-size: 22px;
}

.card__price--current {
  font-weight: 600;
  color: #ff1300;
  font-size: 24px;
}

.card__price--current span {
  margin-right: -4px;
}

.card__price--current strong {
  font-size: 46px;
}

.card__price--orgion {
  text-decoration: none;
  position: relative;
  margin-left: 8px;
  bottom: 0.1325em;
}

.card__price--orgion::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  background-color: currentColor;
  z-index: 2;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  height: 2px;
}

.card__badge {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(180deg, #f74b4b 0%, #e32828 99%);
  font-weight: 600;
  font-size: 24px;
  border-radius: 36px 0 36px 0;
  max-width: 146px;
  min-height: 42px;
}
</style>
