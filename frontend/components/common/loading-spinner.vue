<template>
  <div class="loading-spinner is-loading">
    <span class="slice"/>
    <span class="slice"/>
    <span class="slice"/>
    <span class="slice"/>
    <span class="slice"/>
    <span class="slice"/>
  </div>
</template>

<style lang="scss">
$border-left-color: #9C2F2F;
$border-left-color-collapse: #F7484E;

@-webkit-keyframes preload-show-1 {

  from {
    -webkit-transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-show-1 {

  from {
    -webkit-transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-hide-1 {

  to {
    -webkit-transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-hide-1 {

  to {
    -webkit-transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-cycle-1 {

  5% {
    -webkit-transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }

  10%,
  75% {
    -webkit-transform: rotateZ(60deg) rotateY(0) rotateX(0deg);
    transform: rotateZ(60deg) rotateY(0) rotateX(0deg);
    border-left-color: $border-left-color-collapse;
  }

  80%,
  100% {
    -webkit-transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-cycle-1 {

  5% {
    -webkit-transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }

  10%,
  75% {
    -webkit-transform: rotateZ(60deg) rotateY(0) rotateX(0deg);
    transform: rotateZ(60deg) rotateY(0) rotateX(0deg);
    border-left-color: $border-left-color-collapse;
  }

  80%,
  100% {
    -webkit-transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-show-2 {

  from {
    -webkit-transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}
@keyframes preload-show-2 {

  from {
    -webkit-transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-hide-2 {

  to {
    -webkit-transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-hide-2 {

  to {
    -webkit-transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-cycle-2 {

  10% {
    -webkit-transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }

  15%,
  70% {
    -webkit-transform: rotateZ(120deg) rotateY(0) rotateX(0deg);
    transform: rotateZ(120deg) rotateY(0) rotateX(0deg);
    border-left-color: $border-left-color-collapse;
  }

  75%,
  100% {
    -webkit-transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-cycle-2 {

  10% {
    -webkit-transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }

  15%,
  70% {
    -webkit-transform: rotateZ(120deg) rotateY(0) rotateX(0deg);
    transform: rotateZ(120deg) rotateY(0) rotateX(0deg);
    border-left-color: $border-left-color-collapse;
  }

  75%,
  100% {
    -webkit-transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-show-3 {

  from {
    -webkit-transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-show-3 {

  from {
    -webkit-transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-hide-3 {

  to {
    -webkit-transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-hide-3 {

  to {
    -webkit-transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-cycle-3 {

  15% {
    -webkit-transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }

  20%,
  65% {
    -webkit-transform: rotateZ(180deg) rotateY(0) rotateX(0deg);
    transform: rotateZ(180deg) rotateY(0) rotateX(0deg);
    border-left-color: $border-left-color-collapse;
  }

  70%,
  100% {
    -webkit-transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-cycle-3 {

  15% {
    -webkit-transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }

  20%,
  65% {
    -webkit-transform: rotateZ(180deg) rotateY(0) rotateX(0deg);
    transform: rotateZ(180deg) rotateY(0) rotateX(0deg);
    border-left-color: $border-left-color-collapse;
  }

  70%,
  100% {
    -webkit-transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-show-4 {

  from {
    -webkit-transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-show-4 {

  from {
    -webkit-transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-hide-4 {

  to {
    -webkit-transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-hide-4 {

  to {
    -webkit-transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-cycle-4 {

  20% {
    -webkit-transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }

  25%,
  60% {
    -webkit-transform: rotateZ(240deg) rotateY(0) rotateX(0deg);
    transform: rotateZ(240deg) rotateY(0) rotateX(0deg);
    border-left-color: $border-left-color-collapse;
  }

  65%,
  100% {
    -webkit-transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-cycle-4 {

  20% {
    -webkit-transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }

  25%,
  60% {
    -webkit-transform: rotateZ(240deg) rotateY(0) rotateX(0deg);
    transform: rotateZ(240deg) rotateY(0) rotateX(0deg);
    border-left-color: $border-left-color-collapse;
  }

  65%,
  100% {
    -webkit-transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-show-5 {

  from {
    -webkit-transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-show-5 {

  from {
    -webkit-transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-hide-5 {

  to {
    -webkit-transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-hide-5 {

  to {
    -webkit-transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-cycle-5 {

  25% {
    -webkit-transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }

  30%,
  55% {
    -webkit-transform: rotateZ(300deg) rotateY(0) rotateX(0deg);
    transform: rotateZ(300deg) rotateY(0) rotateX(0deg);
    border-left-color: $border-left-color-collapse;
  }

  60%,
  100% {
    -webkit-transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-cycle-5 {

  25% {
    -webkit-transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);
    /* border-left-color: $border-left-color; */
  }

  30%,
  55% {
    -webkit-transform: rotateZ(300deg) rotateY(0) rotateX(0deg);
    transform: rotateZ(300deg) rotateY(0) rotateX(0deg);
    border-left-color: $border-left-color-collapse;
  }

  60%,
  100% {
    -webkit-transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-show-6 {

  from {
    -webkit-transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-show-6 {

  from {
    -webkit-transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-hide-6 {

  to {
    -webkit-transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-hide-6 {

  to {
    -webkit-transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);
    transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-cycle-6 {

  30% {
    -webkit-transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }

  35%,
  50% {
    -webkit-transform: rotateZ(360deg) rotateY(0) rotateX(0deg);
    transform: rotateZ(360deg) rotateY(0) rotateX(0deg);
    border-left-color: $border-left-color-collapse;
  }

  55%,
  100% {
    -webkit-transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@keyframes preload-cycle-6 {

  30% {
    -webkit-transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }

  35%,
  50% {
    -webkit-transform: rotateZ(360deg) rotateY(0) rotateX(0deg);
    transform: rotateZ(360deg) rotateY(0) rotateX(0deg);
    border-left-color: $border-left-color-collapse;
  }

  55%,
  100% {
    -webkit-transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);
    transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);
    border-left-color: $border-left-color;
  }
}

@-webkit-keyframes preload-flip {

  0% {
    -webkit-transform: rotateY(0deg) rotateZ(-60deg);
    transform: rotateY(0deg) rotateZ(-60deg);
  }

  100% {
    -webkit-transform: rotateY(360deg) rotateZ(-60deg);
    transform: rotateY(360deg) rotateZ(-60deg);
  }
}

@keyframes preload-flip {


  0% {
    -webkit-transform: rotateY(0deg) rotateZ(-60deg);
    transform: rotateY(0deg) rotateZ(-60deg);
  }

  100% {
    -webkit-transform: rotateY(360deg) rotateZ(-60deg);
    transform: rotateY(360deg) rotateZ(-60deg);
  }
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 20px;
  display: block;
  width: 3.75em;
  height: 4.25em;
  margin-left: -1.875em;
  margin-top: -2.125em;
  transform-origin: center center;
  transform: rotateY(180deg) rotateZ(-60deg);
  animation: 2s preload-flip steps(2) infinite both;

  .slice {
    border-top: 1.125em solid transparent;
    border-right: 0;
    border-bottom: 1em solid transparent;
    border-left: 1.875em solid $border-left-color-collapse;
    position: absolute;
    top: 0;
    left: 50%;
    transform-origin: left bottom;
    border-radius: 3px 3px 0 0;

    /* Hide */
    &:nth-child(1) {
      /*
      transform: rotateZ(60deg) rotateY(0deg) rotateX(0);
      animation: 0.15s linear 0.82s preload-hide-1 both 1;
      */
      /* Сycle */
      transform: rotateZ(60deg) rotateY(90deg) rotateX(0);
      animation: 2s preload-cycle-1 linear infinite both;
    }

    &:nth-child(2) {
      /*
      transform: rotateZ(120deg) rotateY(0deg) rotateX(0);
      animation: 0.15s linear 0.74s preload-hide-2 both 1;
      */
      /* Сycle */
      transform: rotateZ(120deg) rotateY(90deg) rotateX(0);
      animation: 2s preload-cycle-2 linear infinite both;
    }

    &:nth-child(3) {
      /*
      transform: rotateZ(180deg) rotateY(0deg) rotateX(0);
      animation: 0.15s linear 0.66s preload-hide-3 both 1;
      */
      /* Сycle */
      transform: rotateZ(180deg) rotateY(90deg) rotateX(0);
      animation: 2s preload-cycle-3 linear infinite both;
    }

    &:nth-child(4) {
      /*
      transform: rotateZ(240deg) rotateY(0deg) rotateX(0);
      animation: 0.15s linear 0.58s preload-hide-4 both 1;
      */
      /* Сycle */
      transform: rotateZ(240deg) rotateY(90deg) rotateX(0);
      animation: 2s preload-cycle-4 linear infinite both;
    }

    &:nth-child(5) {
      /*
      transform: rotateZ(300deg) rotateY(0deg) rotateX(0);
      animation: 0.15s linear 0.5s preload-hide-5 both 1;
      */
      /* Сycle */
      transform: rotateZ(300deg) rotateY(90deg) rotateX(0);
      animation: 2s preload-cycle-5 linear infinite both;
    }

    &:nth-child(6) {
      /*
      transform: rotateZ(360deg) rotateY(0deg) rotateX(0);
      animation: 0.15s linear 0.42s preload-hide-6 both 1;
      */
      /* Сycle */
      transform: rotateZ(360deg) rotateY(90deg) rotateX(0);
      animation: 2s preload-cycle-6 linear infinite both;
    }
  }
}
</style>