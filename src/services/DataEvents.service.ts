import { Injectable } from '@nestjs/common';

import { DataEventsClient, init } from '@thirtymadison/data-events-lib';

@Injectable()
export class DataEventsService {
  private client: DataEventsClient;

  async identify({
    id,
    brandSite,
    traits,
  }: {
    id: any;
    brandSite: any;
    traits: any;
  }): Promise<void> {
    const client = await this.createClient();
    await client.identify({ id, brandSite, traits }), traits;
  }

  async page(): Promise<void> {
    const client = await this.createClient();
    await client.page();
  }

  async track({
    event,
    brandSite,
    traits,
  }: {
    event: any;
    brandSite: any;
    traits: any;
  }): Promise<void> {
    const client = await this.createClient();
    await client.track({ event, brandSite, traits });
  }

  protected async createClient() {
    if (this.client) return this.client;

    const secrets = {
      MIXPANEL_EVENTS_KEY: null,
      SEGMENT_EVENTS_KEY: null,
    };

    const config = {
      app: 'medication-treatment-service',
      mixpanelKey:
        process.env.MIXPANEL_EVENTS_KEY ?? secrets?.MIXPANEL_EVENTS_KEY ?? null,
      segmentKey:
        process.env.SEGMENT_EVENTS_KEY ?? secrets?.SEGMENT_EVENTS_KEY ?? null,
    };

    this.client = init(config);
    return this.client;
  }
}
