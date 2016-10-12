<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <section class="mdl-card mdl-cell mdl-cell--12-col mdl-shadow--2dp">
    <div class="mdl-card__title">
      {{ title }}
      <div class="mdl-layout-spacer"></div>
      <!-- Accent-colored raised button with ripple -->
      <button v-on:click="showModal()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
        Add
      </button>
    </div>
    <div class="mdl-card__supporting-text mdl-cell--12-col">
      <table class="mdl-data-table mdl-js-data-table mdl-cell--12-col">
        <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">Name</th>
          <th>Release Date</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="platform in platforms">
          <td class="mdl-data-table__cell--non-numeric">{{ platform.name }}</td>
          <td>{{ platform.releaseDate }}</td>
          <td>
            <button v-on:click="showModal(platform)" class="mdl-button mdl-js-button mdl-button--icon">
              <i class="material-icons">mode_edit</i>
            </button>
          </td>
          <td>
            <button v-on:click="remove(platform)" class="mdl-button mdl-js-button mdl-button--icon">
              <i class="material-icons">delete</i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <dialog ref="dialog" class="mdl-dialog">
      <h3 class="mdl-dialog__title">Add Platform</h3>
      <div class="mdl-dialog__content">
        <p>
        <form ref="form" action="#" name="form">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="name" name="name" v-model="newPlatform.name" ref="nameInput">
            <label class="mdl-textfield__label" for="name">Name</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="date" id="date" name="releaseDate" v-model="newPlatform.releaseDate" ref="releaseDateInput">
            <label class="mdl-textfield__label" for="date">Release Date</label>
          </div>
        </form>
        </p>
      </div>
      <div class="mdl-dialog__actions">
        <button v-on:click="add()" class="mdl-button mdl-js-button mdl-button--primary">Save</button>
        <!--<div class="mdl-layout-spacer"></div>-->
        <button v-on:click="cancel()" class="mdl-button mdl-js-button">Cancel</button>
      </div>
    </dialog>
  </section>
</template>

<script>
  import PlatformService from '../services/platform.service';

  export default {
    name: 'PlatformView',
    data() {
      return {
        title: 'Platforms',
        platforms: null,
        newPlatform: {
          id: '',
          name: '',
          releaseDate: '',
        },
      };
    },
    methods: {
      add() {
        this.platformService.save(this.newPlatform)
          .then(() => this.platformService.getPlatforms())
          .then(foundPlatforms => {
            this.platforms = foundPlatforms;
          })
          .then(this.cancel());
      },
      remove(platform) {
        this.platformService.delete(platform.id)
          .then(() => this.platformService.getPlatforms())
          .then(foundPlatforms => {
            this.platforms = foundPlatforms;
          });
      },
      showModal(platform) {
        console.log('Showing modal');
        if (platform) {
          this.newPlatform = {
            id: platform.id,
            name: platform.name,
            releaseDate: platform.releaseDate,
          };
          this.$refs.nameInput.parentNode.MaterialTextfield.change(platform.name);
          this.$refs.releaseDateInput.parentNode.MaterialTextfield.change(platform.releaseDate);
        }
        this.$refs.dialog.show();
      },
      cancel() {
        this.newPlatform = {};
        this.$refs.dialog.close();
      },
    },
    mounted() {
      this.platformService.getPlatforms()
        .then(foundPlatforms => (this.platforms = foundPlatforms));
    },
    created() {
      this.platformService = new PlatformService();
    },
  };
</script>
