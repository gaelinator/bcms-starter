import { useRouter } from 'next/router';
import { useMemo } from 'react';

interface OgHeadTags {
  title?: string;
  description?: string;
  image?: string;
}

interface OgHeadTagsResult {
  title: string;
  meta: {
    hid?: string;
    name?: string;
    property?: string;
    content: string;
  }[];
  link: {
    hid?: string;
    rel: string;
    href: string;
  }[];
}

export interface HeadTags {
  setOgHead(data: OgHeadTags): OgHeadTagsResult;
}

export function useHeadTags(): HeadTags {
  const router = useRouter();
  const routePath = useMemo(() => router.asPath, [router.asPath]);

  return {
    setOgHead({ title, description, image }) {
      if (!title) title = '';
      if (!description) description = '';
      if (!image) image = '/thumbnail.jpg';
      const domain = 'https://job-board-starter.thebcms.com/';
      return {
        title: title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${description}`,
          },
          {
            property: 'og:site_name',
            content: `${title} - Hospitale`,
          },
          { property: 'og:type', content: 'website' },
          { property: 'twitter:card', content: 'summary_large_image' },
          {
            hid: 'ogUrl',
            property: 'og:url',
            content: `${domain}${routePath}`,
          },
          {
            hid: 'ogTitle',
            property: 'og:title',
            content: `${title} - Hospitale`,
          },
          {
            hid: 'ogDescription',
            property: 'og:description',
            content: `${description}`,
          },
          {
            hid: 'ogImage',
            property: 'og:image',
            content: `${image}`,
          },
          {
            hid: 'twitterUrl',
            property: 'twitter:url',
            content: `${domain}${routePath}`,
          },
          {
            hid: 'twitterTitle',
            property: 'twitter:title',
            content: `${title} - Hospitale`,
          },
          {
            hid: 'twitterDescription',
            property: 'twitter:description',
            content: `${description}`,
          },
          {
            hid: 'twitterImage',
            property: 'twitter:image',
            content: `${image}`,
          },
        ],
        link: [
          {
            hid: 'canonical',
            rel: 'canonical',
            href: `${domain}${routePath}`,
          },
        ],
      };
    },
  };
}
