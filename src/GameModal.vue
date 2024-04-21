<!-- GameModal.vue -->

<template>
  <div class="modal-overlay bg-gray-700" @click="closeModal">
    <div class="modal-content cursor-pointer bg-gray-700 p-4 rounded-md" @click.stop>
      <h2>{{ game.name }} Details</h2>
      <img :src="game.background_image" alt="Game Image" style="max-width: 200px; max-height: 200px;">
      <p>Released: {{ game.released }}</p>
      <p>Platforms: {{ getPlatformNames(game.platforms) }}</p>
      <button @click="toggleRequirements">Show Requirements</button>
      <p v-if="showRequirements">Minimum Requirements: {{ getPlatformRequirement(game.platforms) }}</p>
      <!-- other game details to come maybe -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: Object,
  },
  data() {
    return {
      showRequirements: false,
    };
  },
  methods: {
    getPlatformNames(platforms) {
      return platforms.map(platform => platform.platform.name).join(', ');
    },
    getPlatformRequirement(platforms) {
      // if requirements_en is available
      const firstPlatform = platforms[0];
      if (firstPlatform && firstPlatform.requirements_en && firstPlatform.requirements_en.minimum) {
        return firstPlatform.requirements_en.minimum;
      } else {
        return 'Requirements not available';
      }
    },
    toggleRequirements() {
      this.showRequirements = !this.showRequirements;
    },
    closeModal() {
      if (!this.showRequirements) {
        this.$emit('close');
      }
    },
  },
};
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  padding: 20px;
}
</style>
