<template>
  <div class="history-view bg-dark py-5 d-flex justify-content-center align-items-center">
    <date-viewer
      v-if="selectedYear"
      :data="selectedYear" />
    <div class="bottom-controls p-4 d-flex flex-column  align-items-center">
      <h2
        v-if="selectedYear" 
        class="text-white">
        {{ selectedYear.title }}
      </h2>
      <year-select
        :years="years"
        @select="onYearSelect($event)" />
    </div>
  </div>
</template>

<script>
import dateViewer from "~/components/history/date-viewer";
import yearSelect from "~/components/history/year-select";

export default {
  name: "HistoryView",

  components: {
  	dateViewer,
  	yearSelect
  },

  data() {
    return {
		  years: [{
        year: "2009",
        title: "title", // removable ?
        events: [{
          date: new Date(),
          title: "foo",
          desc: "barbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbar",
          img: "university_2.png"
        }, {
          date: new Date(),
          title: "foo",
          desc: "barbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbar",
          img: "favicon.png"
        }, {
          date: new Date(),
          title: "foo",
          desc: "barbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbar",
          img: "university_2.png"
        }, {
          date: new Date(),
          title: "foo",
          desc: "barbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbar",
          img: "university_2.png"
        }]
      }, {
        year: "2010",
        title: "title", // removable ?
        events: [{
          date: new Date(),
          title: "foo",
          desc: "barbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbar",
          img: "university_2.png"
        }, {
          date: new Date(),
          title: "foo",
          desc: "barbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbar",
          img: "favicon.png"
        }, {
          date: new Date(),
          title: "foo",
          desc: "barbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbar",
          img: "university_2.png"
        }]
      }, {
        year: "2011",
        title: "title", // removable ?
        events: [{
          date: new Date(),
          title: "foo",
          desc: "barbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbarbar",
          img: "/university_2.png"
        }]
      }],
      selectedYear: null
    };
  },

  methods: {
  	onYearSelect(year) {
  		const me = this;
  		console.log(year);
  		me.selectedYear = year;
  	}
  }
};
</script>

<style lang="scss">
.history-view {
	width: 100%;
	height: 100%;

	.bottom-controls {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;

		input[type=range] {
			-webkit-appearance: none;
			margin: 10px 0;
			width: 100%;
		}

		input[type=range]::-webkit-slider-runnable-track {
			width: 100%;
			height: 1rem;
			cursor: pointer;
			animate: 0.2s;
			background: linear-gradient(90deg, #FFC0CB 50%, #00FFFF 50%);
		}

		input[type=range]::-webkit-slider-thumb {
			height: 2rem;
			width: 5px;
			border-radius: 7px;
			background: #65001c;
			cursor: pointer;
			-webkit-appearance: none;
			margin-top: -0.5rem;
		}

		input[type=range]::-moz-range-track {
			width: 100%;
			height: 1rem;
			cursor: pointer;
			animate: 0.2s;
			background: linear-gradient(90deg, #FFC0CB 50%, #00FFFF 50%);
		}

		input[type=range]::-moz-range-thumb {
			box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
			border: 0px solid #000000;
			height: 20px;
			width: 39px;
			border-radius: 7px;
			background: #FFFFFF;
			cursor: pointer;
		}

		input[type=range]::-ms-thumb {
			box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
			border: 0px solid #000000;
			height: 20px;
			width: 39px;
			border-radius: 7px;
			background: #65001c;
			cursor: pointer;
		}
  }
}
</style>
