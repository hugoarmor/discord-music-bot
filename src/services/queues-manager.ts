type QueuesList = {
  [guildList: string]: SearchQuery[]
}

class QueuesManager {
  queuesList: QueuesList = {}
  private static instance: QueuesManager

  private constructor() {}

  static getInstance(): QueuesManager {
    if (!QueuesManager.instance) {
      QueuesManager.instance = new QueuesManager()
    }
    return QueuesManager.instance
  }

  push(guildId: string, query: SearchQuery) {
    if (!this.queuesList[guildId]) {
      this.queuesList[guildId] = []
    }
    this.queuesList[guildId].push(query)
  }

  getNext(guildId: string): SearchQuery | undefined {
    if (this.queuesList[guildId]) {
      return this.queuesList[guildId].shift()
    }
  }

  delete(guildId: string) {
    delete this.queuesList[guildId]
  }

  has(guildId: string) {
    return !!this.queuesList[guildId]?.length
  }
}

export const queuesManager = QueuesManager.getInstance()
