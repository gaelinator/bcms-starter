import { NowPlayingPageData, PageProps } from '@/types';
import { PageWrapper } from '@/components/PageWrapper';
import { BCMSImage } from 'next-plugin-bcms/components';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ForwardIcon from '@/assets/icons/forward.svg';
import BackwardIcon from '@/assets/icons/backward.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import PlayIcon from '@/assets/icons/play.svg';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-props';
import { usePlayer } from '@/context/PlayerContext';

const NowPlaying: React.FC<PageProps<NowPlayingPageData>> = ({
  header,
  footer,
  page,
}) => {
  const {
    episode,
    episodeDOM,
    settings,
    updateSettings,
    getPlayingEpisodeFileLength,
    getCurrentPlayTime,
    getEpisodeProgressBarWidth,
    handlePrevEpisode,
    handleNextEpisode,
    handleRewind,
  } = usePlayer();

  const [fileLength, setFileLength] = useState<string>('...');

  const router = useRouter();

  useEffect(() => {
    if (!episode) {
      void router.push('/');
    }
    computeLength();
  }, [episode, router]);

  useEffect(() => {
    computeLength();
  }, [episode]);

  const computeLength = () => {
    const { durationInMinutes, durationInSeconds } =
      getPlayingEpisodeFileLength();

    const length = `${durationInMinutes.toString().padStart(2, '0')}:${(
      durationInSeconds % 60
    )
      .toFixed(0)
      .padStart(2, '0')}`;

    setFileLength(length);
  };

  if (!episode) {
    return <></>;
  }
  return (
    <PageWrapper
      defaultTitle="Now Playing"
      page={page}
      header={header}
      footer={footer}
    >
      <div className="container relative z-10 py-20 lg:pt-[104px] lg:pb-[246px]">
        <div className="relative aspect-square rounded overflow-hidden mb-8 md:aspect-[2.47] lg:rounded-2xl lg:mb-16">
          <BCMSImage
            media={episode?.cover}
            options={{
              sizes: {
                exec: [
                  {
                    width: 654,
                    height: 654,
                  },
                  {
                    width: 768,
                    height: 291,
                  },
                  {
                    width: 1344,
                    height: 544,
                  },
                ],
              },
            }}
            className="absolute top-0 left-0 w-full h-full cover rounded overflow-hidden lg:rounded-2xl"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 lg:bg-black/60" />
        </div>
        <div className="flex flex-col items-center text-center max-w-[672px] mx-auto">
          <h1 className="leading-none font-medium tracking-[-0.8px] mb-2.5 lg:text-[40px] lg:leading-none lg:tracking-[-2.41px] lg:text-white lg:mb-6">
            {episode?.title}
          </h1>
          <div className="text-sm leading-none tracking-[-0.8px] text-appGray-400 mb-[35px] lg:text-2xl lg:leading-none lg:text-appGray-300 lg:mb-10">
            {episode?.guest?.meta?.en?.title || 'N / A'}
          </div>
          <div className="mb-6 w-full lg:mb-8">
            <label className="block relative mb-2 lg:mb-5">
              <div className="relative h-1 rounded-md overflow-hidden bg-appGray-800 lg:h-2">
                <div
                  className="absolute top-0 left-0 h-full bg-white rounded-md"
                  style={{
                    width: getEpisodeProgressBarWidth(),
                  }}
                />
              </div>
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full lg:w-[15px] lg:h-[15px]"
                style={{
                  left: getEpisodeProgressBarWidth(),
                }}
              />
              <div
                className="absolute z-10 top-1/2 -translate-y-1/2 left-0 w-full h-5 cursor-pointer rounded-md"
                onClick={handleRewind}
              />
              {episodeDOM && (
                <input
                  value={getEpisodeProgressBarWidth()}
                  type="range"
                  step="1"
                  min="0"
                  max={episodeDOM.duration}
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-5 opacity-0"
                />
              )}
            </label>
            <div className="flex items-center justify-between">
              <div className="text-xs leading-none tracking-[-0.8px] text-appGray-400 lg:text-base lg:leading-none">
                {getCurrentPlayTime}
              </div>
              <div className="text-xs leading-none tracking-[-0.8px] text-appGray-400 lg:text-base lg:leading-none">
                {fileLength}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8">
            <button className="flex" onClick={handlePrevEpisode}>
              <BackwardIcon className="w-6 h-6" />
            </button>
            <button
              className="flex items-center justify-center w-8 h-8 bg-white rounded-full lg:w-[60px] lg:h-[60px]"
              onClick={() =>
                updateSettings({
                  playing: !settings.playing,
                })
              }
            >
              {settings.playing ? (
                <PauseIcon className="text-appBody w-6 h-6 lg:w-8 lg:h-8" />
              ) : (
                <PlayIcon className="text-appBody w-6 h-6 lg:w-8 lg:h-8" />
              )}
            </button>
            <button className="flex" onClick={handleNextEpisode}>
              <ForwardIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<NowPlayingPageData>
> = async () => {
  const client = getBcmsClient();

  try {
    const { header, footer } = await getHeaderAndFooter(client);

    return {
      props: {
        header,
        footer,
        page: {},
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default NowPlaying;
