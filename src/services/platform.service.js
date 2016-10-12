import Vue from 'vue';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default class PlatformService {
  constructor() {
    this.resource = Vue.resource('http://localhost:8080/api/v1/platforms{/id}', {}, headers);
  }

  getPlatforms() {
    return this.resource.query()
      .then(res => res.data);
  }

  save(platform) {
    return this.resource.save(platform)
      .then(res => res.data);
  }

  delete(id) {
    return this.resource.delete({ id })
      .then(res => res.data);
  }
}
