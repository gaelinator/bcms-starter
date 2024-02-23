import { HeaderEntryMeta, SeoGroup } from '@/bcms/types';
import { FooterEntryMeta } from '@/bcms/types/entry/footer';

export interface PageData<
  Page = { meta: { en: { title: string; seo?: SeoGroup } } },
> {
  location?: string;
  defaultTitle?: string;
  page: {
    bcms: Page;
  };
  header: {
    bcms: {
      meta: {
        en: HeaderEntryMeta;
      };
    };
  };
  footer: {
    bcms: {
      meta: {
        en: FooterEntryMeta;
      };
    };
  };
}
