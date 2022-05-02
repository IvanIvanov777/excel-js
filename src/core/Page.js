export class Page {
  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw new Error('Method "getRoot" should be implemented')
  }

  // хук, выполнится после рендера, для установки события
  afterRender() { }

  destroy() { }
}

