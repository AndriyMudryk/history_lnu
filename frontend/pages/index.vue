<template>
  <div class="landing">
    <carousel
      class="carousel-container"
      :per-page="1"
      :mouse-drag="false"
      :autoplay="true"
      :autoplay-hover-pause="false"
      :loop="true"
      :pagination-enabled="false"
      :autoplay-timeout="10000">
      <slide
        v-for="(carouselItem, index) in carouselItems"
        :key="index">
        <img
          class="d-block carousel-image"
          :src="carouselItem.srcUrl"
          :alt="'Slide ' + index">
      </slide>
    </carousel>
    <div class="body d-flex justify-content-center align-items-center">
      <div class="title">
        <div class="title-text-wrapper d-flex">
          <div class="lnu-title d-flex justify-content-center align-items-end">
            <svg
              class="title-background"
              viewBox="0 0 100 40"
              preserveAspectRatio="none">
              <polygon points="0,10 90,0 100,40 10,40 0,20"/>
            </svg>
            <h1 class="title-text text-white">
              LVIV UNIVERSITY
            </h1>
          </div>
          <div class="more-info d-flex flex-column justify-content-center">
            <h1 class="text-blue">
              The history
            </h1>
            <h2 class="text-blue ml-5">
              By
              <span> Events</span>,
              <span> People</span> and
              <span> Places </span>
            </h2>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-5">
          <router-link
            to="/history">
            <div class="btn btn-lg btn-light">
              Explore
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Landing",

  data() {
    return {
      carouselItems: [
        {
          srcUrl: "university_2.png",
        },
        {
          srcUrl: "lnu.jpg",
        },
      ],
      activeCarouselIndex: 0,
    };
  },
};
</script>

<style lang="scss">
.landing {
  width: 100%;
  height: 100%;

  .body {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 1;
    background: transparent;

    .title {
      .title-text-wrapper {
        .lnu-title {
          width: 400px;
          height: 150px;
          position: relative;

          .title-text {
            z-index: 2;
            padding-bottom: 20px;
          }

          .title-background {
            z-index: -1;
            position: absolute;
            width: 100%;
            height: 100%;
            fill: #002561;
          }
        }

        .more-info {
          .text-blue {
            color: #002561;
          }
        }
      }

      .btn {
        border-radius: 0;
        padding-left: 30px;
        padding-right: 30px;
      }
    }
  }

  .carousel-container {
    width: 100vw;
    height: 100vh;

    .carousel-image {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      opacity: 0.8;
    }

    .VueCarousel-slide-active { //sass-lint:disable-line class-name-format
      .carousel-image {
        -webkit-animation-name: move;
        -webkit-animation-duration: 10s;
        animation-name: move;
        animation-duration: 10s;

        @keyframes move {
          0% {transform: scale(1);}

          25% {transform: scale(1.1);}

          50% {transform: scale(1.2);}

          100% {transform: scale(1.1);}
        }
      }
    }
  }
}
</style>
