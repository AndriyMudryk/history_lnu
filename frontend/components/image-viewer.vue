<template>
	<div class="image-viewer">
		<carousel 
			v-if="images.length > 0"
			class="image-carousel"
			:per-page="1">
      <slide
        v-for="image in images"
        :key="image.id">
        <img
          class="d-block carousel-image"
          :src="getImageUrl(image.id)"
          :alt="'Slide ' + image.id">
        <div class="title text-white text-center mt-2">
        	<i> {{image.title}}</i>
        </div>
      </slide>
    </carousel>
	</div>
</template>

<script>
import api from "~/api";

export default {
	props: {
		eventId: {
			type: Number,
			required: true
		}
	},

	watch: {
		eventId() {
			const me = this;
			me.getImages();
		}
	},

	data() {
		return {
			images: []
		}
	},

	mounted() {
		const me = this;
		me.getImages();
	},

	methods: {
		getImages() {
			const me = this;
			api.getImages(me.eventId).then(
				function (images) {
					me.images = images;
				}
			);
		},

		getImageUrl(id) {
			const me = this;
			return me.$store.state.apiEndpoint + "/images/" + id;
		}
	}
}
</script>

<style lang="scss">
.image-viewer {
	.image-carousel {
		max-width: 250px;
	}
	.carousel-image {
		max-width: 250px;
		opacity: 1;
		cursor: pointer;
	}
}
</style>