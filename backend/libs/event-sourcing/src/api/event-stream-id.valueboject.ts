export class EventStreamId {
  private constructor(readonly aggregateId: string, readonly aggregateType: string) {
  }

  static from(aggregateId: string, aggregateType: string){
    return new EventStreamId(aggregateId, aggregateType);
  }

  static props(props: {aggregateId: string; aggregateType: string}){
    return new EventStreamId(props.aggregateId, props.aggregateType);
  }

  get raw() {
    return `${this.aggregateId}-${this.aggregateType}`
  }
}